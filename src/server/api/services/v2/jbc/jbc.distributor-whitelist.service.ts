import { viemJBCOps, viemJBC, viem } from "../../viem.service";
import { abi as jbcAbi, jibjibAddress } from "~/blockchain/ERC20/abi";
import {
  abi as jbcDisAbi,
  address,
} from "~/blockchain/JBC/DistributorWhitelist/abi";
import { address as nftAddress } from "~/blockchain/NFT/abi";

import { Address, formatEther, parseEther, parseUnits } from "viem";
import { getTokensOfOwner } from "../../nft.service";

export async function getJibJibBalance(owner: string) {
  const balance = (await viemJBC.readContract({
    abi: jbcAbi,
    address: jibjibAddress,
    functionName: "balanceOf",
    args: [owner],
  })) as bigint;

  return (+formatEther(balance)).toFixed(10);
}

export async function getPreClaimable(owner: string) {
  const rewardPerToken = 250000;
  const tokenOfOwner = await getTokensOfOwner(owner as Address, nftAddress);

  const rewards = (tokenOfOwner.length * rewardPerToken).toString();
  const parsedReward = parseEther(rewards, "wei");
  return formatEther(parsedReward, "wei");
}

export async function updateReward(owner: string) {
  const rewardPerToken = 250000;
  const tokenOfOwner = await getTokensOfOwner(owner as Address, nftAddress);

  const rewards = (tokenOfOwner.length * rewardPerToken).toString();
  const parsedReward = parseEther(rewards, "wei");

  const result = await viemJBCOps.writeContract({
    abi: jbcDisAbi,
    address: address,
    functionName: "updateReward",
    args: [owner, parsedReward, tokenOfOwner],
  });

  console.log(result);

  return result;
}

export async function getClaimableOf(owner: string) {
  const claimable = (await viemJBC.readContract({
    abi: jbcDisAbi,
    address: address,
    functionName: "getClaimableOf",
    args: [owner],
  })) as bigint;

  return (+formatEther(claimable)).toFixed(10) ?? 0;
}

export async function isClaimable(owner: string) {
  const canClaim = await viemJBC.readContract({
    abi: jbcDisAbi,
    address: address,
    functionName: "isClaimable",
    args: [owner],
  });

  return canClaim;
}
