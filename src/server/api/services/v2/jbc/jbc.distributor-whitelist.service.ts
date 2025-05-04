import { viemJBCOps, viemJBC, viem } from "../../viem.service";
import { abi as jbcAbi, jibjibAddress } from "~/blockchain/ERC20/abi";
import {
  abi as jbcDisAbi,
  address,
} from "~/blockchain/JBC/DistributorWhitelist/abi";
import { address as nftAddress } from "~/blockchain/NFT/abi";

import { Address, formatEther, parseEther, parseUnits } from "viem";
import { getTokensOfOwner } from "../../nft.service";

// import { client } from "../../../../../../sanity/lib/client";
// import { groq } from "next-sanity";

// export async function checkApproveable(wallet: string) {
//   const claimable = await isClaimable(wallet);
//   const tokens = await getTokensOfOwner(wallet as Address, nftAddress);
//   console.log("tokens ", tokens.toString());
//   console.log("claimable ", claimable);
//   const query = groq`*[_type == "jibjib" && wallet == "${wallet}"]{ wallet, tokenIds, approved}`;
//   const result = (await client.fetch(query)) as {
//     wallet: string;
//     tokenIds: string;
//     approved: boolean;
//   }[];
//   if (claimable) {
//     if (result.length <= 0) {
//       //has no data before
//       await client.create({
//         _type: "jibjib",
//         wallet,
//         tokenIds: tokens.toString(),
//         approved: true,
//       });
//       return true;
//     }

//     const found = result.find((w) => w.wallet == wallet);

//     if (!found) {
//       await client.create({
//         _type: "jibjib",
//         wallet,
//         tokenIds: tokens.toString(),
//         approved: true,
//       });
//       return true;
//     }

//     if (found.approved) {
//       return false;
//     }
//   } else {
//     if (result.length <= 0) {
//       await client.create({
//         _type: "jibjib",
//         wallet,
//         tokenIds: tokens.toString(),
//         approved: true,
//       });
//       return false;
//     }

//     const found = result.find((w) => w.wallet == wallet);

//     if (!found) {
//       await client.create({
//         _type: "jibjib",
//         wallet,
//         tokenIds: tokens.toString(),
//         approved: true,
//       });
//       return false;
//     }

//     if (found.approved) {
//       return false;
//     }
//   }
// }

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
  // const rewardPerToken = 250000;
  const tokenOfOwner = await getTokensOfOwner(owner as Address, nftAddress);

  // const rewards = (tokenOfOwner.length * rewardPerToken).toString();
  // const parsedReward = parseEther(rewards, "wei");
  const approvable = await isApprovable(tokenOfOwner);

  if (approvable) {
    await viemJBCOps.writeContract({
      abi: jbcDisAbi,
      address: address,
      functionName: "updateReward",
      // args: [owner, parsedReward, tokenOfOwner],
      args: [owner, tokenOfOwner],
      gasPrice: parseEther("5", "gwei"),
    });

    return true;
  } else {
    return false;
  }
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

export async function isApprovable(tokens: bigint[]) {
  const approvable = await viemJBC.readContract({
    abi: jbcDisAbi,
    address: address,
    functionName: "isApprovable",
    // args: [owner, parsedReward, tokenOfOwner],
    args: [tokens],
  });
  return approvable;
}

export async function checkApproveable(owner: string) {
  const tokenOfOwner = await getTokensOfOwner(owner as Address, nftAddress);
  const approvable = await isApprovable(tokenOfOwner);
  return approvable;
}

// export async function isClaimable(owner: string) {
//   const canClaim = await viemJBC.readContract({
//     abi: jbcDisAbi,
//     address: address,
//     functionName: "isClaimable",
//     args: [owner],
//   });

//   return canClaim;
// }
