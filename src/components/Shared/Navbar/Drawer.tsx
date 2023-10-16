import React from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import Image from "next/image";
import MenuItem from "./MenuItem";
import ConnectWalletButton from "../Blockchain/Buttons/ConnectWallet";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Drawer = () => {
  return (
    <div className="drawer z-10">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label
          htmlFor="my-drawer"
          className="btn btn-ghost drawer-button text-white"
        >
          <HiMenuAlt2 size={24} />
          {/* Menu */}
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu min-h-full w-80 bg-primary p-4 text-white">
          {/* Sidebar content here */}
          <Image src="/images/logo.png" width={120} height={120} alt="logo" />
          <div className="divider"></div>
          <div className="flex flex-col gap-3">
            <li>
              <MenuItem title="Profile" path="/wallet" />
            </li>
            <li>
              <MenuItem title="Whitepaper" path="#" />
            </li>
            <li>
              <MenuItem title="NFT Market" path="#" />
            </li>
            <li>
              <MenuItem title="Bitkub Chain" path="#" />
            </li>
            <li>
              <MenuItem title="Freecity.finance" path="#" />
            </li>
            <li className="flex items-center justify-center">
              <div>
                <ConnectButton
                  label="Connect Wallet"
                  accountStatus={{
                    smallScreen: "address",
                    largeScreen: "address",
                  }}
                />
              </div>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
