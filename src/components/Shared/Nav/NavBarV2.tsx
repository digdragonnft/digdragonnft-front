import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { FaWallet } from "react-icons/fa";
import { GiMineWagon } from "react-icons/gi";

import { motion } from "framer-motion";

export default function NavBarV2() {
  const { pathname } = useRouter();
  const { isConnected } = useAccount();

  return (
    <div className="navbar z-[20] bg-slate-500 bg-opacity-30 px-6">
      <div className="navbar-start">
        {/* <h2 className="font-semibold text-white">DigDragon NFT</h2> */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 1, type: "spring", damping: 10 }}
        >
          <Link href="/">
            <img src="/images/logo.png" alt="logo" />
          </Link>
        </motion.div>
      </div>
      <div className="navbar-center"></div>
      <div className="navbar-end flex gap-6">
        <div className="hidden gap-2 sm:flex">
          {isConnected ? (
            <Link
              className={`font-bold ${
                pathname == "/privilege" ? "text-info" : "text-white"
              } flex items-center gap-2 hover:text-info`}
              href="/privilege"
            >
              <FaWallet
                size={22}
                className={`${pathname == "/privilege" ? "text-info" : null}`}
              />
              <span className="hidden sm:block">Privilege</span>
            </Link>
          ) : null}
          <Link
            className={`font-bold ${
              pathname == "/mine" ? "text-info" : "text-white"
            } flex items-center gap-2 hover:text-info`}
            href="/mine"
          >
            <GiMineWagon
              size={24}
              className={`${pathname == "/mine" ? "text-info" : null}`}
            />
            <span className="hidden sm:block ">Mine Zone</span>
          </Link>
        </div>
        <div className="block md:hidden">
          <ConnectButton
            accountStatus="avatar"
            chainStatus="name"
            showBalance={false}
          />
        </div>
        <div className="hidden md:block">
          <ConnectButton
            accountStatus="address"
            chainStatus="name"
            showBalance={false}
            label="Connect Wallet"
          />
        </div>
      </div>
    </div>
  );
}
