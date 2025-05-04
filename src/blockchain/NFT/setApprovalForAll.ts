import { abi, address } from "./abi";
import { address as Mine } from "../Mine/abi";
import { Address, useContractWrite } from "wagmi";
import { useState } from "react";
import { viem } from "~/server/api/services/viem.service";

export const useSetApprovalForAll = (mine: string) => {
  const { write, isSuccess, isLoading, isError } = useContractWrite({
    abi,
    address,
    functionName: "setApprovalForAll",
    args: [mine, true],
  });

  return {
    setApprovalForAll: write,
    approving: isLoading,
    approved: isSuccess,
    approvedError: isError,
  };
};

export const useApprovalForAllEvent = (owner: string, mineAddress: Address) => {
  const [approved, setApproved] = useState<boolean>(false);
  const [revoked, setRevoked] = useState<boolean>(false);

  viem.watchContractEvent({
    address: mineAddress,
    abi,
    eventName: "ApprovalForAll",
    onLogs: (log: any[]) => {
      if (log[0].args.approved == true && log[0].args.owner == owner) {
        setApproved(true);
      }
      if (log[0].args.approved == false && log[0].args.owner == owner) {
        setRevoked(true);
      }
    },
  });

  const resetApproved = () => {
    setApproved(false);
  };
  const resetRevoked = () => {
    setRevoked(false);
  };

  return {
    approvedEvent: approved,
    revokedEvent: revoked,
    resetApproved,
    resetRevoked,
  };
};
