import { Request, Response, NextFunction } from "express";
import { Log } from "../models/log.model";

export const errorLogger = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  // error log for Saving in MongoDB
  await Log.create({
    message: err.message || "Unknown error",
    route: req.originalUrl,
    method: req.method,
    stack: err.stack
  });

  console.error("Logged Error:", err);

  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
};
