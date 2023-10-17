import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import ConnectWalletButton from "~/components/Shared/Blockchain/Buttons/ConnectWallet";
import Footer from "~/components/Shared/Footer";
import Loading from "~/components/Shared/Inidcators/Loading";
import BaseLayout from "~/components/Shared/Layouts/BaseLayout";
import BaseNavbar from "~/components/Shared/Navbar/BaseNavbar";
import MyNFT from "~/components/Wallet/Card/MyNFT";
import { DigDragonMeta } from "~/interfaces/blockchain/NFT/DigdragonMetadata";
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
            <ConnectWalletButton />
          </div>
        </>
      ) : (
        <>
          <div className="py-5 text-center text-3xl font-bold text-white">
            Your NFT
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

          <div className=" grid grid-cols-1 place-content-center place-items-center gap-3 px-3 py-6 md:grid-cols-2">
            {!nft.isLoading && isConnected ? (
              <div>
                {nft.data?.map((nft) => <MyNFT key={nft.name} data={nft} />)}
              </div>
            ) : (
              <div className="mt-10 min-h-screen font-bold text-white">
                Empty
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
