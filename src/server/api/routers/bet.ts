import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
  } from "~/server/api/trpc";

import { number, promise, set, z } from "zod";
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
    .query(async ({input, ctx }) => {
        
        const response = await ctx.db.bet.findMany({
            where: { userId: input.userId },
        });
        setTimeout(() => {
            console.log(response);
            return response;
        }, 2000);
      
        // const allInfo = [{

        //     bet: {
        //         id: "",
        //         gameId: "",
        //         amount: 0,
        //         userId: "",
        //         odds: 0,
        //         potentialWin: 0,
        //         type: "",
        //         prediction: "",
        //         result: "",
        //     },
        //     game: {
        //         id: "",
        //         team1Name: "",
        //         team2Name: "",
        //         team1Score: 0,
        //         team2Score: 0,
        //         gameScore: 0,
        //     },
        // }]
 

        // const bets = ctx.db.bet.findMany({
        //     where: { userId: input.userId },
        // });
          



        // await Promise.all((bets as unknown as { id: string; type: string; prediction: string; userId: string; gameId: string; result: string | null; amount: number; potentialWin: number; odds: number; createdAt: Date; }[]){
        //     const game = await ctx.db.game.findUnique({
        //         where: { id: bet.gameId },
        //     });
        //     allInfo.push({
        //         bet: {
        //             id: bet.id,
        //             gameId: bet.gameId,
        //             amount: bet.amount,
        //             userId: bet.userId,
        //             odds: bet.odds,
        //             potentialWin: bet.potentialWin,
        //             type: bet.type,
        //             prediction: bet.prediction,
        //             result: bet.result ?? ""
        //         },
        //         game: {
        //             id: game?.id ?? "",
        //             team1Name: game?.team1Name ?? "",
        //             team2Name: game?.team2Name ?? "",
        //             team1Score: game?.team1Score ?? 0,
        //             team2Score: game?.team2Score ?? 0,
        //             gameScore: (game?.team1Score ?? 0) + (game?.team2Score ?? 0)
        //         }
        // }));

    }),
    createBet: protectedProcedure
    .input(z.object({ 
        gameId: z.string(),
        amount: z.number(),
        userId: z.string(),
        prediction: z.string(),
        type: z.string(),
        oddsTeam1Win: z.number(),
        oddsTeam2Win: z.number(),
        oddsOver: z.number(),
        oddsUnder: z.number(),
    }))
    .mutation(async ({ input, ctx }) => {

        let odds = 1;

        switch(input.type){
            case "win":
                input.prediction === "team1" ? odds = input.oddsTeam1Win : odds = input.oddsTeam2Win;
                break;
            case "lose":
                input.prediction === "team1" ? odds = input.oddsTeam2Win : odds = input.oddsTeam1Win;
                break;
            case "over":
                odds = input.oddsOver;
                break;
            case "under":
                odds = input.oddsUnder;
            break;
        }

        const response = await ctx.db.bet.create({
            data: {
                gameId: input.gameId,
                amount: input.amount,
                userId: input.userId,
                odds: odds,
                potentialWin: input.amount * odds,
                type: input.type,
                prediction: input.prediction,
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
