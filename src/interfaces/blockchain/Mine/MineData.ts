export interface MineData {
  mineNo: string;
  mineAddress: string;
  startBlock?: number;
  endBlock?: number;
  startTime?: string;
  endTime?: string;
  isActive: boolean;
  mineUrl?: string;
}

export interface MineInfo {
  mine: string;
  nft: string;
  reward: string;
  hashpower: string;
  feeCollector: string;
  fee: string;
  startBlock: bigint;
  endBlock: bigint;
  rewardPerBlock: bigint;
  accTokenPerShare: bigint;
  rewardsForWithdrawal: bigint;
  totolStaked: bigint;
  totalHashPower: bigint;
  isActive: boolean;
  apr: number;
  startTime: string;
  endTime: string;
  balance: bigint;
  pendingReward: bigint;
}
