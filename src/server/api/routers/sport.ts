import { get } from "http";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const SportRouter = createTRPCRouter({
    getAllSports: publicProcedure
    .query(async ({ ctx }) => {
        return ctx.db.sport.findMany({
            orderBy: { name: "asc" },
        });
    }),
    getSport: publicProcedure
    .input(z.object({
        id: z.string().min(1),
    }))
    .query(async ({ input, ctx }) => {
        return ctx.db.sport.findUnique({
            where: {
                id: input.id,
            }
        });
    }),
    createSport: publicProcedure
    .input(z.object({
        name: z.string(),
        unicode: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
        return ctx.db.sport.create({
            data: {
                name: input.name,
                unicode: input.unicode,
            }
        });
    }),
    getSportByName: publicProcedure
    .input(z.object({
        name: z.string(),
    }))
    .query(async ({ input, ctx }) => {
        return ctx.db.sport.findUnique({
            where: {
                name: input.name,
            }
        });
    }),
})