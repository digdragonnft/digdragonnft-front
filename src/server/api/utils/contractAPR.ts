export function contractAPRCalculator(
  rewardPerBlock: bigint,
  totalHashPower: bigint,
  accTokenPerShare: bigint,
) {
  const blockPerYear = 6307200;
  const rewardPerYear = parseFloat(rewardPerBlock.toString()) * blockPerYear;
  const totalValue =
    (parseFloat(totalHashPower.toString()) *
      parseFloat(accTokenPerShare.toString())) /
    1e12;
  const APR = (rewardPerYear / totalValue) * 100;
  return APR;
}
