import dayjs from "dayjs";
import { viem } from "../services/viem.service";

const blockTime = 5; //Bitkub blocktime
const dayInSecs = 86400;
const dayBlocks = dayInSecs / blockTime;
const monthBlocks = dayBlocks * 30;
const yearBlocks = monthBlocks * 12;

async function calculateTimeFromBlock(block: bigint) {
  const currentBlock = await viem.getBlockNumber();
  const currentBlockTime = dayjs(new Date());
  const blockDiff = block - currentBlock;
  const totalBlocksTimeInHour =
    parseInt(blockDiff.toString()) / (3600 / blockTime);
  const estimateBlockTimestamp = currentBlockTime
    .add(totalBlocksTimeInHour, "h")
    .format("YYYY-MM-DD | HH:mm");
  return estimateBlockTimestamp;
}

export async function calculateRewardTimeParameters(
  startBlock: bigint,
  endBlock: bigint,
) {
  const startTime = await calculateTimeFromBlock(startBlock);
  const endTime = await calculateTimeFromBlock(endBlock);

  return { startTime, endTime };
}
