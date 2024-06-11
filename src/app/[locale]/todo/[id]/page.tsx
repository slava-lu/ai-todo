import { getTranslations } from "next-intl/server";
import { fetchTodosById } from "@/modules/todo/todo-data";
import { format } from "date-fns";

export default async function TodoDetail({
  params,
}: {
  params: { id: string };
}) {
  const t = await getTranslations();
  const [todo] = await fetchTodosById(params.id);
  return (
    <main className="min-h-screen container">
      <h4 className="text-xl font-semibold text-center my-8">
        {t("todo#todo_item_title")}
      </h4>
      <div className="flex flex-col">
        <div className="flex mb-6">
          <div className="font-semibold mr-6">
            {t("todo#title_table_header")}:
          </div>
          <div>{todo.title}</div>
        </div>
        <div className="flex mb-6">
          <div className="font-semibold mr-6">
            {t("todo#description_table_header")}:
          </div>
          <div>{todo.description}</div>
        </div>
        <div className="flex mb-6">
          <div className="font-semibold mr-6">
            {t("todo#created_table_header")}:
          </div>
          <div>{format(new Date(todo.created), "dd-MM-yy HH:mm")}</div>
        </div>
        <div className="flex mb-6">
          <div className="font-semibold mr-6">
            {t("todo#status_table_header")}:
          </div>
          <div>
            {todo.status === 1
              ? t("todo#todo_status_done")
              : t("todo#todo_status_new")}
          </div>
        </div>
      </div>
    </main>
  );
}
