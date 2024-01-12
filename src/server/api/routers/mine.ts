import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  getMineData,
  getMineInfo,
  getStakedTokenMetadataOf,
  getUserInfo,
} from "../services/mine.service";
import { z } from "zod";
import Address from "~/components/Shared/Typepography/Address";

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
  getStakedTokenOf: publicProcedure
    .input(
      z.object({
        wallet: z.string(),
      }),
    )
    .query(async ({ input }) => {
      return await getStakedTokenMetadataOf(input.wallet as Address);
    }),
});
