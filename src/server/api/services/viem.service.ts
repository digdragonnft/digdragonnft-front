import { Address, createPublicClient, http } from "viem";
import { bitkub, bitkub_testnet } from "~/blockchain/constants/bitkub";

export const viem = createPublicClient({
  // chain: bitkub_testnet,
  chain: bitkub,
  transport: http(),
});
