import React from "react";
import NFTCard from "~/components/Shared/Card/NFT";
import Image from "next/image";
import SecondHeader from "~/components/Shared/Typepography/SecondHeader";

const OurNFT = () => {
  return (
    <div className="grid grid-cols-1 gap-2">
      <SecondHeader text="Our NFTs" />
      <div className="grid grid-cols-2 gap-3 p-2">
        <NFTCard rarity={0} />
        <NFTCard rarity={1} />
        <NFTCard rarity={2} />
        <NFTCard rarity={3} />
      </div>
      <div className="relative mt-[2rem] h-[400px] md:hidden">
        <Image
          fill
          src="/images/ournfthero.png"
          sizes="(max-width: 768px) 100%, (max-width: 1200px) 50vw, 33vw"
          alt="hero2"
        />
      </div>
    </div>
  );
};

export default OurNFT;
