import { groq } from "next-sanity";
import { client } from "../../../../sanity/lib/client";
import { viem } from "./viem.service";
import { abi, address } from "~/blockchain/Mine/abi";
import { MineType } from "sanity/schema/Mine";
import { Address, formatUnits } from "viem";
import { mine } from "viem/_types/actions/test/mine";

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
    const userInfo = (await viem.readContract({
      abi,
      //@ts-ignore
      address: address,
      // address: mine[0].mineAddress,
      functionName: "getUserInfo",
      args: [wallet],
    })) as { stakedTokenIds: bigint[]; stakedHashPowerAmount: bigint };
    //@ts-ignore
    // const pendingReward = await getPendingReward(wallet, mine[0].mineAddress);
    const pendingReward = await getPendingReward(wallet, address);

    // console.log({
    //   userInfo: {
    //     //@ts-ignore
    //     stakedTokenIds: userInfo[0],
    //     //@ts-ignore
    //     stakedHashPowerAmount: userInfo[1],
    //   },
    //   pendingReward: formatUnits(pendingReward[1], 18),
    // });
    return {
      userInfo: {
        //@ts-ignore
        stakedTokenIds: userInfo[0],
        //@ts-ignore
        stakedHashPowerAmount: userInfo[1],
      },
      pendingReward: formatUnits(pendingReward[1], 18),
    };
  } catch (error) {
    console.log(error);
  }
};

export const getPendingReward = async (wallet: Address, mine: Address) => {
  try {
    const pendingReward = (await viem.readContract({
      address: mine,
      abi,
      functionName: "pendingReward",
      args: [wallet],
    })) as [string, bigint];
    return pendingReward;
  } catch (error) {
    // console.log(error);
    return [];
  }
};

export const getMineInfo = async () => {
  try {
    const info = (await viem.readContract({
      address,
      abi,
      functionName: "getMineInfo",
    })) as any[];

    const currentBlock = await viem.getBlockNumber();

    const parsedData = {
      nft: info[0],
      reward: info[1],
      hashpower: info[2],
      feeCollector: info[3],
      fee: info[4],
      startBlock: info[5],
      endBlock: info[6],
      rewardPerBlock: info[7],
      accTokenPerShare: info[8],
      rewardsForWithdrawal: info[9],
      totolStaked: info[10],
      totalHashPower: info[11],
      isActive: currentBlock > info[5],
    };

    const tokenPerHashPower = +parsedData.accTokenPerShare.toString() / 1e12;
    const apr =
      (200 / tokenPerHashPower) *
      +parsedData.totalHashPower.toString() *
      12 *
      100;
    const actualApr = Number.isNaN(apr) ? 0 : apr;

    console.log({ ...parsedData, apr: actualApr });

    return parsedData;
  } catch (error) {
    console.log(error);
    return null;
  }
};
