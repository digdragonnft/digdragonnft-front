import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";

import { WagmiConfig, configureChains, createConfig, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { bitkub, bitkub_testnet } from "~/blockchain/constants/bitkub";

const { publicClient, webSocketPublicClient } = configureChains(
  [bitkub, bitkub_testnet],
  [publicProvider()],
);

const config = createConfig({
  autoConnect: false,
  publicClient,
  webSocketPublicClient,
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <WagmiConfig config={config}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
};

export default api.withTRPC(MyApp);
