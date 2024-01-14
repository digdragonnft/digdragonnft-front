import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  getBalanceOf,
  getTokensURIOf,
  isApprovedForAll,
} from "../services/nft.service";
import { Address } from "viem";

export const nftRouter = createTRPCRouter({
  tokensOfOwner: publicProcedure
    .input(z.object({ wallet: z.string() }))
    .query(async ({ input }) => {
      return await getTokensURIOf(input.wallet as Address);
    }),
  isApprovedForAll: publicProcedure
    .input(z.object({ wallet: z.string() }))
    .query(async ({ input }) => {
      return await isApprovedForAll(input.wallet as Address);
    }),
  balanceOf: publicProcedure
    .input(
      z.object({
        address: z.string(),
      }),
    )
    .query(async ({ input }) => {
      return await getBalanceOf(input.address as Address);
    }),
});
