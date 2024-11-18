import { NextFunction, Request, Response } from "express";
import { RegisterUserRequest } from "../models/user-model";
import { UserService } from "../services/auth-service";

export class UserController{
    static async Register(req: Request, res: Response, next: NextFunction){
        try {
            const request: RegisterUserRequest = req.body as RegisterUserRequest
            const response = await UserService.register(request)

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
}