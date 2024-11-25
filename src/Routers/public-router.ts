import express from "express";
import { UserController } from "../controllers/user-controller";

export const publicRouter = express.Router()

publicRouter.post("/api/register", UserController.Register)
publicRouter.post("/api/login", UserController.Login)