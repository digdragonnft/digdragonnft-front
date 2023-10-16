import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getTokensURIOf } from "../services/nft.service";
import { Address } from "viem";

export const nftRouter = createTRPCRouter({
  tokensOfOwner: publicProcedure
    .input(z.object({ wallet: z.string() }))
    .query(async ({ input }) => {
      return await getTokensURIOf(input.wallet as Address);
    }),
});
