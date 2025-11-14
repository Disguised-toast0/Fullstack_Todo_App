import { create } from "zustand";
import { api } from "../api/axios";
import { Todo } from "../types/todo";
import toast from "react-hot-toast";

interface TodoStore {
  todos: Todo[];
  fetchTodos: () => Promise<void>;
  addTodo: (title: string) => Promise<void>;
  updateTodo: (id: string, title: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],

  fetchTodos: async () => {
    const res = await api.get("/todos");
    set({ todos: res.data.todos });
  },

  addTodo: async (title) => {
    const res = await api.post("/todos", { title });
    set((state) => ({
      todos: [res.data.todo, ...state.todos],
    }));
    toast.success("Todo added!");
  },

  updateTodo: async (id, title) => {
    const res = await api.put(`/todos/${id}`, { title });
    set((state) => ({
      todos: state.todos.map((t) => (t._id === id ? res.data.todo : t)),
    }));
    toast.success("updated todo!");
  },

  deleteTodo: async (id) => {
    await api.delete(`/todos/${id}`);
    set((state) => ({
      todos: state.todos.filter((t) => t._id !== id),
    }));
    toast.success("deleted successfully!");
  },

  toggleTodo: async (id) => {
    const res = await api.patch(`/todos/${id}/toggle`);
    set((state) => ({
      todos: state.todos.map((t) => (t._id === id ? res.data.todo : t)),
    }));
  },
}));
