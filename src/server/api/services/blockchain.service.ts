import { viem } from "./viem.service";

export const getCurrentBlockNumber = async () => {
  const blocknumber = await viem.getBlockNumber();
  return blocknumber;
};
