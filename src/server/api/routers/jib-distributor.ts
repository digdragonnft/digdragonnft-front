import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  getClaimableOf,
  getJibJibBalance,
  isClaimable,
  updateReward,
} from "../services/v2/jbc/jbc.distributor.service";
import { z } from "zod";
import { Address } from "viem";

export const jbcRouter = createTRPCRouter({
  balanceOf: publicProcedure
    .input(z.object({ address: z.string() }))
    .query(async ({ input }) => {
      return await getJibJibBalance(input.address);
    }),
  updateReward: publicProcedure
    .input(z.object({ address: z.string(), pending: z.bigint() }))
    .mutation(async ({ input }) => {
      return await updateReward(input.address as Address, input.pending);
    }),
  getClaimableOf: publicProcedure
    .input(
      z.object({
        address: z.string(),
      }),
    )
    .query(async ({ input }) => {
      return await getClaimableOf(input.address);
    }),
  isClaimable: publicProcedure
    .input(
      z.object({
        address: z.string(),
      }),
    )
    .query(async ({ input }) => {
      return await isClaimable(input.address);
    }),
});
