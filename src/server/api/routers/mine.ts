import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  getMineData,
  getMineInfo,
  getUserInfo,
} from "../services/mine.service";
import { z } from "zod";

export const mineRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    return await getMineData();
  }),
  getUserInfo: publicProcedure
    .input(
      z.object({
        wallet: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await getUserInfo(input.wallet as `0x${string}`);
    }),
  getMineInfo: publicProcedure.query(async () => {
    return await getMineInfo();
  }),
});
