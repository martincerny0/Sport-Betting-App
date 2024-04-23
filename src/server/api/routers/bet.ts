import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
  } from "~/server/api/trpc";

import { promise, z } from "zod";
import { api } from "~/utils/api";
import { Prisma } from "@prisma/client";

import { PrismaClient } from '@prisma/client';



export const BetRouter = createTRPCRouter({

    getLatestBets: publicProcedure
    .query(({ ctx }) => {
        return ctx.db.bet.findMany({
            orderBy: { createdAt: "desc" },
        });
        }
    ),
    getUserBets: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(({input, ctx }) => {
        return ctx.db.bet.findMany({
            where: { userId: input.userId },
        });
    }),
    createBet: protectedProcedure
    .input(z.object({ 
        gameId: z.string(),
        amount: z.number(),
        userId: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
        const odds = 4;

        const response = await ctx.db.bet.create({
            data: {
                gameId: input.gameId,
                amount: input.amount,
                userId: input.userId,
                odds: odds,
                potentialWin: input.amount * odds,
                type: "win/lose",
                prediction: "team1",
            },
        });
        return response;
    }),
    updateBets: publicProcedure
    .input(z.object({
        gameId: z.string(),
        gameWinner: z.string(),
        gameScore: z.number(),
        bets: z.array(z.object({
            id: z.string(),
            type:z.string(),
            prediction: z.string(),
            userId: z.string(),
        })
        ),    
    }))
    .mutation(async ({ input, ctx }) => {
        let result = "lost";
        await Promise.all(input.bets.map(async (bet) => {
            switch(bet.type){
                case "win":
                    if(input.gameWinner === bet.prediction){
                        result = "won";
                    }
                    break;
                case "lose":
                    if(input.gameWinner !== bet.prediction){
                        result = "won";
                    }
                    break;
                case "over":
                    if(input.gameScore > parseInt(bet.prediction)){
                        result = "won";
                    }
                    break;
                case "under":
                    if(input.gameScore < parseInt(bet.prediction)){
                        result = "won";
                    }
                    break;
            }
            await ctx.db.bet.update({
                where: { id: bet.id },
                data: {
                    result: result,  
                },
            });
        }));
        return;
    }),
    getBetsByGameId: publicProcedure
    .input(z.object({ 
        gameId: z.string().min(1) 
    }))
    .query(({ input, ctx }) => {
        return ctx.db.bet.findMany({
            where: { gameId: input.gameId },
        });
    }),
    
});

    // const getBetsByGameId = async (gameId: string) => {
    //     const Bets = api.bet.getBetsByGameId.useQuery({gameId});
    //     return;
    // }
  






    // getBets: publicProcedure
    // .query(({ ctx }) => {
    //     return ctx.db.bet.findMany();
    // }),
    // getBet: publicProcedure
    // .query(({ ctx, input }) => {
    //     return ctx.db.bet.findUnique({
    //         where: { id: input.id },
    //     });
    // }),
    // createBet: protectedProcedure
    // .input(z.object({ 
    //     gameId: z.number(),
    //     team1Score: z.number(),
    //     team2Score: z.number(),
    //     team1Odds: z.number(),
    //     team2Odds: z.number(),
    //     drawOdds: z.number(),
    //     betAmount: z.number(),
    //     betType: z.string(),
    // }))
    // .mutation(async ({ ctx, input }) => {
    //     return ctx.db.bet.create({
    //         data: {
    //             gameId: input.gameId,
    //             team1Score: input.team1Score,
    //             team2Score: input.team2Score,
    //             team1Odds: input.team1Odds,
    //             team2Odds: input.team2Odds,
    //             drawOdds: input.drawOdds,
    //             betAmount: input.betAmount,
    //             betType: input.betType,
    //             createdBy: { connect: { id: ctx.session.user.id } },
    //         },
    //     });
    // }),
    // updateBet: protectedProcedure
    // .input(z.object({ 
    //     id: z.number(),
    //     gameId: z.number(),
    //     team1Score: z.number(),
    //     team2Score: z.number(),
    //     team1Odds: z.number(),
    //     team2Odds: z.number(),
    //     drawOdds: z.number(),
    //     betAmount: z.number(),
    //     betType: z.string(),
    // }))
    // .mutation(async ({ ctx, input }) => {
    //     return ctx.db.bet.update({
    //         where: { id: input.id },
    //         data: {
    //             gameId: input.gameId,
    //             team1Score: input.team1Score,
    //             team2Score: input.team2Score,
    //             team1Odds: input.team1Odds,
    //             team2Odds: input.team2Odds,
    //             drawOdds: input.drawOdds,
    //             betAmount: input.betAmount,
    //             betType: input.betType,
    //         },
    //     });
    // }),
    // deleteBet: protectedProcedure
    // .input(z.object({ id: z.number() }))
    // .mutation(async ({ ctx, input }) => {¨
    //     return ctx.db.bet.delete({
    //         where: { id: input.id },
    //     });
    // }),
