import React from "react";
import { BsFacebook, BsDiscord } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="navbar bg-primary text-secondary flex  gap-5 px-5">
      <div className="text-xl">FOLLOW US</div>
      <div className="flex-1 border-b-[3px]"></div>
      <div className="flex items-center gap-2">
        <BsFacebook size={24} className="text-secondary" />
        <BsDiscord size={24} className="text-secondary" />
      </div>
    </div>
  );
};

export default Footer;
