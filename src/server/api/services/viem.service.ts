import { Hex, createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { bitkub, bitkub_testnet } from "~/blockchain/constants/bitkub";
import { jbc } from "~/blockchain/constants/jbc";

const key = process.env.digops as Hex;
let account;

if (key) {
  account = privateKeyToAccount(key);
}

export const viemJBCOps = createWalletClient({
  account,
  chain: jbc,
  transport: http(),
});

export const viem = createPublicClient({
  // chain: bitkub_testnet,
  chain: bitkub,
  transport: http(),
});

export const viemJBC = createPublicClient({
  chain: jbc,
  transport: http(),
});
