import sql from "@/lib/db";
import { Todo } from "@/modules/todo/models";

export async function fetchAllTodos(query: string) {
  try {
    return sql<Todo[]>`select *
                     from task_list
                     where 
                       title ILIKE ${`%${query}%`} OR
                       description ILIKE ${`%${query}%`}
                       order by id`;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the todo list");
  }
}

export async function fetchTodosById(id: string) {
  try {
    return sql<Todo[]>`select *
                     from task_list
                     where 
                       id = ${id}`;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the todo item");
  }
}

export async function fetchTodoCount() {
  try {
    return sql`SELECT COUNT(id) from task_list`;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the todo list");
  }
}
