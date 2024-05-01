import { TRPCError } from '@trpc/server';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';
import bcrypt from 'bcrypt';
import { use } from 'react';
import { z } from 'zod';

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

        await ctx.db.user.findUnique({
            where: {
                email: input.email,
            },
        }).then((response) => {
            if (response) {
                throw new TRPCError({
                    code: 'FORBIDDEN',
                    message: 'EMAIL ALREADY USED',
                });
            }
        });

        const response = await ctx.db.user.create({
            data: {
                email: input.email,
                password: hashed,
                name: input.name,
                dateOfBirth: dateOfBirth,
            }
        });
        console.log(response);
        return response;
    }),
    delete: protectedProcedure
    .input(z.object({
        userEmail: z.string().email(),
        }))
    .mutation(async ({ input, ctx }) => {
            
            const response = await ctx.db.user.delete({
                where: {
                    email: input.userEmail,
                },
            });
    
            return response;
        }
    ),
    verifyEmail: publicProcedure
    .input(z.object({
        email: z.string().email(),
        }))
    .mutation(async ({ input, ctx }) => {
        const response = await ctx.db.user.update({
            where: {
                email: input.email,
            },
            data: {
                emailVerified: new Date(),
            },
        });

        return response;
    }
    ),
    addBalance: publicProcedure
    .input(z.object({
            userId: z.string().min(1),
            amount: z.number().min(1),
        })
    )
    .mutation(async ({ input, ctx }) => {

        const response = await ctx.db.user.update({
            where: {
                id: input.userId,
            },
            data: {
                balance: {
                    increment: input.amount,
                },
            },
        });

        return response;
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
        
        const response = await ctx.db.user.update({
            where: {
                id: input.userId,
            },
            data: {
                balance: {
                    decrement: input.amount,
                },
            },
        });

        return response;
    },
    ),
    isEmailVerified: publicProcedure
    .input(z.object({
        email: z.string().email(),
        }))
    .query(async ({ input, ctx }) => {
        const response = await ctx.db.user.findUnique({
            where: {
                email: input.email,
            },
            select: {
                emailVerified: !null
            },
        });

        return response;
    }
)});
