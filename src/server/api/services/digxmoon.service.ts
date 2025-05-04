import { Address } from "viem";
import { abi, address2 } from "~/blockchain/NFT/abi";
import axios from "axios";
import { viem } from "./viem.service";
import { getCollections } from "../../../../sanity/lib/nft";

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

export const getTokenURI = async (tokens: bigint[], nftAddress: Address) => {
  if (!nftAddress) return;
  const uris = (await Promise.all(
    tokens.map(async (token) => {
      const uri = await viem.readContract({
        abi,
        address: nftAddress,
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
    const tokens = await getTokensOfOwner(owner, address2);
    const tokenUris = await getTokenURI(tokens, address2);
    const unstakeUris = tokenUris?.map((uri) => ({ ...uri, staked: false }));

    return unstakeUris;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getTokensOfOwner = async (owner: Address, nftAddress: Address) => {
  try {
    const balance = (await getBalanceOf(owner, nftAddress)) as bigint;
    let tokens = new Array(balance);

    if (tokens.toString() == "0") {
      return [];
    }

    for (let i = 0; i < balance; i++) {
      tokens[i] = (await viem.readContract({
        abi,
        address: nftAddress,
        functionName: "tokenOfOwnerByIndex",
        args: [owner, i],
      })) as bigint;
    }

    // console.log("tokens: ", tokens);

    return tokens;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getBalanceOf = async (owner: Address, nftAddress: Address) => {
  const balance = await viem.readContract({
    abi,
    address: nftAddress,
    functionName: "balanceOf",
    args: [owner],
  });

  // console.log("balance: ", balance);
  return balance;
};

export const isApprovedForAll = async (
  owner: Address,
  mineAddress: Address,
) => {
  const result = await viem.readContract({
    abi,
    address: address2,
    functionName: "isApprovedForAll",
    args: [owner, mineAddress],
  });

  return result;
};

export const totalSupply = async (nftAddress: Address) => {
  const result = await viem.readContract({
    abi,
    address: nftAddress,
    functionName: "totalSupply",
  });

  return result;
};

export const getCollectionOf = async (owner: Address) => {
  try {
    const collections = await getCollections();
    const data = await Promise.all(
      collections.map(async (col) => {
        const balance = (await getBalanceOf(owner, col.address)) as bigint;
        const supply = await totalSupply(col.address);
        if (balance > 0) {
          const tokens = await getTokensOfOwner(owner, col.address);
          const metadata = await getTokenURI(tokens, col.address);

          return {
            collection: col.collectionName,
            btn: col.button,
            slug: col.slug,
            balance,
            totalSupply: supply,
            metadata: metadata!,
          };
        }

        return {
          collection: col.collectionName,
          btn: col.button,
          slug: col.slug,
          balance,
          totalSupply: supply,
          metadata: [],
        };
      }),
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};
