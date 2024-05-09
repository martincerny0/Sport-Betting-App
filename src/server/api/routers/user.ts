import { TRPCError } from '@trpc/server';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import crypto from 'crypto';

export const userRouter = createTRPCRouter({
    register: publicProcedure
    .input(z.object({
        email: z.string().email(),
        password: z.string().min(1),
        name: z.string().min(1),
        dateOfBirth: z.string().min(1),
        }))
    .mutation(async ({ input, ctx }) => {

        const hashed = await bcrypt.hash(input.password, await bcrypt.genSalt(10));

        const [day, month, year] = input.dateOfBirth.split('/').map(Number);
        const dateOfBirth = new Date(year?? 0, (month?? 0) - 1, (day?? 0) + 1);

        const response = await ctx.db.user.findUnique({
            where: {
                email: input.email,
            },
        })
        if (response) {
                throw new TRPCError({
                    code: 'FORBIDDEN',
                    message: 'EMAIL ALREADY USED',
                });
        }
        const user = await ctx.db.user.create({
            data: {
                email: input.email,
                password: hashed,
                name: input.name,
                dateOfBirth: dateOfBirth,
                inviteCode: crypto.randomBytes(16).toString('hex'),
            }
        });
        const token = await ctx.db.verificationToken.create({
            data: {
                userId: user.id,
                token: crypto.randomBytes(32).toString('hex'),
            }
        });
        return token;
    }),
    depositBalance: publicProcedure
    .input(z.object({
            userId: z.string().min(1),
            amount: z.number().min(1),
            depositCode: z.string().min(1),
        })
    )
    .mutation(async ({ input, ctx }) => {

        const depositCode = await ctx.db.depositCode.findUnique({
            where: {
                code: input.depositCode,
            },
        });

        if(!depositCode) return;

        const finalAmount = input.amount + (input.amount * (depositCode.percentage) / 100);

        return await ctx.db.user.update({
            where: {
                id: input.userId,
            },
            data: {
                balance: {
                    increment: finalAmount,
                },
            },
        });
    }
    ),
    withdrawBalance: publicProcedure
    .input(z.object({
            userId: z.string().min(1),
            amount: z.number().min(1),
        })
    )
    .mutation(async ({ input, ctx }) => {

        const actualBalance = await ctx.db.user.findUnique({
            where: {
                id: input.userId,
            },
            select: {
                balance: true,
            },
        });
        switch (true) {
            case input.amount > (actualBalance?.balance?? 0):
                return { error: "Insufficient funds" };
            case input.amount < 200:
                return { error: "Minimum withdrawal is 200$" };
            default:
                break;
        }
        
        return await ctx.db.user.update({
            where: {
                id: input.userId,
            },
            data: {
                balance: {
                    decrement: input.amount,
                },
            },
        });
    },
    ),
    isEmailVerified: publicProcedure
    .input(z.object({
        token: z.string().min(1),
        }))
    .query(async ({ input, ctx }) => {
        const response = await ctx.db.verificationToken.findUnique({
            where: {
                token: input.token,
            },
            include: {
                User: true,
            },
         
        });
        if(!response) throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'USER NOT FOUND',
        });

        if(response?.User?.emailVerified === null) return { emailVerified: false, userId: response?.User?.id};
        return { emailVerified: true}
    }
    ),
    verifyEmail: publicProcedure
    .input(z.object({
        userId: z.string().min(1),
        }))
    .mutation(async ({ input, ctx }) => {
        return await ctx.db.user.update({
            where: {
                id: input.userId,
            },
            data: {
                emailVerified: new Date(),
            },
        });
    }
    ),
    useInviteCode: publicProcedure
    .input(z.object({
        inviteCode: z.string().min(1),
        }))
    .mutation(async ({ input, ctx }) => {
        const expireIn = 48; // in hours
        
        const user = await ctx.db.user.findUnique({
            where: {
                inviteCode: input.inviteCode,
            },
        });

        if(!user) return; 

        
        return await ctx.db.depositCode.create({
            data: {
                userId: user.id,
                percentage: 20,
                code: crypto.randomBytes(4).toString('hex').toUpperCase(),
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * expireIn),
            },
        });
   

        
    }
    ),
});
