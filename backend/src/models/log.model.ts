import { Schema, model, Document } from "mongoose";

export interface ILog extends Document {
  message: string;
  route?: string;
  method?: string;
  stack?: string;
}

const logSchema = new Schema<ILog>(
  {
    message: { type: String, required: true },
    route: { type: String },
    method: { type: String },
    stack: { type: String },
  },
  { timestamps: true }
);

export const Log = model<ILog>("Log", logSchema);
