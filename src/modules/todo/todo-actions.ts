"use server";

import { getTranslations } from "next-intl/server";
import { maxTodoItems } from "@/lib/consts";
import sql from "@/lib/db";
import { revalidatePath } from "next/cache";
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { createStreamableValue } from "ai/rsc";

type State = {
  message?: string;
};

export async function changeTodoStatus(
  id: number,
  status: number,
  prevState: State | undefined,
) {
  const t = await getTranslations();
  try {
    await sql`
    update task_list
    set status = ${status === 1 ? 0 : 1}
    where id= ${id}`;
  } catch (error) {
    return {
      message: t("general#database_error"),
    };
  }
  revalidatePath("/");
}

export async function deleteTodo(id: number, prevState: State | undefined) {
  const t = await getTranslations();
  try {
    await sql`
    delete from task_list    
    where id= ${id}`;
  } catch (error) {
    return {
      message: t("general#database_error"),
    };
  }
  revalidatePath("/");
}

export async function addTodo(
  prevState: State | undefined,
  formData: FormData,
) {
  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const t = await getTranslations();
  if (!title || !description) {
    return { message: t("todo#missing_field_error") };
  }
  const [{ count }] = await sql`SELECT COUNT(id) from task_list`;

  if (count >= maxTodoItems) {
    return { message: t("todo#max_item_error") };
  }

  try {
    await sql`
    insert into task_list
       (title, description, status)
    values 
    (${title}, ${description}, 0)`;
  } catch {
    return {
      message: t("general#database_error"),
    };
  }
  revalidatePath("/");
}

export const streamTextAction = async (prompt: string) => {
  const result = await streamText({
    model: openai("gpt-4o"),
    temperature: 0,
    maxTokens: 250,
    system:
      "You are a helpful assistant. In the prompt you will receive the goal that a person tries to achieve. Please create 3-5 sentences with instructions how best to achieve this goal.",
    prompt: prompt,
  });
  return createStreamableValue(result.textStream).value;
};
