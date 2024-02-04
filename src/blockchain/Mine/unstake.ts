import { abi, address } from "./abi";
import { Address, useContractEvent, useContractWrite } from "wagmi";
import { toast } from "react-toastify";
import { viem } from "~/server/api/services/viem.service";
import { useState } from "react";

export const useUnstake = (mine: string) => {
  const { isLoading, isError, isSuccess, write } = useContractWrite({
    address: mine as Address,
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
    unstakingError: isError,
  };
};

export const useUnStakedEvent = (owner: string, mineAddress: Address) => {
  const [unStaked, setUnStaked] = useState<boolean>(false);

  viem.watchContractEvent({
    address: mineAddress,
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
