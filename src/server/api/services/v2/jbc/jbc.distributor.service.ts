import { viemJBCOps, viemJBC } from "../../viem.service";
import { abi as jbcAbi, jibjibAddress } from "~/blockchain/ERC20/abi";
import { abi as jbcDisAbi, address } from "~/blockchain/JBC/Distributor/abi";

import { formatEther } from "viem";

export async function getJibJibBalance(owner: string) {
  const balance = (await viemJBC.readContract({
    abi: jbcAbi,
    address: jibjibAddress,
    functionName: "balanceOf",
    args: [owner],
  })) as bigint;

  return (+formatEther(balance)).toFixed(10);
}

export async function updateReward(owner: string, pendingReward: bigint) {
  const result = await viemJBCOps.writeContract({
    abi: jbcDisAbi,
    address: address,
    functionName: "updateReward",
    args: [owner, pendingReward],
  });

  return result;
}

export async function getClaimableOf(owner: string) {
  const claimable = (await viemJBC.readContract({
    abi: jbcDisAbi,
    address: address,
    functionName: "getClaimableOf",
    args: [owner],
  })) as bigint;

  return (+formatEther(claimable)).toFixed(10);
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
