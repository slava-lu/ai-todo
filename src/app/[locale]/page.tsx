import { getTranslations } from "next-intl/server";
import TodoList from "@/modules/todo/components/TodoList";
import TodoCreateNew from "@/modules/todo/components/TodoCreateNew";
import SearchBar from "@/modules/todo/components/SearchBar";
import { fetchTodoCount } from "@/modules/todo/todo-data";

export default async function Home({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const t = await getTranslations();
  const [{ count: todoCount }] = await fetchTodoCount();
  const query = searchParams?.query || "";
  return (
    <main className="min-h-screen container">
      <h3 className="text-2xl font-semibold text-center my-4">
        {t("todo#list_title")}
      </h3>
      <SearchBar />
      <TodoList query={query} />
      <TodoCreateNew todoCount={todoCount} />
    </main>
  );
}
