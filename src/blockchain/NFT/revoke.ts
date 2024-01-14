import { abi, address } from "./abi";
import { address as Mine } from "../Mine/abi";
import { useContractWrite } from "wagmi";
import { toast } from "react-toastify";

export const useRevoke = () => {
  const { write, isSuccess, isLoading, isError } = useContractWrite({
    abi,
    address,
    functionName: "setApprovalForAll",
    args: [Mine, false],
  });

  return {
    revoke: write,
    revoking: isLoading,
    revoked: isSuccess,
    revokeError: isError,
  };
};
