import React, { useEffect, useState } from "react";
import { Address, useAccount, useBalance } from "wagmi";
import { useStake, useStakedEvent } from "~/blockchain/Mine/stake";
import { useUnStakedEvent, useUnstake } from "~/blockchain/Mine/unstake";
import { useRevoke } from "~/blockchain/NFT/revoke";
import {
  useApprovalForAllEvent,
  useSetApprovalForAll,
} from "~/blockchain/NFT/setApprovalForAll";
import Loading from "~/components/Shared/Inidcators/Loading";
import BaseLayoutV2 from "~/components/Shared/Layout/BaseLayoutV2";
import NavBarV2 from "~/components/Shared/Nav/NavBarV2";
import NFTCard from "~/components/Wallet/Card/NftCard";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import FloatingButton from "~/components/Shared/Button/FloatingButton";
import LoadingScreen from "~/components/Shared/LoadingScreen";
import StatCardOutline from "~/components/Shared/Card/StatCardOutline";
import Link from "next/link";

const WalletPage = () => {
  const { isConnected, address } = useAccount();
  const result = useBalance({ address });
  console.log(result);
  const { replace, query } = useRouter();
  const { mine: mineAddress, title, isActive } = query;

  const [nft, setNfts] = useState<number[]>([]);
  const [approvedLoading, setApprovedLoading] = useState<boolean>(false);
  const [stakeLoading, setStakeLoading] = useState<boolean>(false);
  const [unstakeLoading, setUnstakeLoading] = useState<boolean>(false);

  //events
  const { approvedEvent, revokedEvent, resetApproved, resetRevoked } =
    useApprovalForAllEvent(address as string, mineAddress as Address);
  const { stakedEvent, resetStaked } = useStakedEvent(
    address as string,
    mineAddress as Address,
  );
  const { unStakedEvent, resetUnStaked } = useUnStakedEvent(
    address as string,
    mineAddress as Address,
  );

  const {
    data: mineInfo,
    isLoading: loadingMineInfo,
    refetch: refetchMineInfo,
  } = api.mine.getMineInfo.useQuery({ mine: mineAddress as string });

  const {
    data,
    isLoading: userInfoLoading,
    refetch: getUserInfo,
  } = api.mine.getUserInfo.useQuery({
    wallet: address as string,
    mineAddress: mineAddress as Address,
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
    refetch: refetchMyBalance,
  } = api.reward.balanceOf.useQuery({
    address: address as string,
  });

  const { data: stakedTokens, refetch: refetchStakedTokens } =
    api.mine.getStakedTokenOf.useQuery({
      wallet: address as string,
      mineAddress: mineAddress as Address,
    });

  const { data: isApprovedForAll, refetch: getIsApprovalForAll } =
    api.nft.isApprovedForAll.useQuery({
      wallet: address as string,
      mineAddress: mineAddress as Address,
    });

  const { stake, staking, stakingError } = useStake(mineAddress as string);

  const { unstake, unstaking, unstakingError } = useUnstake(
    mineAddress as string,
  );

  const { revoke, revoking, revokeError } = useRevoke(mineAddress as string);

  const { setApprovalForAll, approving, approvedError } = useSetApprovalForAll(
    mineAddress as string,
  );

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

  const handleUnStakeAll = () => {
    setUnstakeLoading(true);
    if (data?.userInfo.stakedTokenIds.length! <= 0) {
      setUnstakeLoading(false);
      return;
    }
    const tokenIds =
      data?.userInfo.stakedTokenIds.map((tokenId) =>
        parseInt(tokenId.toString()),
      ) ?? [];

    if (tokenIds.length <= 0) return;
    unstake(tokenIds);
  };

  useEffect(() => {
    getIsApprovalForAll();
    getUserInfo();
    getTokenOfOwner();
    refetchStakedTokens();
    refetchMyBalance();
    setNfts(
      tokensOfOwner === undefined || tokensOfOwner.length <= 0
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

    if (!isConnected) {
      replace("/");
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
    isConnected,
    tokensOfOwner,
  ]);

  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    setReady(true);
  }, [ready, setReady]);

  if (!ready || loadingBalance || userInfoLoading || !isConnected) {
    return <LoadingScreen />;
  }

  return (
    <BaseLayoutV2>
      <NavBarV2 />
      <div className="flex w-full flex-col px-10 py-10">
        <h1 className="flex items-center gap-3 font-bold text-white">
          Mine: {title}{" "}
          <div
            className={`badge ${
              isActive == "true"
                ? "badge-primary text-green-400"
                : "text-accent"
            }`}
          >
            {isActive == "true" ? "Active" : "Closed"}
          </div>
        </h1>
        <Link
          href={`https://www.bkcscan.com/address/${mineAddress}`}
          target="_blank"
          className="text-sm font-semibold text-slate-400"
        >
          @{mineAddress}
        </Link>
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
              revoking ||
              !mineInfo?.isActive ||
              tokensOfOwner == undefined
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
              (data && data?.userInfo.stakedTokenIds.length <= 0) ||
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

        <div className="flex flex-col items-center gap-2 sm:flex-row">
          <StatCardOutline
            title="Earned"
            value={(+data?.pendingReward!).toFixed(10).toString()!}
            count={true}
            decimal={true}
          />
          <StatCardOutline
            title="Staked Hashpower"
            value={data?.userInfo?.stakedHashPowerAmount?.toString()!}
            count={true}
            decimal={false}
          />
          <StatCardOutline
            title={mineInfo?.reward.includes("0x00") ? "Your KUB" : "Your kBTC"}
            value={
              mineInfo?.reward.includes("0x00")
                ? result.data?.formatted.toString()!
                : balance?.toString()!
            }
            count={true}
            decimal={true}
          />
        </div>
      </div>

      <div className="max-w-[1440px] px-10 py-10">
        <div className="flex flex-wrap justify-center gap-2 md:justify-start">
          {[...(tokensOfOwner ?? []), ...(stakedTokens ?? [])]
            ?.sort((a, b) => +a.tokenId.toString() - +b.tokenId.toString())
            .map((n) => (
              <NFTCard
                mineAddress={mineAddress as string}
                canStake={mineInfo?.isActive!}
                tokenId={n.tokenId.toString()}
                staked={n.staked}
                key={n.tokenId.toString()}
                image={n.image}
                video={n.animation_url}
                name={n.name}
                hash={n.attributes[5].value}
                atk={n.attributes[2].value}
                def={n.attributes[3].value}
                spd={n.attributes[4].value}
                rarity={n.attributes[0].value}
              />
            ))
            .filter(onlyUnique)}
        </div>
      </div>
      <FloatingButton />
    </BaseLayoutV2>
  );
};

function onlyUnique(value: any, index: any, array: any[]) {
  return array.indexOf(value) === index;
}

export default WalletPage;
