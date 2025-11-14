import { Request, Response } from "express";
import { Todo } from "../models/todo.model";

export const createTodo = async (req: Request, res: Response) => {
  const { title, description } = req.body;

  const todo = await Todo.create({
    user: req.user!.id,
    title,
    description,
  });

  return res.status(201).json({
    message: "Todo created",
    todo
  });
};

export const getTodos = async (req: Request, res: Response) => {
  const todos = await Todo.find({ user: req.user!.id }).sort({ createdAt: -1 });

  return res.json({
    message: "Todos fetched",
    todos
  });
};

export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const todo = await Todo.findOneAndUpdate(
    { _id: id, user: req.user!.id },
    { title, description },
    { new: true }
  );

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  return res.json({
    message: "Todo updated",
    todo
  });
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;

  const todo = await Todo.findOneAndDelete({
    _id: id,
    user: req.user!.id
  });

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  return res.json({ message: "Todo deleted" });
};

export const toggleComplete = async (req: Request, res: Response) => {
  const { id } = req.params;

  const todo = await Todo.findOne({ _id: id, user: req.user!.id });

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  todo.completed = !todo.completed;
  await todo.save();

  return res.json({
    message: "Todo status toggled",
    todo
  });
};
