import { getTranslations } from "next-intl/server";
import ReactMarkdown from "react-markdown";
import { fetchTodosById } from "@/modules/todo/todo-data";
import { format } from "date-fns";
import BackButton from "@/components/ui/custom/backButton";

export default async function TodoDetail({
  params,
}: {
  params: { id: string };
}) {
  const t = await getTranslations();
  const [todo] = await fetchTodosById(params.id);

  return (
    <div className="container">
      <div className="flex items-center mb-20 mt-8">
        <BackButton />
        <h4 className="text-xl font-semibold text-center justify-self-center flex-grow">
          {t("todo#todo_item_title")}
        </h4>
      </div>
      <div className="flex flex-col ">
        <div className="flex mb-6 ">
          <div className="font-semibold mr-6 w-24">
            {t("todo#cat_table_header")}:
          </div>
          <div>{todo.category}</div>
        </div>
        <div className="flex mb-6">
          <div className="font-semibold mr-6 w-24">
            {t("todo#description_table_header")}:
          </div>
          <div>{todo.description}</div>
        </div>
        <div className="flex mb-6">
          <div className="font-semibold mr-6 w-24">
            {t("todo#created_table_header")}:
          </div>
          <div>{format(new Date(todo.created), "dd-MM-yy HH:mm")}</div>
        </div>

        <div className="flex mb-6">
          <div className="font-semibold mr-6 w-24">
            {t("todo#status_table_header")}:
          </div>
          <div>
            {todo.status === 1
              ? t("todo#todo_status_done")
              : t("todo#todo_status_new")}
          </div>
        </div>
        <div className="flex mb-6">
          <div className="font-semibold mr-6 w-24 shrink-0">
            {t("todo#ai_completion_table_header")}:
          </div>
          <div className="mb-20">
            <ReactMarkdown>{todo.ai_rec}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
