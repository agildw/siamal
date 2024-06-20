import {
  createTRPCRouter,
  protectedProcedure,
  // publicProcedure,
} from "~/server/api/trpc";

export const donationRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.donation.findMany({
      orderBy: {
        createdAt: "asc",
      },
      include: {
        campaign: {
          select: {
            title: true,
            id: true,
          },
        },
      },
    });
  }),
});
