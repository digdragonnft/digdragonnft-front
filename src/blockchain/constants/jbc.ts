import { Chain } from "wagmi";

export const jbc = {
  id: 8899,
  name: "JBC Chain",
  network: "JBC L1 Network",
  nativeCurrency: {
    decimals: 18,
    name: "JBC",
    symbol: "JBC",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc-l1.jibchain.net/"],
    },
    public: {
      http: ["https://rpc-l1.jibchain.net/"],
    },
  },
  blockExplorers: {
    default: {
      name: "JBC Block Explorer",
      url: "https://exp-l1.jibchain.net/",
    },
  },
  testnet: false,
} as const satisfies Chain;
