import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useStake, useStakedEvent } from "~/blockchain/Mine/stake";
import { useUnStakedEvent, useUnstake } from "~/blockchain/Mine/unstake";
import { useRevoke } from "~/blockchain/NFT/revoke";
import {
  useApprovalForAllEvent,
  useSetApprovalForAll,
} from "~/blockchain/NFT/setApprovalForAll";
import Loading from "~/components/Shared/Inidcators/Loading";
import BaseLayoutV2 from "~/components/Shared/v2/BaseLayoutV2";
import NavBarV2 from "~/components/Shared/v2/NavBarV2";
import NFTCard from "~/components/Wallet/v2/Card/NftCard";
import { api } from "~/utils/api";

const WalletPage = () => {
  const { isConnected, address } = useAccount();
  const [nft, setNfts] = useState<number[]>([]);
  const [approvedLoading, setApprovedLoading] = useState<boolean>(false);
  const [stakeLoading, setStakeLoading] = useState<boolean>(false);
  const [unstakeLoading, setUnstakeLoading] = useState<boolean>(false);

  //events
  const { approvedEvent, revokedEvent, resetApproved, resetRevoked } =
    useApprovalForAllEvent(address as string);
  const { stakedEvent, resetStaked } = useStakedEvent(address as string);
  const { unStakedEvent, resetUnStaked } = useUnStakedEvent(address as string);

  const {
    data,
    isLoading: userInfoLoading,
    refetch: getUserInfo,
  } = api.mine.getUserInfo.useQuery({
    wallet: address as string,
  });

  const {
    data: tokensOfOwner,
    isSuccess: gotTokenOfOwner,
    refetch: getTokenOfOwner,
  } = api.nft.tokensOfOwner.useQuery({
    wallet: address as string,
  });

  const {
    data: balance,
    isLoading: loadingBalance,
    refetch: refetchMineBalance,
  } = api.reward.balanceOf.useQuery({
    address: address as string,
  });

  const { data: isApprovedForAll, refetch: getIsApprovalForAll } =
    api.nft.isApprovedForAll.useQuery({ wallet: address as string });

  const { stake, staking, stakingError } = useStake();

  const { unstake, unstaking, unstakingError } = useUnstake();

  const { revoke, revoking, revokeError } = useRevoke();

  const { setApprovalForAll, approving, approvedError } =
    useSetApprovalForAll();

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

    if (approvedEvent || approvedError) {
      setApprovedLoading(false);
      resetApproved();
    }

    if (revokedEvent || revokeError) {
      setApprovedLoading(false);
      resetRevoked();
    }

    if (stakedEvent || stakingError) {
      setStakeLoading(false);
      resetStaked();
    }

    if (unStakedEvent || unstakingError) {
      setUnstakeLoading(false);
      resetUnStaked();
    }
  }, [
    isApprovedForAll,
    approvedEvent,
    revokedEvent,
    stakedEvent,
    unStakedEvent,
    stakingError,
    unstakingError,
    approvedError,
    revokeError,
  ]);

  useEffect(() => {
    if (isConnected && gotTokenOfOwner) {
      void getTokenOfOwner();
    }
  }, [gotTokenOfOwner, isConnected]);

  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    setReady(true);
  }, [ready, setReady]);

  if (!ready) {
    return (
      <BaseLayoutV2>
        <div className="min-h-screen w-full">
          <div className="loading loading-spinner"></div>
        </div>
      </BaseLayoutV2>
    );
  }

  return (
    <BaseLayoutV2>
      <NavBarV2 />
      <div className="flex w-full px-10 py-10">
        <h1 className="font-bold text-white">My Collection</h1>
      </div>
      <div className="flex w-full flex-col items-center justify-between gap-2 bg-white bg-opacity-20 px-3 py-4 backdrop-blur-sm md:flex-row md:px-10 md:py-6">
        <div className="flex gap-2">
          {isApprovedForAll ? (
            <button
              className="btn text-red-800"
              disabled={revoking || staking || unstaking || approvedLoading}
              onClick={() => handleRevoke()}
            >
              {revoking || approvedLoading ? (
                <div className="flex items-center gap-2 text-white">
                  <Loading />
                  <span>Revoking..</span>
                </div>
              ) : (
                <span>Revoke</span>
              )}
            </button>
          ) : (
            <button
              className="btn btn-info text-white hover:bg-white hover:text-info"
              disabled={approving || approvedLoading}
              onClick={() => handleApprovalForAll()}
            >
              {approving || approvedLoading ? (
                <div className="flex items-center gap-2 text-white">
                  <Loading />
                  <span>Approving..</span>
                </div>
              ) : (
                <span>Approve</span>
              )}
            </button>
          )}
          <button
            className="btn btn-info text-white hover:bg-white hover:text-info"
            disabled={
              (!isApprovedForAll as boolean) ||
              staking ||
              stakeLoading ||
              unstaking ||
              revoking
            }
            onClick={() => handleSendAll()}
          >
            {staking || stakeLoading ? (
              <div className="flex items-center gap-2 text-white">
                <Loading />
                <span>Sending..</span>
              </div>
            ) : (
              <span>Send All</span>
            )}
          </button>
          <button
            className="btn btn-info text-white hover:bg-white hover:text-info"
            disabled={
              data?.userInfo.stakedTokenIds.length <= 0 ||
              unstaking ||
              unstakeLoading
            }
            onClick={() => handleUnStakeAll()}
          >
            {unstaking || unstakeLoading ? (
              <div className="flex items-center gap-2 text-white">
                <Loading />
                <span>Unstaking</span>
              </div>
            ) : (
              <span>Unstake All</span>
            )}
          </button>
        </div>

        <div className="rounded-xl border-[1px] border-info p-2">
          <div className="font-bold text-white">Your kBTC</div>
          <div className="text-info">{balance}</div>
        </div>
      </div>
      <div className="max-w-[1440px] px-10 py-10">
        <div className="flex flex-wrap justify-center gap-2">
          {tokensOfOwner?.map((n) => (
            <NFTCard
              tokenId={n.tokenId.toString()}
              key={n.tokenId.toString()}
              image={n.animation_url}
              name={n.name}
              hash={n.attributes[5].value}
              atk={n.attributes[2].value}
              def={n.attributes[3].value}
              spd={n.attributes[4].value}
              rarity={n.attributes[0].value}
            />
          ))}
        </div>
      </div>
    </BaseLayoutV2>
  );
};

// function onlyUnique(value: any, index: any, array: any[]) {
//   return array.indexOf(value) === index;
// }

export default WalletPage;
