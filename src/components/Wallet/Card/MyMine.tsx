"use client";
import React, { useEffect, useState } from "react";
import { useAccount, useContractEvent } from "wagmi";
import { useStake, useStakedEvent } from "~/blockchain/Mine/stake";
import { useUnStakedEvent, useUnstake } from "~/blockchain/Mine/unstake";
import { useRevoke } from "~/blockchain/NFT/revoke";
import {
  useApprovalForAllEvent,
  useSetApprovalForAll,
} from "~/blockchain/NFT/setApprovalForAll";
import Loading from "~/components/Shared/Inidcators/Loading";
import { api } from "~/utils/api";

const MyMine = () => {
  const [nft, setNfts] = useState<number[]>([]);
  const [approvedLoading, setApprovedLoading] = useState<boolean>(false);
  const [stakeLoading, setStakeLoading] = useState<boolean>(false);
  const [unstakeLoading, setUnstakeLoading] = useState<boolean>(false);

  const { address } = useAccount();
  const { approvedEvent, revokedEvent, resetApproved, resetRevoked } =
    useApprovalForAllEvent(address as string);
  const { stakedEvent, resetStaked } = useStakedEvent(address as string);
  const { unStakedEvent, resetUnStaked } = useUnStakedEvent(address as string);

  const {
    data,
    isLoading,
    refetch: getUserInfo,
  } = api.mine.getUserInfo.useQuery({
    wallet: address as string,
  });

  const { data: tokensOfOwner, refetch: getTokenOfOwner } =
    api.nft.tokensOfOwner.useQuery({
      wallet: address as string,
    });

  const { data: balance, isLoading: loadingBalance } =
    api.reward.balanceOf.useQuery({
      address: address as string,
    });

  const { data: isApprovedForAll, refetch: getIsApprovalForAll } =
    api.nft.isApprovedForAll.useQuery({ wallet: address as string });

  const { stake, staking } = useStake();

  const { unstake, unstaking } = useUnstake();

  const { revoke, revoking } = useRevoke();

  const { setApprovalForAll, approving } = useSetApprovalForAll();

  const handleApprovalForAll = () => {
    setApprovedLoading(true);
    if (isApprovedForAll) {
      setApprovedLoading(false);
      return;
    }

    setApprovalForAll();
  };

  const handleRevoke = () => {
    setApprovedLoading(true);
    if (!isApprovedForAll) {
      setApprovedLoading(false);
      return;
    }
    revoke();
  };

  const handleSendAll = () => {
    setStakeLoading(true);
    if (!isApprovedForAll) {
      setStakeLoading(false);
      return;
    }
    stake(nft);
  };

  const handleUnstake = (tokenId: number) => {
    setUnstakeLoading(true);
    unstake([tokenId]);
  };

  const handleUnStakeAll = () => {
    setUnstakeLoading(true);
    if (data?.userInfo.stakedTokenIds.length <= 0) {
      setUnstakeLoading(false);
      return;
    }
    unstake(data?.userInfo.stakedTokenIds);
  };

  useEffect(() => {
    getIsApprovalForAll();
    getUserInfo();
    getTokenOfOwner();
    setNfts(
      tokensOfOwner == undefined
        ? []
        : tokensOfOwner!.map((n) => +n.tokenId.toString()),
    );

    if (approvedEvent) {
      setApprovedLoading(false);
      resetApproved();
    }

    if (revokedEvent) {
      setApprovedLoading(false);
      resetRevoked();
    }

    if (stakedEvent) {
      setStakeLoading(false);
      resetStaked();
    }

    if (unStakedEvent) {
      setUnstakeLoading(false);
      resetUnStaked();
    }
  }, [
    isApprovedForAll,
    approvedEvent,
    revokedEvent,
    stakedEvent,
    unStakedEvent,
  ]);

  return (
    <div className="stats stats-vertical shadow lg:stats-horizontal">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="stat min-w-[300px]">
          <div className="stat-title text-xl font-bold">Pending reward</div>
          <div className="stat-value">
            {data?.pendingReward.toString().slice(0, 11)}
          </div>
          <div className="stat-title text-right font-bold">KBTC</div>
          <div>
            <div className="divider">staked tokens</div>
            {/* {data?.userInfo?.stakedTokenIds.map((token: any) => (
              <div key={token} className="badge badge-primary gap-2">
                {token.toString()}
              </div>
            ))} */}
            <div className="my-2 h-[100px] w-full overflow-auto">
              <table className="table table-xs">
                <thead>
                  <tr>
                    <th>tokenId</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.userInfo?.stakedTokenIds.map((token: any) => (
                    <tr key={token}>
                      <td>
                        <span className="badge badge-primary font-semibold">
                          {token.toString()}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-accent btn-xs"
                          disabled={unstakeLoading || staking}
                          onClick={() => handleUnstake(token)}
                        >
                          {unstakeLoading || staking
                            ? "unstaking.."
                            : "unstake"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="stat-title text-right">
              your total hashpower :{" "}
              <span className="font-bold text-warning">
                {data?.userInfo?.stakedHashPowerAmount.toString()}
              </span>
            </div>
            <div className="stat-title text-right">
              rewardInWallet :{" "}
              <span className="font-bold text-warning">
                {balance?.toString()}
              </span>
            </div>
          </div>
          <div className="flex w-full justify-center gap-2 pt-2">
            {isApprovedForAll ? (
              <button
                className="btn btn-accent"
                disabled={revoking || approvedLoading}
                onClick={() => handleRevoke()}
              >
                {revoking || approvedLoading ? (
                  <div className="flex items-center gap-2">
                    <Loading />
                    <span>Revoking..</span>
                  </div>
                ) : (
                  <span>Revoke</span>
                )}
              </button>
            ) : (
              <button
                className="btn btn-neutral"
                disabled={approving || approvedLoading}
                onClick={() => handleApprovalForAll()}
              >
                {approving || approvedLoading ? (
                  <div className="flex items-center gap-2">
                    <Loading />
                    <span>Approving..</span>
                  </div>
                ) : (
                  <span>Approve</span>
                )}
              </button>
            )}
            <button
              className="btn btn-neutral"
              disabled={
                (!isApprovedForAll as boolean) || staking || stakeLoading
              }
              onClick={() => handleSendAll()}
            >
              {staking || stakeLoading ? (
                <div className="flex items-center gap-2">
                  <Loading />
                  <span>Sending..</span>
                </div>
              ) : (
                <span>Send All</span>
              )}
            </button>
            <button
              className="btn btn-accent"
              disabled={
                data?.userInfo.stakedTokenIds.length <= 0 ||
                unstaking ||
                unstakeLoading
              }
              onClick={() => handleUnStakeAll()}
            >
              {unstaking || unstakeLoading ? (
                <div className="flex items-center gap-2">
                  <Loading />
                  <span>Unstaking</span>
                </div>
              ) : (
                <span>Unstake All</span>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyMine;
