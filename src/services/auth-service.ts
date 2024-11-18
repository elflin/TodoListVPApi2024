import { prismaClient } from "../application/database";
import { ResponseError } from "../errors/response-error";
import { RegisterUserRequest, toUserResponse, UserResponse } from "../models/user-model";
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

    
}