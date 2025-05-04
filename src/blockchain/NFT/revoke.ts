import { abi, address } from "./abi";
import { address as Mine } from "../Mine/abi";
import { Address, useContractWrite } from "wagmi";
import { toast } from "react-toastify";

export const useRevoke = (mine: string) => {
  const { write, isSuccess, isLoading, isError } = useContractWrite({
    abi,
    address,
    functionName: "setApprovalForAll",
    args: [mine, false],
  });

  return {
    revoke: write,
    revoking: isLoading,
    revoked: isSuccess,
    revokeError: isError,
  };
};
