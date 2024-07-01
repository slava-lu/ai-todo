import { getTranslations } from "next-intl/server";
import TodoList from "@/modules/todo/components/TodoList";
import TodoListFlex from "@/modules/todo/components/TodoListFlex";
import TodoCreateNew from "@/modules/todo/components/TodoCreateNew";

import { fetchTodoCount } from "@/modules/todo/todo-data";

export default async function Home({
  searchParams,
}: {
  searchParams: { search?: string; filter?: string };
}) {
  const [{ count: todoCount }] = await fetchTodoCount();
  const query = searchParams;
  return (
    <div className="container">
      <TodoListFlex query={searchParams} />
      <TodoCreateNew todoCount={todoCount} />
    </div>
  );
}
