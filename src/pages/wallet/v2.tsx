export default function WalletV2() {
  return <div>404 Page not found</div>;
}
// import React, { useEffect, useState } from "react";
// import { useAccount } from "wagmi";
// import { useStake, useStakedEvent } from "~/blockchain/Mine/stake";
// import { useUnStakedEvent, useUnstake } from "~/blockchain/Mine/unstake";
// import { useRevoke } from "~/blockchain/NFT/revoke";
// import {
//   useApprovalForAllEvent,
//   useSetApprovalForAll,
// } from "~/blockchain/NFT/setApprovalForAll";
// import Loading from "~/components/Shared/Inidcators/Loading";
// import BaseLayoutV2 from "~/components/Shared/Layout/BaseLayoutV2";
// import NavBarV2 from "~/components/Shared/Nav/NavBarV2";
// import NFTCard from "~/components/Wallet/Card/NftCard";
// import { api } from "~/utils/api";
// import { useRouter } from "next/router";
// import FloatingButton from "~/components/Shared/Button/FloatingButton";
// import LoadingScreen from "~/components/Shared/LoadingScreen";
// import StatCardOutline from "~/components/Shared/Card/StatCardOutline";
// import Link from "next/link";

// const WalletPage = () => {
//   const { isConnected, address } = useAccount();
//   const { replace, query } = useRouter();

//   const { data: collections } = api.nft.getCollectionOf.useQuery({
//     address: address as string,
//   });

//   console.log(collections);

//   const [nft, setNfts] = useState<number[]>([]);
//   const [approvedLoading, setApprovedLoading] = useState<boolean>(false);
//   const [stakeLoading, setStakeLoading] = useState<boolean>(false);
//   const [unstakeLoading, setUnstakeLoading] = useState<boolean>(false);

//   //events
//   const { approvedEvent, revokedEvent, resetApproved, resetRevoked } =
//     useApprovalForAllEvent(address as string);
//   const { stakedEvent, resetStaked } = useStakedEvent(address as string);
//   const { unStakedEvent, resetUnStaked } = useUnStakedEvent(address as string);

//   const {
//     data: mineInfo,
//     isLoading: loadingMineInfo,
//     refetch: refetchMineInfo,
//   } = api.mine.getMineInfo.useQuery();

//   const {
//     data,
//     isLoading: userInfoLoading,
//     refetch: getUserInfo,
//   } = api.mine.getUserInfo.useQuery({
//     wallet: address as string,
//   });

//   const {
//     data: tokensOfOwner,
//     isSuccess: gotTokenOfOwner,
//     refetch: getTokenOfOwner,
//   } = api.nft.tokensOfOwner.useQuery({
//     wallet: address as string,
//   });

//   const {
//     data: balance,
//     isLoading: loadingBalance,
//     refetch: refetchMyBalance,
//   } = api.reward.balanceOf.useQuery({
//     address: address as string,
//   });

//   const { data: stakedTokens, refetch: refetchStakedTokens } =
//     api.mine.getStakedTokenOf.useQuery({
//       wallet: address as string,
//     });

//   const { data: isApprovedForAll, refetch: getIsApprovalForAll } =
//     api.nft.isApprovedForAll.useQuery({ wallet: address as string });

//   const { stake, staking, stakingError } = useStake();

//   const { unstake, unstaking, unstakingError } = useUnstake();

//   const { revoke, revoking, revokeError } = useRevoke();

//   const { setApprovalForAll, approving, approvedError } =
//     useSetApprovalForAll();

//   const handleApprovalForAll = () => {
//     setApprovedLoading(true);
//     if (isApprovedForAll) {
//       setApprovedLoading(false);
//       return;
//     }

//     setApprovalForAll();
//   };

//   const handleRevoke = () => {
//     setApprovedLoading(true);
//     if (!isApprovedForAll) {
//       setApprovedLoading(false);
//       return;
//     }
//     revoke();
//   };

//   const handleSendAll = () => {
//     setStakeLoading(true);
//     if (!isApprovedForAll) {
//       setStakeLoading(false);
//       return;
//     }

//     stake(nft);
//   };

//   const handleUnStakeAll = () => {
//     setUnstakeLoading(true);
//     if (data?.userInfo.stakedTokenIds.length! <= 0) {
//       setUnstakeLoading(false);
//       return;
//     }
//     const tokenIds =
//       data?.userInfo.stakedTokenIds.map((tokenId) =>
//         parseInt(tokenId.toString()),
//       ) ?? [];

//     if (tokenIds.length <= 0) return;
//     unstake(tokenIds);
//   };

