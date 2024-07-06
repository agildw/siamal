import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import xenditClient from "~/server/xendit";

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
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
  }),
  count: publicProcedure.query(async ({ ctx }) => {
    const paidDonations = await ctx.db.donation.count();

    return paidDonations;
  }),
  countTotalFunds: publicProcedure.query(async ({ ctx }) => {
    const totalFunds = await ctx.db.donation.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        status: "PAID",
      },
    });

    return totalFunds._sum.amount;
  }),
  makeDonation: protectedProcedure
    .input(
      z.object({
        amount: z.number(),
        campaignId: z.string(),
        campaignTitle: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const paymentId = uuidv4();
      let payment;
      try {
        payment = await xenditClient.Invoice.createInvoice({
          data: {
            externalId: paymentId,
            amount: input.amount,
            payerEmail: ctx.session.user.email,
            description: `Donasi untuk campaign ${input.campaignTitle}`,
            invoiceDuration: "900",
            currency: "IDR",
            customer: {
              givenNames: ctx.session.user.name,
              email: ctx.session.user.email,
            },
            shouldSendEmail: true,
            successRedirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/donations/${paymentId}/success`,
            failureRedirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/donations/${paymentId}/failed`,
          },
        });
      } catch (error) {
        console.error(error);
        throw new Error("PAYMENT_FAILED");
      }

      return ctx.db.donation.create({
        data: {
          amount: input.amount,
          campaignId: input.campaignId,
          userId: ctx.session.user.id,
          expiryDate: moment().add(15, "minutes").toDate(),
          id: paymentId,
          status: "PENDING",
          paymentUrl: payment.invoiceUrl,
        },
      });
    }),
  get: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return ctx.db.donation.findUnique({
      where: {
        id: input,
        userId: ctx.session.user.id,
      },
      include: {
        campaign: {
          select: {
            title: true,
            id: true,
            thumbnail: true,
            url: true,
          },
        },
      },
    });
  }),
  getByUser: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.donation.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        campaign: {
          select: {
            title: true,
            id: true,
            thumbnail: true,
          },
        },
      },
    });
  }),
});
