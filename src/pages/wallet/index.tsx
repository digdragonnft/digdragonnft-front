import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Footer from "~/components/Shared/Footer";
import BaseLayout from "~/components/Shared/Layouts/BaseLayout";
import BaseNavbar from "~/components/Shared/Navbar/BaseNavbar";
import MyMine from "~/components/Wallet/Card/MyMine";
import MyNFT from "~/components/Wallet/Card/MyNFT";
import { api } from "~/utils/api";

const WalletPage = () => {
  const { isConnected, address } = useAccount();

  const nft = api.nft.tokensOfOwner.useQuery({
    wallet: address as string,
  });

  const { data: isApprovedForAll } = api.nft.isApprovedForAll.useQuery({
    wallet: address as string,
  });

  useEffect(() => {
    if (isConnected && nft.isSuccess) {
      void nft.refetch();
    }
  }, [nft.isSuccess, isConnected]);

  return (
    <BaseLayout>
      <BaseNavbar />
      {!isConnected ? (
        <>
          <div className="mt-[10vh] flex h-screen items-start justify-center text-secondary">
            <ConnectButton />
          </div>
        </>
      ) : (
        <>
          <div className="flex w-full justify-center">
            <MyMine />
          </div>
          <div className="py-5 text-center text-3xl font-bold text-white">
            Your NFTs
          </div>
          <div className="grid grid-cols-1 place-content-center place-items-center gap-3 px-3 py-6 md:grid-cols-2">
            {!nft.isLoading && isConnected ? (
              <>
                {nft?.data?.length! > 0 ? (
                  <>
                    {nft.data?.map((nft) => (
                      <MyNFT
                        key={nft.name}
                        data={nft}
                        isApprovedForAll={
                          (isApprovedForAll as boolean) ?? false
                        }
                      />
                    ))}
                  </>
                ) : (
                  <div className="mt-10 min-h-screen text-center font-bold text-white">
                    your wallet will be empty if you send all tokens to mine
                  </div>
                )}
              </>
            ) : (
              <div className="mt-10 min-h-screen font-bold text-white">
                your wallet will be empty if you send all tokens to mine
              </div>
            )}
          </div>
        </>
      )}
      <Footer />
    </BaseLayout>
  );
};
// function onlyUnique(value: any, index: any, array: any[]) {
//   return array.indexOf(value) === index;
// }

export default WalletPage;
