import { Todo } from "@prisma/client"

export interface TodoCreateRequest{
    title: string
    description: string
    priority: string
    due_date: string
    status: string
}

export interface TodoResponse{
    id: number,
    title: string
    description: string
    priority: string
    due_date: string
    status: string
}

export function toTodoReponseList(todo: Todo[]): TodoResponse[]{
    const result = todo.map((data) => { 
        return{
            id: data.id,
            title: data.title,
            description: data.description,
            priority: data.priority,
            due_date: data.due_date,
            status: data.status,
        }
    })

    return result
}

export function toTodoResponse(todo: Todo): TodoResponse{
    return{
        id: todo.id,
        title: todo.title,
        description: todo.description,
        priority: todo.priority,
        due_date: todo.due_date,
        status: todo.status,
    }
}