import { Address } from "viem";
import { abi, address } from "~/blockchain/NFT/abi";
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

export const getTokensURIOf = async (owner: Address) => {
  try {
    const tokens = await getTokensOfOwner(owner);

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

    console.log(uris);

    if (uris.length > 0) {
      const meta = await extractTokensMetadata(uris);
      return meta;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getTokensOfOwner = async (owner: Address) => {
  const balance = (await getBalanceOf(owner)) as bigint;
  const tokens = new Array(balance);

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
};

export const getBalanceOf = async (owner: Address) => {
  const balance = await viem.readContract({
    abi,
    address,
    functionName: "balanceOf",
    args: [owner],
  });

  console.log("balance: ", balance);
  return balance;
};
