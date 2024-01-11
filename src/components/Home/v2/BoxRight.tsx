import { useEffect } from "react";
import { useStakedEvent } from "~/blockchain/Mine/stake";
import { useUnStakedEvent } from "~/blockchain/Mine/unstake";
import Loading from "~/components/Shared/Inidcators/Loading";
import { api } from "~/utils/api";
import { address } from "~/blockchain/Mine/abi";
import GridLayout from "~/components/Shared/v2/GridLayout";
import GridSpacer from "~/components/Shared/v2/GridSpacer";
import StatCard1 from "~/components/Shared/v2/Card/StatCard1";
import StatCard2 from "~/components/Shared/v2/Card/StatCard2";

export default function BoxRight() {
  const {
    data: currentBlockNumber,
    isLoading: loadingBlockNumber,
    refetch: refetchBlockNumber,
  } = api.blockchain.get.useQuery();
  const {
    data: mineInfo,
    isLoading: loadingMineInfo,
    refetch: refetchMineInfo,
  } = api.mine.getMineInfo.useQuery();
  const {
    data: balance,
    isLoading: loadingBalance,
    refetch: refetchMineBalance,
  } = api.reward.balanceOf.useQuery({
    address,
  });

  const { stakedEvent, resetStaked } = useStakedEvent(address as string);
  const { unStakedEvent, resetUnStaked } = useUnStakedEvent(address as string);

  //update when staking or unstaking event occured
  useEffect(() => {
    refetchMineBalance();
    refetchMineInfo();
  }, [stakedEvent, resetStaked, unStakedEvent, resetUnStaked]);

  return (
    <div className="col-span-12 flex flex-col justify-center md:col-span-7">
      <GridLayout>
        <GridSpacer />
        <div className="col-span-12 md:col-span-4">
          <StatCard1 title="Sale Status" value="Sold out" />
        </div>
        <div className="col-span-12 md:col-span-6">
          <StatCard1
            title="APR"
            value={
              loadingMineInfo
                ? "N/A"
                : `${mineInfo?.apr.toFixed(2).toString()} %`
            }
          />
        </div>
        <GridSpacer />
        <GridSpacer />
        <div className="col-span-12 md:col-span-6">
          <StatCard1
            title="Total Hash Power"
            value={
              loadingMineInfo ? "N/A" : mineInfo?.totalHashPower.toString()
            }
          />
        </div>
        <div className="col-span-12 md:col-span-4">
          <StatCard1
            title="TotalMiner"
            value={loadingMineInfo ? "N/A" : mineInfo?.totolStaked.toString()}
          />
        </div>
        <GridSpacer />
        <GridSpacer />
        <div className="col-span-12 md:col-span-10">
          <StatCard2
            title="Mining Period"
            content={`${
              loadingBlockNumber
                ? "N/A"
                : Math.floor(
                    ((+mineInfo?.endBlock.toString() -
                      +currentBlockNumber!.toString()) *
                      5) /
                      86400,
                  ).toString()
            }days`}
            subContent={`from block ${
              loadingBlockNumber || !currentBlockNumber
                ? "N/A"
                : currentBlockNumber!.toString()
            }
            to ${loadingMineInfo ? "N/A" : mineInfo?.endBlock.toString()}`}
          />
        </div>
        <GridSpacer />
      </GridLayout>
    </div>
  );
}
