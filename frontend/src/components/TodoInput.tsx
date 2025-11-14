import React, { useState } from "react";
import { useTodoStore } from "../store/todo.store";

const TodoInput: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const addTodo = useTodoStore((s) => s.addTodo);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!todo.trim()) return;
    try {
      await addTodo(todo.trim());
      setTodo("");
    } catch (err) {
      // optional: show toast / console
      console.error("Add todo failed", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          className="border-black/40 border-2 sm:w-250 w-60 sm:py-4 py-3 px-4 sm:ml-10 rounded-[99px] outline-0 tracking-wide capitalize"
          placeholder="Add a Todo..."
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          required
        />
        <button
          type="submit"
          className="border-none outline-none sm:px-8 sm:py-4 px-6 py-3 rounded-[99px] ml-2 bg-black text-white duration-300 ease-in-out hover:bg-slate-700 cursor-pointer shadow-xl/30  shadow-black"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default TodoInput;
