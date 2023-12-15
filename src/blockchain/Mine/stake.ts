import { abi, address } from "./abi";
import { useContractWrite } from "wagmi";
import { toast } from "react-toastify";
import { useState } from "react";
import { viem } from "~/server/api/services/viem.service";

export const useStake = () => {
  const { isLoading, isError, isSuccess, write } = useContractWrite({
    address,
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
  };
};

export const useStakedEvent = (owner: string) => {
  const [staked, setStaked] = useState<boolean>(false);

  viem.watchContractEvent({
    address,
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
