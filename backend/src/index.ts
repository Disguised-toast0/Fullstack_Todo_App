import express, {Express, Request, Response} from "express";
import {config} from "dotenv";
import cors from "cors";
import { ConnectDB } from "./utils/db";
import authRoutes from "./routes/auth.routes";
import todoRoutes from "./routes/todo.routes";
import { errorLogger } from "./middlewares/errorLogger.middleware";


const app:Express = express();

config({
    path: "./.env"
})


// middlewares
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cors({
    origin: process.env.CORS_ORIGIN
      ? process.env.CORS_ORIGIN.split(",")
      : ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}))

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
app.use(errorLogger);


// app.get("/",(req: Request, res: Response)=>{
//     // res.send("hello")
//     res.json({success:"true",message: "hello world!"})
// }) 


ConnectDB()
 .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed", err);
    process.exit(1); // exit
  });