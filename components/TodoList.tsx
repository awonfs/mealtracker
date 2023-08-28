"use client";
import { trpc } from "../app/_trpc/client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

function TodoList() {
  const [todo, setTodo] = useState("");
  const getTodos = trpc.getTodos.useQuery();
  const addTodo = trpc.addTodo.useMutation({
    onSettled: () => {
      getTodos.refetch();
    },
  });
  const deleteTodo = trpc.deleteTodo.useMutation({
    onSettled: () => {
      getTodos.refetch();
    },
  });

  async function handleTodoSubmit() {
    if (todo.length === 0) return;
    await addTodo.mutateAsync(todo);
    setTodo("");
  }

  async function handleTodoDelete(todoId: number) {
    await deleteTodo.mutateAsync(todoId);
  }

  return (
    <div>
      <h1>Todo List</h1>
      <div className="flex flex-col gap-6 border p-6 my-4">
        <Label htmlFor="todo">Add todo</Label>
        <Input
          placeholder="Write you todo here"
          id="todo"
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <Button
          className="rounded text-lg font-semibold hover:scale-105 transform transition-all"
          onClick={handleTodoSubmit}
        >
          Submit
        </Button>
      </div>
      <ul>
        {getTodos.data?.map((todo) => {
          return (
            <li key={todo.id}>
              <div className="flex justify-between">
                <span>{todo.content}</span>
                <span
                  className="hover:cursor-pointer"
                  onClick={() => handleTodoDelete(todo.id)}
                >
                  {"❌"}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TodoList;
