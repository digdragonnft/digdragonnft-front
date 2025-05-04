import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getCurrentBlockNumber } from "../services/blockchain.service";

export const blockChainRouter = createTRPCRouter({
  get: publicProcedure.query(async () => {
    return await getCurrentBlockNumber();
  }),
});
