import { Fragment } from "react";
import { format } from "date-fns";
import { Link } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import TodoStatus from "@/modules/todo/components/TodoStatus";
import TodoDelete from "@/modules/todo/components/TodoDelete";
import { fetchAllTodos } from "@/modules/todo/todo-data";
import { getTranslations } from "next-intl/server";

export default async function TodoListFlex({
  query,
}: {
  query: {
    search?: string;
    filter?: string;
  };
}) {
  const t = await getTranslations();
  const todos = await fetchAllTodos(query);
  return (
    <div className="flex flex-col">
      {todos.map((todo) => {
        const opacityLevel = todo.status === 0 ? "opacity-100" : "opacity-40";
        return (
          <Fragment key={todo.id}>
            <div className="flex items-center border-b pb-1">
              <div className={cn("w-[40px] hidden md:flex", opacityLevel)}>
                {todo.id}
              </div>
              <div className={cn("hidden md:flex w-[140px]", opacityLevel)}>
                {todo.category}
              </div>
              <div className={cn("flex-1 text-base mr-4", opacityLevel)}>
                <Link href={`/todo/${todo.id}`}>{todo.description}</Link>
              </div>
              <div
                className={cn("hidden md:flex w-[140px] mr-4", opacityLevel)}
              >
                {format(new Date(todo.created), "dd-MM-yy HH:mm")}
              </div>
              <div className="w-20 md:w-32 mr-4">
                <TodoStatus id={todo.id} status={todo.status} />
              </div>
              <div className="w-[40px] mr-2">
                <TodoDelete id={todo.id} />
              </div>
            </div>
            <div className="flex flex-1 items-center mr-[150px] md:mr-[220px]mb-6 ">
              <Link href={`/todo/${todo.id}`}>
                <div className="opacity-60 italic text-ellipsis  line-clamp-2">
                  {todo.ai_rec}
                </div>
              </Link>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
