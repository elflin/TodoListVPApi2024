import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../errors/response-error";
import { LoginUserRequest, RegisterUserRequest, toUserResponse, UserResponse } from "../models/user-model";
import { UserValidation } from "../validations/user-validation";
import { Validation } from "../validations/validation";
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"

export class UserService{
    static async register(req: RegisterUserRequest): Promise<UserResponse>{
        // Validate request
        const registerReq = Validation.validate(
            UserValidation.REGISTER, req
        )

        const email = await prismaClient.user.findFirst({
            where: {
                email: registerReq.email
            }
        })

        if(email){
            throw new ResponseError(400, "Email already exist")
        }

        registerReq.password = await bcrypt.hash(
            registerReq.password, 10
        )

        const user = await prismaClient.user.create({
            data: {
                username: registerReq.username,
                email: registerReq.email,
                password: registerReq.password,
                token: uuid()
            }
        })

        return toUserResponse(user)
    }

    static async login(req: LoginUserRequest): Promise<UserResponse>{
        // Validate request
        const loginReq = Validation.validate(
            UserValidation.LOGIN, req
        )

        let user = await prismaClient.user.findFirst({
            where:{
                email: loginReq.email
            }
        })

        if(!user){
            throw new ResponseError(400, "Invalid email or password!")
        }

        const passwordIsValid = await bcrypt.compare(
            loginReq.password,
            user.password
        )

        if(!passwordIsValid){
            throw new ResponseError(400, "Invalid email or password!")
        }

        user = await prismaClient.user.update({
            where:{
                id: user.id
            },
            data:{
                token: uuid(),
            }
        })
        
        return toUserResponse(user)
    }    

    static async logout(user: User): Promise<String>{

        await prismaClient.user.update({
            where:{
                id: user.id
            },
            data:{
                token: null,
            }
        })
        
        return "Logout successful"
    }  
}