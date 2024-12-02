import express from "express";
import { authMiddleware } from "../middlewares/auth-middleware";
import { UserController } from "../controllers/user-controller";
import { TodoController } from "../controllers/todo-controller";

export const protectedRouter = express.Router()
protectedRouter.use(authMiddleware)

protectedRouter.delete("/api/logout", UserController.Logout)
protectedRouter.post("/api/todo", TodoController.createTodo)
protectedRouter.get("/api/todo", TodoController.getAllTodo)
protectedRouter.get("/api/todo/:todoId", TodoController.getTodo)
protectedRouter.put("/api/todo/:todoId", TodoController.updateTodo)
protectedRouter.delete("/api/todo/:todoId", TodoController.deleteTodo)