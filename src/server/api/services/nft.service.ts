import { Address, createPublicClient, http } from "viem";
import { bitkub } from "~/blockchain/constants/bitkub";
import { abi, address } from "~/blockchain/NFT/abi";
import axios from "axios";
import { DigDragonMeta } from "~/interfaces/blockchain/NFT/DigdragonMetadata";

const client = createPublicClient({
  chain: bitkub,
  transport: http(),
});

export const extractTokensMetadata = async (tokens: string[]) => {
  const responses = await Promise.all(
    tokens.map(async (token) => await axios.get(token)),
  );

  return responses.map((r) => r.data as DigDragonMeta);
};

export const getTokensURIOf = async (owner: Address) => {
  try {
    const tokens = await getTokensOfOwner(owner);

    const uris = (await Promise.all(
      tokens.map(
        async (token) =>
          await client.readContract({
            abi,
            address,
            functionName: "tokenURI",
            args: [token],
          }),
      ),
    )) as string[];

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
    tokens[i] = (await client.readContract({
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
  const balance = await client.readContract({
    abi,
    address,
    functionName: "balanceOf",
    args: [owner],
  });

  console.log("balance: ", balance);
  return balance;
};
