import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import BaseLayoutV2 from "~/components/Shared/Layout/BaseLayoutV2";
import LoadingScreen from "~/components/Shared/LoadingScreen";
import NavBarV2 from "~/components/Shared/Nav/NavBarV2";
import { useSwitchNetwork, useChainId } from "wagmi";
import { api } from "~/utils/api";
import FloatingButton from "~/components/Shared/Button/FloatingButton";
import { toast } from "react-toastify";
import {
  useClaimWhitelist,
  useUpdateRewardEvent,
} from "~/blockchain/JBC/DistributorWhitelist/claim";
import { useClaimedEvent } from "~/blockchain/JBC/Distributor/claim";

export default function PrivilegePage() {
  const [ready, setReady] = useState<boolean>(false);
  const [claiming, setClaiming] = useState<boolean>(false);
  const [approving, setApproving] = useState<boolean>(false);

  const { switchNetwork } = useSwitchNetwork();
  const chainId = useChainId();

  const { replace, query } = useRouter();
  const { isConnected, address } = useAccount();
  const { claim } = useClaimWhitelist();

  const { data: approvable } = api.jbcWL.isApprovable.useQuery({
    address: address!,
  });

  const {
    mutate: updateReward,
    isSuccess: rewardUpdated,
    isError: rewardUpdatedError,
  } = api.jbcWL.updateReward.useMutation();
  const { data: claimable } = api.jbcWL.getClaimableOf.useQuery({
    address: address!,
  });

  const { updateRewardEvent, resetUpdateReward } = useUpdateRewardEvent(
    address!,
  );
  const { claimedEvent, resetClaimed } = useClaimedEvent(address!);

  const { data: tokenOfOwner } = api.nft.tokensOfOwner.useQuery({
    wallet: address!,
  });

  useEffect(() => {
    if (updateRewardEvent) {
      toast.success("Approving Successful !");
      setApproving(false);
      resetUpdateReward();
    }

    if (rewardUpdatedError) {
      toast.error("Approving Error, Try again");
      setApproving(false);
    }

    if (claimedEvent) {
      toast.success("Claiming Successful !");
      setClaiming(false);
      resetClaimed();
    }
  }, [rewardUpdated, rewardUpdatedError, updateRewardEvent, claimedEvent]);

  useEffect(() => {
    if (!isConnected) {
      replace("/");
    }
    setReady(true);
  }, [ready, setReady, isConnected, address]);

  if (!ready || !address) {
    return <LoadingScreen />;
  }

  const handleApproving = () => {
    setApproving(true);
    updateReward({ address: address! });
  };
  const handleClaiming = () => {
    setClaiming(true);
    claim();
  };

  return (
    <BaseLayoutV2>
      <NavBarV2 />
      <div className="flex  w-full flex-col gap-2 px-10 py-10">
        <div className="flex items-center gap-2">
          <img src={query.avatar as string} className="w-12" />
          <h1 className="font-bold text-white">{query.title ?? "N/A"}</h1>
        </div>

        <div className="p-2 text-sm text-white">
          <p>{query.content}</p>
          <p>approve your Dig Dragon and Claim JIBJIB Coin</p>
        </div>
      </div>
      <div className="grid w-full grid-cols-1 place-items-center px-10 pb-4">
        <table className="table glass max-w-2xl">
          <thead className="text-white">
            <th>Image</th>
            <th>TokenId</th>
          </thead>
          <tbody>
            {tokenOfOwner ? (
              <>
                {tokenOfOwner?.map((token) => (
                  <tr>
                    <td>
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={token.image} alt={token.name} />
                        </div>
                      </div>
                    </td>
                    <td className="font-bold text-white">{token.name}</td>
                  </tr>
                ))}
              </>
            ) : (
              <td className="text-white">Empty</td>
            )}
          </tbody>
          {tokenOfOwner ? (
            <tfoot className="text-white">
              <tr>
                <td className="flex flex-col gap-2">
                  <div className="font-bold">
                    Claimable Amounts: {claimable}
                  </div>
                  {parseInt(claimable!) <= 0 ? (
                    <>
                      {approvable ? (
                        <button
                          disabled={approving}
                          onClick={() => handleApproving()}
                          className="btn btn-info text-white hover:bg-white hover:text-info disabled:text-white"
                        >
                          {approving ? "Approving.." : "Approve Digdragon"}
                        </button>
                      ) : (
                        <p>You are already claimed!</p>
                      )}
                    </>
                  ) : (
                    <>
                      {chainId !== 8899 ? (
                        <button
                          onClick={() => switchNetwork!(8899)}
                          className="btn btn-info text-white hover:bg-white hover:text-info"
                        >
                          Switch To JBC
                        </button>
                      ) : (
                        <button
                          disabled={claiming}
                          onClick={() => handleClaiming()}
                          className="btn btn-info text-white hover:bg-white hover:text-info disabled:text-white"
                        >
                          {claiming ? "Claiming.." : "Claim JIBJIB"}
                        </button>
                      )}
                    </>
                  )}
                </td>
                <td></td>
                <td></td>
              </tr>
            </tfoot>
          ) : null}
        </table>
      </div>
      {/* <div>Empty</div> */}
      <FloatingButton />
    </BaseLayoutV2>
  );
}
