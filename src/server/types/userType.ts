import { z } from "zod";

export const UserRegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
    name: z.string().min(1),
    });


export type IUserRegister = z.infer<typeof UserRegisterSchema>;