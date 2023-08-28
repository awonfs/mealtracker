"use client";
import { trpc } from "../_trpc/client";
import { useState } from "react";

function TodoList() {
  const getTodos = trpc.getTodos.useQuery();
  const addTodo = trpc.addTodo.useMutation({
    onSettled: () => {
      getTodos.refetch();
    },
  });
  const [todo, setTodo] = useState("");

  async function handleTodoSubmit() {
    if (todo.length === 0) return;
    await addTodo.mutateAsync(todo);
    setTodo("");
  }
  return (
    <div>
      <h1>Todo List</h1>
      <div>{JSON.stringify(getTodos.data)}</div>
      <div>
        <label htmlFor="todo">Add todo</label>
        <input
          className="text-black"
          id="todo"
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button onClick={handleTodoSubmit}>Add Todo</button>
      </div>
    </div>
  );
}

export default TodoList;
