import { NextFunction, Response } from "express";
import { TodoCreateRequest } from "../models/todo-model";
import { TodoService } from "../services/todo-service";
import { UserRequest } from "../types/user-request";

export class TodoController {
    static async createTodo(
        req: UserRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const request: TodoCreateRequest = req.body as TodoCreateRequest
            const response = await TodoService.createTodo(req.user!, request)

            res.status(201).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async getAllTodo(
        req: UserRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const response = await TodoService.getAllTodo(req.user!)

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async getTodo(
        req: UserRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const response = await TodoService.getTodo(
                req.user!,
                Number(req.params.todoId)
            )

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async updateTodo(
        req: UserRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const request: TodoCreateRequest = req.body as TodoCreateRequest
            const response = await TodoService.updateTodo(
                req.user!,
                request,
                Number(req.params.todoId)
            )

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async deleteTodo(
        req: UserRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const response = await TodoService.deleteTodo(
                req.user!,
                Number(req.params.todoId)
            )

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

}