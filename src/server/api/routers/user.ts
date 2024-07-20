import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  // publicProcedure,
} from "~/server/api/trpc";
import bcrypt from "bcrypt";
import Mailjet from "node-mailjet";
import { env } from "~/env";
import moment from "moment";

export const userRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        role: z.enum(["ADMIN", "USER"]),
        password: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let hashedPassword;
      if (input.password) {
        hashedPassword = await bcrypt.hash(input.password, 10);
      }

      return ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
          role: input.role,
          password: input.password ? hashedPassword : undefined,
        },
      });
    }),
  get: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.user.findUnique({
      where: { id: input },
    });
  }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        email: z.string().email(),
        password: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const hashedPassword = input.password
        ? await bcrypt.hash(input.password, 10)
        : undefined;
      return ctx.db.user.update({
        where: { id: input.id },
        data: {
          name: input.name,
          email: input.email,
          password: hashedPassword,
        },
      });
    }),
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.delete({
        where: { id: input },
      });
    }),
  register: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const hashedPassword = await bcrypt.hash(input.password, 10);
      let user;
      try {
        user = await ctx.db.user.create({
          data: {
            name: input.name,
            email: input.email,
            role: "USER",
            password: hashedPassword,
          },
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.code === "P2002") {
          throw new Error("Email already exists");
        }
        throw error;
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const token = await ctx.db.verificationToken.create({
        data: {
          userId: user.id,
          token: Math.random().toString(36).substring(7),
          expiresAt: moment().add(1, "day").toDate(),
        },
      });

      const mailjet = Mailjet.apiConnect(
        env.MJ_APIKEY_PUBLIC,
        env.MJ_APIKEY_PRIVATE,
      );

      await mailjet.post("send", { version: "v3.1" }).request({
        Messages: [
          {
            From: {
              Email: "no-reply@siamal.turu.dev",
              Name: "Siamal",
            },

            To: [
              {
                Email: input.email,
                Name: input.name,
              },
            ],
            Subject: "Please Verify Your Email Address",
            TextPart: `Dear ${input.name},
Thank you for signing up with Siamal, a platform dedicated to making the world a better place through generous donations.

To complete your registration, please verify your email address by clicking the link below:

${env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${token.token}

By verifying your email address, you'll be able to fully access all features on our website and stay updated with the latest news and opportunities to contribute.

If you did not sign up for an account with Siamal, please ignore this email.

Thank you for joining our community and supporting our mission to make a positive impact.

Best regards,
Siamal Team`,
          },
        ],
      });

      return user;
    }),
  count: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.user.count();
    return users;
  }),
  verifyEmail: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const token = await ctx.db.verificationToken.findUnique({
        where: {
          token: input,
        },
        include: {
          user: true,
        },
      });

      if (!token || token.expiresAt < new Date()) {
        throw new Error("Invalid or expired token");
      }

      await ctx.db.user.update({
        where: {
          id: token.user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });

      await ctx.db.verificationToken.delete({
        where: {
          token: input,
        },
      });

      return token.user;
    }),
});
