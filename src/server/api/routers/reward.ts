import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getBalanceOf } from "../services/reward.service";
import { z } from "zod";
import { Address } from "viem";

export const rewardRouter = createTRPCRouter({
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
