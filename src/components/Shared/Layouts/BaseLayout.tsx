"use client";
import Head from "next/head";
import React from "react";
import { BaseLayoutProps } from "~/interfaces/components/Shared/BaseLayoutProps";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <>
      <Head>
        <title>Dig Dragon NFT Official</title>
        <meta name="description" content="Dig Dragon NFT Official" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-black sm:flex sm:flex-col sm:items-center sm:justify-center">
        {children}
        <ToastContainer limit={0} />
      </div>
    </>
  );
};

export default BaseLayout;
