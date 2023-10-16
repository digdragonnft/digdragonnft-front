import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { WagmiConfig, configureChains, createConfig, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { bitkub, bitkub_testnet } from "~/blockchain/constants/bitkub";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [bitkub, bitkub_testnet],
  [publicProvider()],
);

const { connectors } = getDefaultWallets({
  appName: "Dig Dragon NFT",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
  chains,
});

const config = createConfig({
  autoConnect: false,
  connectors,
  publicClient,
  webSocketPublicClient,
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider modalSize="compact" chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default api.withTRPC(MyApp);
