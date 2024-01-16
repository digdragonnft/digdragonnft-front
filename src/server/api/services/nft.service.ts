import { Address } from "viem";
import { abi, address } from "~/blockchain/NFT/abi";
import { abi as MineAbi, address as Mine } from "~/blockchain/Mine/abi";
import axios from "axios";
import { viem } from "./viem.service";

export const extractTokensMetadata = async (
  tokens: { uri: string; tokenId: bigint }[],
) => {
  const responses = await Promise.all(
    tokens.map(async (token) => {
      const res = await axios.get(token.uri);
      return {
        tokenId: token.tokenId,
        ...res.data,
      };
    }),
  );

  return responses;
};

export const getTokenURI = async (tokens: bigint[]) => {
  const uris = (await Promise.all(
    tokens.map(async (token) => {
      const uri = await viem.readContract({
        abi,
        address,
        functionName: "tokenURI",
        args: [token],
      });
      return {
        tokenId: token,
        uri,
      };
    }),
  )) as { tokenId: bigint; uri: string }[];

  // console.log(uris);

  if (uris.length > 0) {
    const meta = await extractTokensMetadata(uris);
    return meta;
  }
};

export const getTokensURIOf = async (owner: Address) => {
  try {
    const tokens = await getTokensOfOwner(owner);
    const tokenUris = await getTokenURI(tokens);
    const unstakeUris = tokenUris?.map((uri) => ({ ...uri, staked: false }));

    return unstakeUris;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getTokensOfOwner = async (owner: Address) => {
  try {
    const balance = (await getBalanceOf(owner)) as bigint;
    let tokens = new Array(balance);

    if (tokens.toString() == "0") {
      return [];
    }

    for (let i = 0; i < balance; i++) {
      tokens[i] = (await viem.readContract({
        abi,
        address,
        functionName: "tokenOfOwnerByIndex",
        args: [owner, i],
      })) as bigint;
    }

    console.log("tokens: ", tokens);

    return tokens;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getBalanceOf = async (owner: Address) => {
  const balance = await viem.readContract({
    abi,
    address,
    functionName: "balanceOf",
    args: [owner],
  });

  // console.log("balance: ", balance);
  return balance;
};

export const isApprovedForAll = async (owner: Address) => {
  const result = await viem.readContract({
    abi,
    address,
    functionName: "isApprovedForAll",
    args: [owner, Mine],
  });

  return result;
};
