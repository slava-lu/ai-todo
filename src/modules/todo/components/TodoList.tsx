import { format } from "date-fns";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TodoStatus from "@/modules/todo/components/TodoStatus";
import TodoDelete from "@/modules/todo/components/TodoDelete";
import { fetchAllTodos } from "@/modules/todo/todo-data";
import { cn } from "@/lib/utils";

export default async function TodoList({ query }: { query: string }) {
  const t = await getTranslations();
  const todos = await fetchAllTodos(query);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>id</TableHead>
            <TableHead>{t("todo#cat_table_header")}</TableHead>
            <TableHead>{t("todo#description_table_header")}</TableHead>
            <TableHead>{t("todo#created_table_header")}</TableHead>
            <TableHead>{t("todo#action_table_header")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos.map((todo) => {
            const opacityLevel =
              todo.status === 0 ? "opacity-100" : "opacity-40";
            return (
              <>
                <TableRow key={todo.id}>
                  <TableCell className={cn("w-0.5 ", opacityLevel)}>
                    {todo.id}
                  </TableCell>
                  <TableCell className={opacityLevel}>
                    {todo.category}
                  </TableCell>
                  <TableCell className={opacityLevel}>
                    <Link
                      href={`/todo/${todo.id}`}
                      className="border-b border-black border-opacity-50"
                    >
                      {todo.description}
                    </Link>
                  </TableCell>
                  <TableCell className={opacityLevel}>
                    {format(new Date(todo.created), "dd-MM-yy HH:mm")}
                  </TableCell>
                  <TableCell>
                    <TodoStatus id={todo.id} status={todo.status} />
                  </TableCell>
                  <TableCell>
                    <TodoDelete id={todo.id} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4}>
                    <Link href={`/todo/${todo.id}`}>
                      <div className="opacity-60 mb-6 italic overflow-hidden text-ellipsis max-w-full line-clamp-2">
                        {todo.ai_rec}
                      </div>
                    </Link>
                  </TableCell>
                </TableRow>
              </>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
