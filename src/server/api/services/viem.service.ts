import { Address, createPublicClient, http } from "viem";
import { bitkub, bitkub_testnet } from "~/blockchain/constants/bitkub";
import { jbc } from "~/blockchain/constants/jbc";

export const viem = createPublicClient({
  // chain: bitkub_testnet,
  chain: bitkub,
  transport: http(),
});

export const viemJBC = createPublicClient({
  chain: jbc,
  transport: http(),
});
