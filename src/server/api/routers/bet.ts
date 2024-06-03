import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
  } from "~/server/api/trpc";
import { z } from "zod";




export const BetRouter = createTRPCRouter({
    // get the hottest bet with the highest odds
    getHottestBet: publicProcedure
    .query(({ ctx }) => {
        return ctx.db.bet.findFirst({
            where: { result: "pending" },
            orderBy: { odds: "desc" },
        });
    }),
    // get 3 best bets with the highest odds, excluding the hottest bet
    trendingBets: publicProcedure
    .query(({ ctx }) => {
        return ctx.db.bet.findMany({
            where: { result: "pending" },
            orderBy: { createdAt: "desc" },
            skip: 1,
            take: 3,
        });
    }),
    // get betts with pending results 
    liveBets: publicProcedure 
    .query(({ ctx }) => {
        return ctx.db.bet.findMany({
            where: { result: "pending" },
            orderBy: { createdAt: "desc" },
            take: 3,
        });
    }),
    getLatestBets: publicProcedure
    .query(({ ctx }) => {
        return ctx.db.bet.findMany({
            orderBy: { createdAt: "desc" },
        });
        }
    ),
    // get bets by user
    getUserBets: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({input, ctx }) => {
        return await ctx.db.bet.findMany({
            where: { userId: input.userId },
            include: { game: true },
        });
        
    }),
    createBet: protectedProcedure
    .input(z.object({ 
        gameId: z.string(),
        userId: z.string(),
        amount: z.number(),
        prediction: z.string(),
        type: z.string(),
        odds: z.number(),
        // oddsTeam1Win: z.number(),
        // oddsTeam2Win: z.number(),
        // oddsOver: z.number(),
        // oddsUnder: z.number(),
    }))
    .mutation(async ({ input, ctx }) => {

        // let odds = 1;

        // switch(input.type){
        //     case "win":
        //         input.prediction === "team1" ? odds = input.oddsTeam1Win : odds = input.oddsTeam2Win;
        //         break;
        //     case "lose":
        //         input.prediction === "team1" ? odds = input.oddsTeam2Win : odds = input.oddsTeam1Win;
        //         break;
        //     case "over":
        //         odds = input.oddsOver;
        //         break;
        //     case "under":
        //         odds = input.oddsUnder;
        //     break;
        // }

        return await ctx.db.bet.create({
            data: {
                gameId: input.gameId,
                amount: input.amount,
                userId: input.userId,
                odds: input.odds,
                potentialWin: input.amount * input.odds,
                type: input.type,
                prediction: input.prediction,
            },
        });
    }),
    updateBets: publicProcedure
    .input(z.object({
        gameId: z.string(),
        team1Score: z.number(),
        team2Score: z.number(),
        bets: z.array(z.object({
            id: z.string(),
            type:z.string(),
            prediction: z.string(),
            userId: z.string(),
        })
        ),    
    }))
    .mutation(async ({ input, ctx }) => {
        // determine winner & total score
        const gameWinner = input.team1Score > input.team2Score ? "Team1" : "Team2";
        const totalScore = input.team1Score + input.team2Score;
        let result = "lost";

        // compare bet predictions with game results
        await Promise.all(input.bets.map(async (bet) => {
            switch(bet.type){
                case "win":
                    if(gameWinner === bet.prediction){
                        result = "won";
                    }
                    break;
                case "lose":
                    if(gameWinner !== bet.prediction){
                        result = "won";
                    }
                    break;
                case "over":
                    if(totalScore > parseInt(bet.prediction)){
                        result = "won";
                    }
                    break;
                case "under":
                    if(totalScore < parseInt(bet.prediction)){
                        result = "won";
                    }
                    break;
            }
            const betInfo = await ctx.db.bet.update({
                where: { id: bet.id },
                data: {
                    result: result,  
                },
            });
            if(result = "won"){
                await ctx.db.user.update({
                    where: { id: bet.userId },
                    data: {
                        balance: {
                            increment: betInfo.potentialWin,
                        },
                    },
                })
            }
        }));
    }),
    // boost bet by 2x, available only once and before game starts 

    boostBet: protectedProcedure
    .input(z.object({
        betId: z.string(),
        amount: z.number(),
    }))
    .mutation(async ({ input, ctx }) => {
        const bet = await ctx.db.bet.findUnique({
            where: { id: input.betId },
        });
        if(!bet) return;

        // get game and check if it's still scheduled
        const game = await ctx.db.game.findUnique({
            where: { id: bet.gameId },
        });
        if(!game || game.status !== "Scheduled") return;

        return await ctx.db.bet.update({
            where: { id: input.betId },
            data: {
                amount: bet.amount * 2,
                potentialWin: bet.potentialWin * 2,
                boosted: true,
            },
        });
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
