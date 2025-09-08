import axios from "axios";
import TodoItem from "@/components/TodoItem";
import { TodoInput } from "@/components/TodoInput";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default async function TodoList() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todo`);
  const todos: Todo[] = await res.data;

  return (
    <div className="min-w-2xl p-6 rounded-xl bg-white/10 border border-white/20 backdrop-blur-lg shadow-lg">
      <h2 className="text-left text-3xl font-semibold pb-4">Add Task</h2>
      <TodoInput />
      <div className="text-left text-white space-y-4 mt-4">
        <h2 className="text-3xl font-semibold">Your Tasks</h2>
        <ul className="space-y-2">
          {todos.map((todo: any) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              title={todo.title}
              completed={todo.completed}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
