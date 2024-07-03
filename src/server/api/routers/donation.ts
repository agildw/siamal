import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
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
  count: publicProcedure.query(async ({ ctx }) => {
    const paidDonations = await ctx.db.donation.count({
      where: {
        status: "PAID",
      },
    });

    return paidDonations;
  }),
  countTotalFunds: publicProcedure.query(async ({ ctx }) => {
    const totalFunds = await ctx.db.donation.aggregate({
      _sum: {
        amount: true,
      },
    });

    return totalFunds._sum.amount;
  }),
});
