import { createTRPCRouter } from "~/server/api/trpc";
import { nftRouter } from "./routers/nft";
import { mineRouter } from "./routers/mine";
import { blockChainRouter } from "./routers/blockchain";
import { rewardRouter } from "./routers/reward";
import { jbcRouter } from "./routers/jib-distributor";
import { digXMoonRouter } from "./routers/digxmoon";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  mine: mineRouter,
  nft: nftRouter,
  blockchain: blockChainRouter,
  reward: rewardRouter,
  jbc: jbcRouter,
  digxmoon: digXMoonRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
