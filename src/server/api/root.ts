import { createTRPCRouter } from "~/server/api/trpc";
import { nftRouter } from "./routers/nft";
import { mineRouter } from "./routers/mine";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  mine: mineRouter,
  nft: nftRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
