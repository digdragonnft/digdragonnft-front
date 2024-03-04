import { groq } from "next-sanity";
import { client } from "../../../../../sanity/lib/client";
import { viem } from "../viem.service";
import { abi, address } from "~/blockchain/Mine/abi";
import { abi as abi2, address2, address1 } from "~/blockchain/Mine/abi2";
import { address as NFT } from "~/blockchain/NFT/abi";
import { MineType } from "sanity/schema/Mine";
import { Address, formatEther, formatUnits } from "viem";
import { contractAPRCalculator } from "../../utils/contractAPR";
import { getTokenURI, getTokensURIOf } from "../nft.service";
import { calculateRewardTimeParameters } from "../../utils/RewardCalculation";
import { getBalanceOf } from "../reward.service";

const mines = [
  {
    mineNo: 1,
    abi: abi2,
    address: address1,
  },
  {
    mineNp: 2,
    abi: abi2,
    address: address2,
  },
];

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

export const getUserInfo = async (wallet: Address, mineeAddress: Address) => {
  try {
    const userInfo = (await viem.readContract({
      abi,
      //@ts-ignore
      address: mineeAddress,
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
    const pendingReward = await getPendingReward(wallet, mineeAddress);

    // console.log({
    //   userInfo: {
    //     //@ts-ignore
    //     stakedTokenIds: userInfo.stakedTokenIds,
    //     //@ts-ignore
    //     stakedHashPowerAmount: userInfo.stakedHashPowerAmount,
    //     lastIn: userInfo.lastIn,
    //     lastOut: userInfo.lastOut,
    //   },
    //   // pendingReward,
    //   pendingReward: formatUnits(pendingReward[0] as bigint, 18),
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
      // pendingReward,
      pendingReward: formatUnits(pendingReward[0] as bigint, 18),
    };
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const getPendingReward = async (wallet: Address, mine: Address) => {
  try {
    const pendingReward = (await viem.readContract({
      address: mine,
      abi: abi2,
      functionName: "pendingReward",
      args: [wallet],
    })) as [string, bigint];

    return [pendingReward];

    // if (mine == mines[0]?.address) {
    //   const pendingReward = (await viem.readContract({
    //     address: address,
    //     abi: abi,
    //     functionName: "pendingReward",
    //     args: [wallet],
    //   })) as [string, bigint];

    //   return [pendingReward[1]];
    // }

    // if (mine == mines[1]?.address) {
    //   const pendingReward = await viem.readContract({
    //     address: address2,
    //     abi: abi2,
    //     functionName: "pendingReward",
    //     args: [wallet],
    //   });

    //   return [pendingReward];
    // }

    // return [0];
  } catch (error) {
    // console.log(error);
    return [];
  }
};

export const getAllMineInfo = async (owner: Address) => {
  const data = await Promise.all(
    mines.map(async (mine) => {
      const mineInfo = await getMineInfo(mine.abi, mine.address as Address);
      const userInfo = await getPendingReward(owner, mine.address as Address);
      return {
        ...mineInfo,
        pendingReward: formatUnits(userInfo[0] as bigint, 18) ?? 0,
      };
    }),
  );

  return data;
};

export const getMineInfo = async (abi: any, address: Address) => {
  try {
    const info = (await viem.readContract({
      address: address,
      abi: abi as string[],
      functionName: "getMineInfo",
    })) as any;

    const currentBlock = await viem.getBlockNumber();
    const balance = await getBalanceOf(address);
    const totalStaked = await getTotalStakedTokens(address);
    const totalHash = await getTotalHashPower(address);

    const parsedData = {
      mine: address,
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
      // totolStaked: info.totalStakedTokens ?? 0,
      totolStaked: totalStaked ?? 0,
      // totalHashPower: info.totalHashPower ?? 0,
      totalHashPower: totalHash ?? 0,
      isActive: info.rewardEndBlock > currentBlock,
      // isActive: true,
    };

    const apr =
      contractAPRCalculator(
        parsedData.rewardPerBlock,
        parsedData.totalHashPower,
        parsedData.accTokenPerShare,
      ) ?? 0;

    const { startTime, endTime } = await calculateRewardTimeParameters(
      parsedData.startBlock,
      parsedData.endBlock,
    );

    return { ...parsedData, apr, startTime, endTime, balance };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getStakedTokenMetadataOf = async (
  wallet: string,
  nftAddress: string,
  mineAddress: Address,
) => {
  try {
    const user = await getUserInfo(wallet as Address, mineAddress);

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
  } catch (error: any) {
    console.log("getStakedTokenMetadataOf", error.message);
    return [];
  }
};

export const getTotalStakedTokens = async (address: Address) => {
  const totalStakedTokens = (await viem.readContract({
    address: address,
    abi,
    functionName: "totalStakedTokens",
  })) as any;
  return totalStakedTokens;
};

export const getTotalHashPower = async (address: Address) => {
  const hashPower = (await viem.readContract({
    address: address,
    abi,
    functionName: "totalHashPower",
  })) as any;

  return hashPower;
};
