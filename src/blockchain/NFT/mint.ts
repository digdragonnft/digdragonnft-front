import { abi, address } from "./abi";
import { address as Mine } from "../Mine/abi";
import { useContractWrite } from "wagmi";

export const useMint = () => {
  const { write, isSuccess, isLoading, isError } = useContractWrite({
    abi,
    address,
    functionName: "mint",
  });

  return {
    mint: write,
    minting: isLoading,
    minted: isSuccess,
  };
};
