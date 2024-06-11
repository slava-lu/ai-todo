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

export default async function TodoList({ query }: { query: string }) {
  const t = await getTranslations();
  const todos = await fetchAllTodos(query);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>id</TableHead>
            <TableHead>{t("todo#title_table_header")}</TableHead>
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
              <TableRow key={todo.id}>
                <TableCell className={opacityLevel}>{todo.id}</TableCell>
                <TableCell className={opacityLevel}>
                  <Link href={`/todo/${todo.id}`} className="underline">
                    {todo.title}
                  </Link>
                </TableCell>
                <TableCell className={opacityLevel}>
                  {todo.description}
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
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
