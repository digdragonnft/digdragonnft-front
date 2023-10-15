import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <div
      className="hero relative h-full bg-gradient-to-bl from-[#1F9BB7] via-[#29669F] to-[#282F7D]"
      //   style={{
      //     backgroundImage: "url(/images/hero1.png)",
      //   }}
    >
      {/* <div className="hero-overlay bg-opacity-60"></div> */}
      <Image
        className="pt-[4rem]"
        src="/images/hero1.png"
        width={500}
        height={500}
        alt="hero"
      />
      <div className="hero-content text-neutral-content absolute left-[1rem] top-[1rem]">
        <div className="max-w-md border-l-[2px] pl-2">
          <h3 className="text-3xl font-bold">MORE THAN</h3>
          <h3 className="text-3xl font-bold">PROFESSION</h3>
          <h1 className="text-5xl font-bold">NFT</h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
