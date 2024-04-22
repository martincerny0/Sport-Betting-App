import { createTRPCRouter, publicProcedure } from '../trpc';
import bcrypt from 'bcrypt';
import { UserRegisterSchema } from '~/server/types/userType';

export const userRouter = createTRPCRouter({
    register: publicProcedure
    .input(UserRegisterSchema)
    .mutation(async ({ input, ctx }) => {

        const hashed = await bcrypt.hash(input.password, await bcrypt.genSalt(10));

        const response = await ctx.db.user.create({
            data: {
                email: input.email,
                password: hashed,
                name: input.name,
            }
        });

        return response;
    }
)});
