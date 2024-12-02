import { User } from "@prisma/client";
import { TodoCreateRequest, TodoResponse, toTodoReponseList, toTodoResponse } from "../models/todo-model";
import { Validation } from "../validations/validation";
import { TodoValidation } from "../validations/todo-validation";
import { prismaClient } from "../application/database";
import { ResponseError } from "../errors/response-error";

export class TodoService {

    static async createTodo(user: User, req: TodoCreateRequest): Promise<string> {
        const todoRequest = Validation.validate(
            TodoValidation.CREATE,
            req
        )

        await prismaClient.todo.create({
            data: {
                title: todoRequest.title,
                description: todoRequest.description,
                status: todoRequest.status,
                priority: todoRequest.priority,
                due_date: todoRequest.due_date,
                user_id: user.id
            },
        })

        return "Data successfully created"
    }

    static async getAllTodo(user: User): Promise<TodoResponse[]> {
        const todos = await prismaClient.todo.findMany({
            where: {
                user_id: user.id
            }
        })

        return toTodoReponseList(todos)
    }

    static async getTodo(user: User, todoId: number): Promise<TodoResponse> {
        const todo = await prismaClient.todo.findUnique({
            where: {
                id: todoId,
                user_id: user.id
            }
        })

        if (!todo) {
            throw new ResponseError(400, "Todo not found")
        }

        return toTodoResponse(todo)
    }

    static async updateTodo(
        user: User,
        req: TodoCreateRequest,
        todoId: number
    ): Promise<String> {

        const todoRequest = Validation.validate(
            TodoValidation.CREATE,
            req
        )

        const todo = await prismaClient.todo.findUnique({
            where: {
                id: todoId,
                user_id: user.id
            }
        })

        if (!todo) {
            throw new ResponseError(400, "Todo not found")
        }

        await prismaClient.todo.update({
            where:{
                id: todoId,
                user_id: user.id
            },
            data:{
                title: todoRequest.title,
                description: todoRequest.description,
                status: todoRequest.status,
                priority: todoRequest.priority,
                due_date: todoRequest.due_date,
            }
        })

        return "Data successfully updated"
    
    }

    static async deleteTodo(
        user: User,
        todoId: number
    ): Promise<String> {

        const todo = await prismaClient.todo.findUnique({
            where: {
                id: todoId,
                user_id: user.id
            }
        })

        if (!todo) {
            throw new ResponseError(400, "Todo not found")
        }

        await prismaClient.todo.delete({
            where:{
                id: todoId,
                user_id: user.id
            }
        })

        return "Data successfully deleted"
    
    }
}