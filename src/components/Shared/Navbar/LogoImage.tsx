import React from "react";
import Image from "next/image";

const LogoImage = () => {
  return (
    <div className="w-full">
      <Image src="/images/logo.png" width={80} height={80} alt="logo" />
    </div>
  );
};

export default LogoImage;
