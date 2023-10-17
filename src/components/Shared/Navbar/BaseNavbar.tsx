import React from "react";
import Drawer from "./Drawer";
import LogoImage from "./LogoImage";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const BaseNavbar = () => {
  const { isConnected } = useAccount();
  return (
    <div className="navbar bg-black">
      <div className="navbar-start">
        <Drawer />
      </div>
      <div className="navbar-center">
        <LogoImage />
      </div>
      <div className="navbar-end">
        {isConnected ? (
          <ConnectButton
            chainStatus={"none"}
            accountStatus={{
              largeScreen: "avatar",
              smallScreen: "avatar",
            }}
          />
        ) : null}
      </div>
    </div>
  );
};

const RightMenu = () => {
  return (
    <div className="dropdown-end dropdown">
      <label tabIndex={0} className="btn btn-ghost m-1 text-white">
        Click
      </label>
      <ul
        tabIndex={0}
        className="menu dropdown-content rounded-box z-[1] w-52 bg-neutral p-2 text-white shadow-xl"
      >
        <li>
          <a>Item 1</a>
        </li>
        <li>
          <a>Item 2</a>
        </li>
      </ul>
    </div>
  );
};

export default BaseNavbar;
