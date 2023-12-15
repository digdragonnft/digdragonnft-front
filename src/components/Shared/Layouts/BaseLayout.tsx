import Head from "next/head";
import React from "react";
import { BaseLayoutProps } from "~/interfaces/components/Shared/BaseLayoutProps";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div className="">
      <Head>
        <title>Dig Dragon NFT Official</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-black sm:flex sm:flex-col sm:items-center sm:justify-center">
        {children}
        <ToastContainer limit={0} />
      </div>
    </div>
  );
};

export default BaseLayout;
