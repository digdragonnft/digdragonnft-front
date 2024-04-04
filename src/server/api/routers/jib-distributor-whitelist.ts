import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  checkApproveable,
  getClaimableOf,
  getJibJibBalance,
  getPreClaimable,
  isClaimable,
  updateReward,
} from "../services/v2/jbc/jbc.distributor-whitelist.service";
import { z } from "zod";
import { Address } from "viem";

export const jbcWLRouter = createTRPCRouter({
  balanceOf: publicProcedure
    .input(z.object({ address: z.string() }))
    .query(async ({ input }) => {
      return await getJibJibBalance(input.address);
    }),
  updateReward: publicProcedure
    .input(z.object({ address: z.string() }))
    .mutation(async ({ input }) => {
      return await updateReward(input.address as Address);
    }),
  getPreClaimableOf: publicProcedure
    .input(
      z.object({
        address: z.string(),
      }),
    )
    .query(async ({ input }) => {
      return await getPreClaimable(input.address);
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
  isApprovable: publicProcedure
    .input(
      z.object({
        address: z.string(),
      }),
    )
    .query(async ({ input }) => {
      return await checkApproveable(input.address);
    }),
});
