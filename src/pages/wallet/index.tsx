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
          {/* <div className="flex h-full items-start justify-center px-3 md:hidden md:h-screen">
            {!nft.isLoading && isConnected ? (
              <div className="carousel carousel-center rounded-box max-w-md space-x-4 p-4">
                <div className="carousel-item space-x-3">
                  {nft.data?.map((nft) => <MyNFT key={nft.name} data={nft} />)}
                </div>
              </div>
            ) : (
              <div className="mt-10 min-h-screen font-bold text-white">
                <Loading />
              </div>
            )}
          </div> */}

          <div className="grid grid-cols-1 place-content-center place-items-center gap-3 px-3 py-6 md:grid-cols-2">
            {!nft.isLoading && isConnected ? (
              <>
                {nft?.data?.length! > 0 ? (
                  <>
                    {nft.data?.map((nft) => (
                      <MyNFT key={nft.name} data={nft} />
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

export default WalletPage;
