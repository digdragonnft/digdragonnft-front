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
import {
  abi as abi2,
  address4,
  address5,
  address6,
  address7,
  address8,
} from "~/blockchain/Mine/abi2";

import {
  abi as abi3,
  address1,
  address2,
  address3,
  address9,
  address10,
  address11,
  address12,
  address13,
  address14,
  address15,
  address16,
} from "~/blockchain/Mine/abi3";

const mines = [
  {
    abi: abi3,
    address: address1,
  },
  {
    abi: abi3,
    address: address2,
  },
  {
    abi: abi2,
    address: address4,
  },
  {
    abi: abi2,
    address: address5,
  },
  {
    abi: abi2,
    address: address6,
  },
  {
    abi: abi2,
    address: address7,
  },
  {
    abi: abi2,
    address: address8,
  },
  {
    abi: abi3,
    address: address9,
  },
  {
    abi: abi3,
    address: address10,
  },
  {
    abi: abi3,
    address: address11,
  },
  {
    abi: abi3,
    address: address12,
  },
  {
    abi: abi3,
    address: address13,
  },
  {
    abi: abi3,
    address: address14,
  },
  {
    abi: abi3,
    address: address15,
  },
  {
    abi: abi3,
    address: address16,
  },
  {
    abi: abi3,
    address: address3,
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
