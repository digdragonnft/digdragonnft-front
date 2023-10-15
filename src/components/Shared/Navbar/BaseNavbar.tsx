import React from "react";
import Drawer from "./Drawer";
import LogoImage from "./LogoImage";

const BaseNavbar = () => {
  return (
    <div className="navbar bg-black">
      <div className="navbar-start">
        <Drawer />
      </div>
      <div className="navbar-center">
        <LogoImage />
      </div>
      <div className="navbar-end"></div>
    </div>
  );
};

export default BaseNavbar;
