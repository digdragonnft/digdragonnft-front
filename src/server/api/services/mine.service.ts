import { groq } from "next-sanity";
import { client } from "../../../../sanity/lib/client";
import { viem } from "./viem.service";
import { abi } from "~/blockchain/Mine/abi";
import { MineType } from "sanity/schema/Mine";
import { Address, formatUnits } from "viem";

export const getMineData = async () => {
  try {
    const query = groq`*[_type == "minedata"]`;
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    // console.log(error);
    return [];
  }
};

export const getActiveMineData = async () => {
  try {
    const query = groq`*[_type == "minedata" && isActive == true]`;
    const data = await client.fetch<typeof MineType>(query);
    return data;
  } catch (error) {
    // console.log(error);
    return [];
  }
};

export const getUserInfo = async (wallet: Address) => {
  try {
    const mine = (await getActiveMineData()) as (typeof MineType)[];
    const userInfo = (await viem.readContract({
      abi,
      //@ts-ignore
      address: mine[0].mineAddress,
      functionName: "getUserInfo",
      args: [wallet],
    })) as { stakedTokenIds: bigint[]; stakedHashPowerAmount: bigint };
    //@ts-ignore
    const pendingReward = await getPendingReward(wallet, mine[0].mineAddress);
    console.log(userInfo);
    return { userInfo, pendingReward: formatUnits(pendingReward[1][0], 18) };
  } catch (error) {
    // console.log(error);
  }
};

export const getPendingReward = async (wallet: Address, mine: Address) => {
  try {
    const pendingReward = (await viem.readContract({
      address: mine,
      abi,
      functionName: "pendingReward",
      args: [wallet],
    })) as [[string], [bigint]];
    return pendingReward;
  } catch (error) {
    // console.log(error);
    return [];
  }
};
