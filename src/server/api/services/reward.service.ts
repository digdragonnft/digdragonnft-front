import { Address, formatEther } from "viem";
import { viem } from "./viem.service";
import { address, abi } from "~/blockchain/ERC20/abi";

export const getBalanceOf = async (owner: Address) => {
  const balance = (await viem.readContract({
    address,
    abi,
    functionName: "balanceOf",
    args: [owner],
  })) as bigint;

  return (+formatEther(balance)).toFixed(10);
};
