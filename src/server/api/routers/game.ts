import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
  } from "~/server/api/trpc";

  import { z } from "zod";
import { Game } from "@prisma/client";
import { resolve } from "path";
import { start } from "repl";
import { create } from "domain";



export const GameRouter = createTRPCRouter({
    getAllGames: publicProcedure
    .query(({ ctx }) => {
        return ctx.db.game.findMany();
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
        }))
        .mutation(async ({ ctx, input }) => {
        return ctx.db.game.update({
            where: { id: input.id },
            data: {
                team1Score: input.team1Score,
                team2Score: input.team2Score,
                currentIngameTime: input.currentIngameTime,
            }
        })
    }),
})






