import { Address, createPublicClient, http } from "viem";
import { bitkub } from "~/blockchain/constants/bitkub";

export const viem = createPublicClient({
  chain: bitkub,
  transport: http(),
});
