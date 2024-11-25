import { NextFunction, Request, Response } from "express";
import { LoginUserRequest, RegisterUserRequest } from "../models/user-model";
import { UserService } from "../services/auth-service";
import { UserRequest } from "../types/user-request";

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

    static async Login(req: Request, res: Response, next: NextFunction){
        try {
            const request: LoginUserRequest = req.body as LoginUserRequest
            const response = await UserService.login(request)

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async Logout(req: UserRequest, res: Response, next: NextFunction){
        try {
            const response = await UserService.logout(req.user!)

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
}