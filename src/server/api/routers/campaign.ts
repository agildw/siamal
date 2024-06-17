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
});
