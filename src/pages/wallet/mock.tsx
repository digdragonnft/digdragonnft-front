import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import React from "react";
import { useAccount } from "wagmi";
import { useMint } from "~/blockchain/NFT/mint";
import Footer from "~/components/Shared/Footer";
import BaseLayout from "~/components/Shared/Layouts/BaseLayout";
import BaseNavbar from "~/components/Shared/Navbar/BaseNavbar";

const Mock = () => {
  const { isConnected } = useAccount();

  const { mint, minting, minted } = useMint();

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
          <div className="min-h-screen">
            <div className="flex flex-col items-center justify-center gap-2 pt-10">
              <h2 className="text-secondary">
                Mint Mocking NFT for testing; only whitelist
              </h2>
              <button
                className="btn btn-info"
                disabled={!mint || minting}
                onClick={() => mint()}
              >
                {minting ? "minting.." : "mint"}
              </button>
              <Link href="/wallet" className="btn btn-primary">
                Back
              </Link>
            </div>
          </div>
        </>
      )}
      <Footer />
    </BaseLayout>
  );
};

export default Mock;