//   useEffect(() => {
//     getIsApprovalForAll();
//     getUserInfo();
//     getTokenOfOwner();
//     refetchStakedTokens();
//     refetchMyBalance();
//     setNfts(
//       tokensOfOwner == undefined
//         ? []
//         : tokensOfOwner!.map((n) => +n.tokenId.toString()),
//     );

//     if (approvedEvent || approvedError) {
//       setApprovedLoading(false);
//       resetApproved();
//     }

//     if (revokedEvent || revokeError) {
//       setApprovedLoading(false);
//       resetRevoked();
//     }

//     if (stakedEvent || stakingError) {
//       setStakeLoading(false);
//       resetStaked();
//     }

//     if (unStakedEvent || unstakingError) {
//       setUnstakeLoading(false);
//       resetUnStaked();
//     }

//     if (!isConnected) {
//       replace("/");
//     }
//   }, [
//     isApprovedForAll,
//     approvedEvent,
//     revokedEvent,
//     stakedEvent,
//     unStakedEvent,
//     stakingError,
//     unstakingError,
//     approvedError,
//     revokeError,
//     isConnected,
//   ]);

//   const [ready, setReady] = useState<boolean>(false);

//   useEffect(() => {
//     setReady(true);
//   }, [ready, setReady]);

//   if (!ready || loadingBalance || userInfoLoading) {
//     return <LoadingScreen />;
//   }

//   return (
//     <BaseLayoutV2>
//       <NavBarV2 />
//       <div className="flex w-full flex-col px-10 py-10">
//         <h1 className="font-bold text-white">{query.collection}</h1>
//         <div className="text-slate-500">
//           {address?.slice(0, 6)}...{address?.slice(37)}
//         </div>
//       </div>
//       <div className="flex w-full flex-col items-center justify-between gap-2 bg-white bg-opacity-20 px-3 py-4 backdrop-blur-sm md:flex-row md:px-10 md:py-6">
//         <div className="flex flex-wrap gap-2">
//           {collections?.map((col) => (
//             <Link
//               className={`btn btn-info ${
//                 query.collection === col.collection ? "" : "btn-outline"
//               } text-white`}
//               key={col.btn}
//               href={`/wallet/v2?collection=${col.collection}`}
//             >
//               {col.btn}
//             </Link>
//           ))}
//         </div>
//         <div className="flex flex-col items-center gap-2 sm:flex-row">
//           <StatCardOutline
//             title="Earned"
//             value={(+data?.pendingReward!).toFixed(10).toString()}
//             count={true}
//           />
//           <StatCardOutline
//             title="Staked Hashpower"
//             value={data?.userInfo?.stakedHashPowerAmount?.toString()!}
//             count={false}
//           />
//           <StatCardOutline
//             title="Your kBTC"
//             value={balance?.toString()!}
//             count={false}
//           />
//         </div>
//       </div>

//       <div className="max-w-[1440px] px-10 py-10">
//         <div className="flex flex-wrap justify-center gap-2 md:justify-start">
//           {collections
//             ?.filter((col) => col.collection == query.collection)
//             .map((n) =>
//               n.metadata.map((m) => (
//                 <NFTCard
//                   canStake={mineInfo?.isActive!}
//                   tokenId={m.tokenId.toString()}
//                   staked={m.staked}
//                   key={m.tokenId.toString()}
//                   image={m.image}
//                   video={m.animation_url ?? m.image}
//                   name={m.name}
//                   hash={m.attributes[5].value}
//                   atk={m.attributes[2].value}
//                   def={m.attributes[3].value}
//                   spd={m.attributes[4].value}
//                   rarity={m.attributes[0].value}
//                 />
//               )),
//             )}
//         </div>
//       </div>
//       <FloatingButton />
//     </BaseLayoutV2>
//   );
// };

// function onlyUnique(value: any, index: any, array: any[]) {
//   return array.indexOf(value) === index;
// }

// {
//   /* .map((n) => (
//               <NFTCard
//                 canStake={mineInfo?.isActive!}
//                 tokenId={n.tokenId.toString()}
//                 staked={n.staked}
//                 key={n.tokenId.toString()}
//                 image={n.image}
//                 video={n.animation_url}
//                 name={n.name}
//                 hash={n.attributes[5].value}
//                 atk={n.attributes[2].value}
//                 def={n.attributes[3].value}
//                 spd={n.attributes[4].value}
//                 rarity={n.attributes[0].value}
//               />
//             ))
//             .filter(onlyUnique)} */
// }

// export default WalletPage;
