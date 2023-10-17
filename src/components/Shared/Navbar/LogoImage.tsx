import React from "react";
import Image from "next/image";
import Link from "next/link";

const LogoImage = () => {
  return (
    <Link href="/" className="w-full">
      <Image src="/images/logo.png" width={80} height={80} alt="logo" />
    </Link>
  );
};

export default LogoImage;
