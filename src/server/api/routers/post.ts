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

  getDetailBlog: publicProcedure
    .input(z.object({ id: z.number() }))
    // NOTE: queryは参照系の時に使う
    .query(async ({ input }) => {
      return db.post.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  deletedBlog: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return db.post.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
