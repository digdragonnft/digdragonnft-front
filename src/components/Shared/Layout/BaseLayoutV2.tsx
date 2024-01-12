import Head from "next/head";
import { ReactNode } from "react";

export default function BaseLayoutV2({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-[1] min-h-screen w-full overflow-auto bg-gradient-to-br from-black from-[40%] via-slate-900 via-[50%] to-black to-[60%]">
      <Head>
        <title>DigDragon NFT Official</title>
        <meta
          name="description"
          content="the group of people who admired NFT technology and Crypto mining. Therefore the holders can join many of our activities"
        />
      </Head>
      <img
        className="absolute bottom-0 right-0 z-[-1]"
        src="/images/hero1.png"
        alt="hero image"
      />
      {children}
    </div>
  );
}
