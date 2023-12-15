import React from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import Image from "next/image";
import MenuItem from "./MenuItem";
import ConnectWalletButton from "../Blockchain/Buttons/ConnectWallet";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import MineStat from "../Card/MineStat";

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
          <Link href="/">
            <Image src="/images/logo.png" width={120} height={120} alt="logo" />
          </Link>
          <div className="divider">Menu</div>
          <div className="flex flex-col gap-3">
            <li>
              <MenuItem title="Profile" path="/wallet" />
            </li>
            <li>
              <MenuItem title="Whitepaper" path="#" />
            </li>
            <li>
              <MenuItem
                title="Buy Your DIG"
                path="https://app.freecity.finance/collection/digdragon"
              />
            </li>
            <li>
              <MenuItem
                title="DIG On Bitkub Chain"
                path="https://www.bitkubchain.com/th/ecosystem/c0f9e023-bb5b-4d39-8c0a-7b59bdad60ce"
              />
            </li>
            <li>
              <MenuItem
                title="Freecity.finance"
                path="https://app.freecity.finance/home"
              />
            </li>
            <li className="flex items-center justify-center">
              <div>
                <ConnectButton
                  label="Connect Wallet"
                  accountStatus={{
                    smallScreen: "address",
                    largeScreen: "address",
                  }}
                  showBalance={{ smallScreen: false, largeScreen: false }}
                />
              </div>
            </li>
          </div>
          <div className="divider">Mine Status</div>
          <MineStat />
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
