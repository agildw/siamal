import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  // publicProcedure,
} from "~/server/api/trpc";
import bcrypt from "bcrypt";

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
  createUser: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const hashedPassword = await bcrypt.hash(input.password, 10);
      return ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
          role: "USER",
          password: hashedPassword,
        },
      });
    }),
  count: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.user.count();
    return users;
  }),
});
