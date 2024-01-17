import { useEffect } from "react";
import { useStakedEvent } from "~/blockchain/Mine/stake";
import { useUnStakedEvent } from "~/blockchain/Mine/unstake";
import { api } from "~/utils/api";
import { address } from "~/blockchain/Mine/abi";
import GridLayout from "~/components/Shared/Layout/GridLayout";
import GridSpacer from "~/components/Shared/Layout/GridSpacer";
import StatCard1 from "~/components/Shared/Card/StatCard1";

import { motion } from "framer-motion";
import StatCard3 from "../Shared/Card/StatCard3";

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

  const boxSlider = (delay: number) => {
    return {
      initial: { y: 20, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: {
        duration: 0.6,
        ease: "easeInOut",
        type: "spring",
        stiffness: 25,
        delay: delay,
      },
    };
  };

  return (
    <div className="col-span-12 flex flex-col justify-center md:col-span-7">
      <GridLayout>
        <GridSpacer />
        <motion.div {...boxSlider(0.4)} className="col-span-12 md:col-span-4">
          <StatCard1
            title="kBTC/OG #1"
            value={mineInfo?.isActive ? "Active" : "Inactive"}
            count={false}
          />
        </motion.div>
        <motion.div {...boxSlider(0.5)} className="col-span-12 md:col-span-6">
          <StatCard1
            title="APR"
            value={
              loadingMineInfo
                ? "N/A"
                : `${mineInfo?.apr.toFixed(2).toString()} %`
            }
            count={false}
          />
        </motion.div>
        <GridSpacer />
        <GridSpacer />
        <motion.div {...boxSlider(0.6)} className="col-span-12 md:col-span-6">
          <StatCard1
            title="Total Hash Power"
            value={
              loadingMineInfo ? "N/A" : mineInfo?.totalHashPower.toString()
            }
            count={true}
          />
        </motion.div>
        <motion.div {...boxSlider(0.7)} className="col-span-12 md:col-span-4">
          <StatCard1
            title="TotalMiner"
            value={loadingMineInfo ? "N/A" : mineInfo?.totolStaked.toString()}
            count={true}
          />
        </motion.div>
        <GridSpacer />
        <GridSpacer />
        <motion.div {...boxSlider(0.8)} className="col-span-12 md:col-span-10">
          <StatCard3 title="Mining Period">
            <div className="flex flex-col items-end  leading-tight">
              <div className="text-[36px] font-bold text-white">
                {`${
                  loadingBlockNumber
                    ? "N/A"
                    : Math.floor(
                        ((+mineInfo?.endBlock.toString() -
                          +currentBlockNumber!.toString()) *
                          5) /
                          86400,
                      ).toString()
                }days`}
              </div>
              <div className="flex flex-col text-[12px] font-semibold leading-tight text-gray-200">
                <div>
                  {`from ~${mineInfo?.startTime} to ~${mineInfo?.endTime}`}
                </div>
                <div>{`from ~block ${mineInfo?.startBlock} to ~block ${mineInfo?.endBlock}`}</div>
              </div>
            </div>
          </StatCard3>
        </motion.div>
        <GridSpacer />
      </GridLayout>
    </div>
  );
}
