import { abi, address } from "./abi";
import { useContractEvent, useContractWrite } from "wagmi";
import { toast } from "react-toastify";
import { viem } from "~/server/api/services/viem.service";
import { useState } from "react";

export const useUnstake = () => {
  const { isLoading, isError, isSuccess, write } = useContractWrite({
    address,
    abi,
    functionName: "unstake",
  });

  const unstake = (tokenIds: number[]) => {
    write({ args: [tokenIds] });
  };

  return {
    unstake,
    unstaking: isLoading,
    unstaked: isSuccess,
  };
};

export const useUnStakedEvent = (owner: string) => {
  const [unStaked, setUnStaked] = useState<boolean>(false);

  viem.watchContractEvent({
    address,
    abi,
    eventName: "Unstaked",
    onLogs: (log: any[]) => {
      // console.log("log: ", log[0]);
      if (log[0].args.owner == owner) {
        setUnStaked(true);
      }
    },
  });

  const resetUnStaked = () => {
    setUnStaked(false);
  };

  return {
    unStakedEvent: unStaked,
    resetUnStaked,
  };
};
