import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const campaignRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.campaign.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
  }),
  getAllWithDonations: protectedProcedure.query(({ ctx }) => {
    return ctx.db.campaign.findMany({
      orderBy: {
        createdAt: "asc",
      },
      include: {
        donations: true,
      },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        thumbnail: z.string(),
        target: z.number(),
        startDate: z.coerce.date(),
        endDate: z.coerce.date(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.campaign.create({
        data: {
          title: input.title,
          description: input.description,
          thumbnail: input.thumbnail,
          target: input.target,
          startDate: input.startDate,
          endDate: input.endDate,
          userId: input.userId,
          status: "ACTIVE",
        },
      });
    }),
  get: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.campaign.findUnique({
      where: { id: input },
      include: {
        donations: true,
      },
    });
  }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        thumbnail: z.string(),
        target: z.number(),
        startDate: z.coerce.date(),
        endDate: z.coerce.date(),
        status: z.enum(["ACTIVE", "INACTIVE", "COMPLETED"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.campaign.update({
        where: { id: input.id },
        data: {
          title: input.title,
          description: input.description,
          thumbnail: input.thumbnail,
          target: input.target,
          startDate: input.startDate,
          endDate: input.endDate,
          status: input.status,
        },
      });
    }),
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.db.campaign.delete({
        where: { id: input },
      });
    }),
});
