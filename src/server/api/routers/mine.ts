import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getMineData } from "../services/mine.service";
import { z } from "zod";
import Address from "~/components/Shared/Typepography/Address";
import { scrapeViaBTC } from "../services/via-btc.service";
// import { address } from "~/blockchain/NFT/abi";
import {
  getAllMineInfo,
  getMineInfo,
  getUserInfo,
  getStakedTokenMetadataOf,
} from "../services/v2/mine-v2.service";
import { abi, address } from "~/blockchain/NFT/abi";
import { abi as abi2, address2 } from "~/blockchain/Mine/abi2";

const mines = [
  {
    mineNo: 1,
    abi: abi,
    address: address,
  },
  {
    mineNp: 2,
    abi: abi2,
    address: address2,
  },
];

export const mineRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    return await getMineData();
  }),
  getUserInfo: publicProcedure
    .input(
      z.object({
        wallet: z.string(),
        mineAddress: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await getUserInfo(
        input.wallet as `0x${string}`,
        input.mineAddress as Address,
      );
    }),
  getMineInfo: publicProcedure
    .input(
      z.object({
        mine: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const selected = mines.filter((mine) => mine.address == input.mine);
      return await getMineInfo(
        selected[0]?.abi,
        selected[0]?.address as Address,
      );
    }),

  getAllMinesInfo: publicProcedure
    .input(
      z.object({
        owner: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      return await getAllMineInfo(input.owner as Address);
    }),
  getStakedTokenOf: publicProcedure
    .input(
      z.object({
        wallet: z.string(),
        mineAddress: z.string(),
      }),
    )
    .query(async ({ input }) => {
      return await getStakedTokenMetadataOf(
        input.wallet as Address,
        address,
        input.mineAddress as Address,
      );
    }),
  getRigInfo: publicProcedure.query(async () => {
    return await scrapeViaBTC();
  }),
});
