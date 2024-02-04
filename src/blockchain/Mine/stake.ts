import { abi, address } from "./abi";
import { Address, useContractWrite } from "wagmi";
import { useState } from "react";
import { viem } from "~/server/api/services/viem.service";

export const useStake = (mine: string) => {
  const { isLoading, isError, isSuccess, write } = useContractWrite({
    address: mine as Address,
    abi,
    functionName: "stake",
  });

  const stake = (tokenIds: number[]) => {
    if (tokenIds.length <= 0) return;
    write({ args: [tokenIds] });
  };

  return {
    stake,
    staking: isLoading,
    staked: isSuccess,
    stakingError: isError,
  };
};

export const useStakedEvent = (owner: string, mineAddress: Address) => {
  const [staked, setStaked] = useState<boolean>(false);

  viem.watchContractEvent({
    address: mineAddress,
    abi,
    eventName: "Staked",
    onLogs: (log: any[]) => {
      // console.log("log: ", log[0]);
      if (log[0].args.owner == owner) {
        setStaked(true);
      }
    },
  });

  const resetStaked = () => {
    setStaked(false);
  };

  return {
    stakedEvent: staked,
    resetStaked,
  };
};
