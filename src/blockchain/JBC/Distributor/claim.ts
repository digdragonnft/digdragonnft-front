import { abi, address } from "./abi";
import { Address, useContractWrite } from "wagmi";
import { useState } from "react";
import { viem, viemJBC } from "~/server/api/services/viem.service";
import { useChainId } from "wagmi";
import { useSwitchNetwork } from "wagmi";

export const useClaim = () => {
  const chainId = useChainId();
  const { switchNetwork } = useSwitchNetwork();
  const { isLoading, isError, isSuccess, write } = useContractWrite({
    address: address as Address,
    abi,
    functionName: "claim",
  });

  const claim = () => {
    if (chainId != 8899) {
      switchNetwork!(8899);
    }
    write();
  };

  return {
    claim,
    claiming: isLoading,
    claimed: isSuccess,
    claimingError: isError,
  };
};

export const useClaimedEvent = (owner: string) => {
  const [claimed, setClaimed] = useState<boolean>(false);

  viemJBC.watchContractEvent({
    address: address,
    abi,
    eventName: "Claimed",
    onLogs: (log: any[]) => {
      // console.log("log: ", log[0]);
      if (log[0].args.user == owner) {
        setClaimed(true);
      }
    },
  });

  const resetClaimed = () => {
    setClaimed(false);
  };

  return {
    claimedEvent: claimed,
    resetClaimed,
  };
};
