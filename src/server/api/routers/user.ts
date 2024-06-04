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

        // hash user password
        const hashed = await bcrypt.hash(input.password, await bcrypt.genSalt(10));

        // parse date of birth
        const [day, month, year] = input.dateOfBirth.split('/').map(Number);
        const dateOfBirth = new Date(year?? 0, (month?? 0) - 1, (day?? 0) + 1);

        // check if email is already used
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
        // create new user
        const user = await ctx.db.user.create({
            data: {
                email: input.email,
                password: hashed,
                name: input.name,
                dateOfBirth: dateOfBirth,
                inviteCode: crypto.randomBytes(16).toString('hex'),
            }
        });
        // create new user verification token
        const token = await ctx.db.verificationToken.create({
            data: {
                userId: user.id,
                token: crypto.randomBytes(32).toString('hex'),
            }
        });
        return token;
    }),
    getBalance: protectedProcedure
    .input(z.object({
        userId: z.string().min(1),
        }))
    .query(async ({ input, ctx }) => {
        return await ctx.db.user.findUnique({
            where: {
                id: input.userId,
            },
            select: {
                balance: true,
            },
        });
    }
    ),
    // deposit balance to account ( demo only, doesn't const actual money )
    depositBalance: protectedProcedure
    .input(z.object({
            userId: z.string().min(1),
            amount: z.number().min(1),
            depositCode: z.string().min(1),
        })
    )
    .mutation(async ({ input, ctx }) => {

        // check if depositCode is used and get it's percentage
        const depositCode = await ctx.db.depositCode.findUnique({
            where: {
                code: input.depositCode,
            },
        });

        if(!depositCode) return;

        const finalAmount = depositCode ? (input.amount + (input.amount * depositCode.percentage / 100)) : input.amount;

        // update user balance in db
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
    // withdraw balance from account ( demo only, not applicated )
    withdrawBalance: protectedProcedure
    .input(z.object({
            userId: z.string().min(1),
            amount: z.number().min(1),
        })
    )
    .mutation(async ({ input, ctx }) => {

        // get actual user balance
        const actualBalance = await ctx.db.user.findUnique({
            where: {
                id: input.userId,
            },
            select: {
                balance: true,
            },
        });
        // check if user is able to withdraw chosen amount 
        switch (true) {
            case input.amount > (actualBalance?.balance?? 0):
                throw new TRPCError({
                    code: 'FORBIDDEN',
                    message: 'INSUFFICIENT FUNDS',
                });
            case input.amount < 200:
                throw new TRPCError({
                    code: 'FORBIDDEN',
                    message: 'MINIMUM WITHDRAWAL IS 200$',
                });
            default:
                break;
        }
        
        // update user balance in db
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
    // check if email is verified
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
        // if email isn't registered, return ERROR
        if(!response) throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'USER NOT FOUND',
        });

        if(response?.User?.emailVerified === null) return { emailVerified: false, userId: response?.User?.id};
        return { emailVerified: true}
    }
    ),
    // verify email adress
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
    // when new user use Invite give Deposit code to the creator of the invite
    useInviteCode: publicProcedure
    .input(z.object({
        inviteCode: z.string().min(1),
        }))
    .mutation(async ({ input, ctx }) => {
        const expireIn = 48; // in hours
        
        // validate invite
        const user = await ctx.db.user.findUnique({
            where: {
                inviteCode: input.inviteCode,
            },
        });

        if(!user) return; 


        // give deposit code
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
