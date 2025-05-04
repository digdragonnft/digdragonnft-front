import { groq } from "next-sanity";
import { client } from "../../../../sanity/lib/client";
import { viem } from "./viem.service";
import { abi, address } from "~/blockchain/Mine/abi";
import { address as NFT } from "~/blockchain/NFT/abi";
import { MineType } from "sanity/schema/Mine";
import { Address, formatEther, formatUnits } from "viem";
import { contractAPRCalculator } from "../utils/contractAPR";
import { getTokenURI, getTokensURIOf } from "./nft.service";
import { calculateRewardTimeParameters } from "../utils/RewardCalculation";

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
    })) as {
      stakedTokenIds: bigint[];
      stakedHashPowerAmount: bigint;
      lastIn: bigint;
      lastOut: bigint;
    };
    //@ts-ignore
    // const pendingReward = await getPendingReward(wallet, mine[0].mineAddress);
    const pendingReward = await getPendingReward(wallet, address);

    // console.log({
    //   userInfo: {
    //     //@ts-ignore
    //     stakedTokenIds: userInfo.stakedTokenIds,
    //     //@ts-ignore
    //     stakedHashPowerAmount: userInfo.stakedHashPowerAmount,
    //     lastIn: userInfo.lastIn,
    //     lastOut: userInfo.lastOut,
    //   },
    //   pendingReward: formatUnits(pendingReward[1], 18),
    // });
    return {
      userInfo: {
        //@ts-ignore
        stakedTokenIds: userInfo.stakedTokenIds,
        //@ts-ignore
        stakedHashPowerAmount: userInfo.stakedHashPowerAmount,
        lastIn: userInfo.lastIn.toString(),
        lastOut: userInfo.lastOut.toString(),
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
    })) as any;

    const currentBlock = await viem.getBlockNumber();

    const parsedData = {
      nft: info.digdragon ?? "0x00",
      reward: info.reward ?? "0x00",
      hashpower: info.hashStorage ?? "0x00",
      feeCollector: info.feeCollector ?? "0x00",
      fee: info.fee ?? "0x00",
      startBlock: info.startBlock ?? 0,
      endBlock: info.rewardEndBlock ?? 0,
      rewardPerBlock: info.rewardPerBlock ?? 0,
      accTokenPerShare: info.accTokenPerShare ?? 0,
      rewardsForWithdrawal: info.rewardsForWithdrawal ?? 0,
      totolStaked: info.totalStakedTokens ?? 0,
      totalHashPower: info.totalHashPower ?? 0,
      isActive:
        currentBlock > info.startBlock && info.rewardEndBlock > currentBlock,
      // isActive: true,
    };

    const apr = contractAPRCalculator(
      parsedData.rewardPerBlock,
      parsedData.totalHashPower,
      parsedData.accTokenPerShare,
    );

    const { startTime, endTime } = await calculateRewardTimeParameters(
      parsedData.startBlock,
      parsedData.endBlock,
    );

    return { ...parsedData, apr, startTime, endTime };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getStakedTokenMetadataOf = async (
  wallet: string,
  nftAddress: string,
) => {
  try {
    const user = await getUserInfo(wallet as Address);

    if (!user) {
      console.log("user not found");
      return [];
    }

    const stakedTokenIds = user.userInfo.stakedTokenIds as bigint[];
    const tokenUris = await getTokenURI(stakedTokenIds, nftAddress as Address);

    if (!tokenUris) {
      return [];
    }

    const stakedUris = tokenUris.map((uri) => ({ ...uri, staked: true }));

    return stakedUris;
  } catch (error) {
    console.log("getStakedTokenMetadataOf", error);
    return [];
  }
};
