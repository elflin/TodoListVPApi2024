import { z, ZodType } from "zod";

export class TodoValidation{
    static readonly CREATE: ZodType = z.object({
        title: z.string().min(1).max(100),
        description: z.string().min(1).max(250),
        status: z.string().min(1).max(100),
        priority: z.string().min(1).max(100),
        due_date: z.string().min(1).max(100),
    })

}