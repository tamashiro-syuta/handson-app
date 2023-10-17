import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    // textはstring型で必須に設定
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAllBlogs: publicProcedure.query(() => {
    return db.post.findMany();
  }),

  postBlog: publicProcedure
    .input(z.object({ title: z.string().min(1), description: z.string() }))
    // NOTE: mutationは更新系(create or update or delete)の時に使う
    .mutation(async ({ input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return db.post.create({
        data: {
          title: input.title,
          description: input.description,
        },
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
