import Link from "next/link";
import React from "react";
import { BsFacebook, BsDiscord } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="navbar flex gap-5 bg-primary  px-5 text-secondary">
      <div className="text-xl">FOLLOW US</div>
      <div className="flex-1 border-b-[3px]"></div>
      <div className="flex items-center gap-2">
        <Link href="https://www.facebook.com/digdragonnft" target="_blank">
          <BsFacebook size={24} className="text-secondary" />
        </Link>
        <Link href="https://discord.io/DigDragonNFT" target="_blank">
          <BsDiscord size={24} className="text-secondary" />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
