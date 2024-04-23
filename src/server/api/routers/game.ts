import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
  } from "~/server/api/trpc";

  import { z } from "zod";

export const GameRouter = createTRPCRouter({
    getAllGames: publicProcedure
    .query(({ ctx }) => {
        return ctx.db.game.findMany();
    }),
    getGamesByFilter: publicProcedure
    .input(z.object({

        payload: z.string().min(1),
        sport: z.string().min(1),

    }))
    .query(({ ctx, input }) => {
        return ctx.db.game.findMany({
            where: {
                sport: input.sport,
            }
        });
    }),
    getGameById: publicProcedure
    .input(z.string())
    .query(({ ctx, input }) => {
        return ctx.db.game.findUnique({
            where: { id: input},
        });
    }),
    createGame: publicProcedure
    .input(z.object({ 
        sport: z.string().min(1),
        team1Name: z.string().min(1),
        team2Name: z.string().min(1),
        startTime: z.string().min(1),
        odds: z.number().min(1),
    }))
    .mutation( async ({ ctx, input }) => {
        return ctx.db.game.create({
            data: {
                sport: input.sport,
                team1Name: input.team1Name,
                team2Name: input.team2Name,
                startTime: input.startTime,
                odds: input.odds,
            }
    })
    }),
    updateGame: publicProcedure
        .input(z.object({ 
            id: z.string().min(1),
            team1Score: z.number().min(0),
            team2Score: z.number().min(0),
            currentIngameTime: z.number().min(1),
            status: z.string().min(1),
        }))
        .mutation(async ({ ctx, input }) => {
    
            const response = ctx.db.game.update({
                where: { id: input.id },
                data: {
                    team1Score: input.team1Score,
                    team2Score: input.team2Score,
                    currentIngameTime: input.currentIngameTime,
                    status: input.status,
                }
            })
            return response;
    }),
})









