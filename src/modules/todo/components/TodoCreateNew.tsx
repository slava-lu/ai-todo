"use client";

import { useFormState } from "react-dom";
import { useTranslations } from "next-intl";
import { addTodo } from "@/modules/todo/todo-actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CreateNewButton from "./CreateNewButton";
import { maxTodoItems } from "@/lib/consts";
import AiCompletion from "@/modules/ai/components/AiCompletion";

export default function TodoCreateNew({ todoCount }: { todoCount: number }) {
  const initialState = { message: "" };
  const t = useTranslations();
  const [state, dispatch] = useFormState(addTodo, initialState);
  const isDisabled = todoCount >= maxTodoItems;
  console.log("state", state);

  return (
    <form action={dispatch}>
      <div className="mt-14 flex">
        <div className="grid w-full max-w-64 items-center gap-1.5 mr-6">
          <Label htmlFor="category">{t("todo#cat_table_header")}</Label>
          <Input
            type="text"
            id="category"
            name="category"
            placeholder={t("todo#category_placeholder")}
          />
        </div>
        <div className="grid w-full max-w-xl items-center gap-1.5">
          <Label htmlFor="description">
            {t("todo#description_table_header")}
          </Label>
          <Input
            type="text"
            id="description"
            name="description"
            placeholder={t("todo#description_placeholder")}
          />
        </div>
      </div>
      <div id="error" aria-live="polite" aria-atomic="true">
        {state?.message && (
          <p className="mt-2 text-sm text-red-500">{state.message}</p>
        )}
      </div>
      <CreateNewButton isDisabled={isDisabled} />
      {isDisabled && (
        <p className="mt-6 text-sm text-red-500">
          {t("todo#max_item_error_detailed")}
        </p>
      )}
      <AiCompletion />
    </form>
  );
}
