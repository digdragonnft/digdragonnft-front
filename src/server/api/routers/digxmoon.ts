import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  getBalanceOf,
  getCollectionOf,
  getTokensURIOf,
  isApprovedForAll,
} from "../services/digxmoon.service";
import { Address } from "viem";
import { address2 } from "~/blockchain/NFT/abi";

export const digXMoonRouter = createTRPCRouter({
  tokensOfOwner: publicProcedure
    .input(z.object({ wallet: z.string() }))
    .query(async ({ input }) => {
      return await getTokensURIOf(input.wallet as Address);
    }),
  isApprovedForAll: publicProcedure
    .input(z.object({ wallet: z.string(), mineAddress: z.string() }))
    .query(async ({ input }) => {
      return await isApprovedForAll(
        input.wallet as Address,
        input.mineAddress as Address,
      );
    }),
  balanceOf: publicProcedure
    .input(
      z.object({
        address: z.string(),
      }),
    )
    .query(async ({ input }) => {
      return await getBalanceOf(input.address as Address, address2);
    }),
  getCollectionOf: publicProcedure
    .input(
      z.object({
        address: z.string(),
      }),
    )
    .query(async ({ input }) => {
      return await getCollectionOf(input.address as Address);
    }),
});
