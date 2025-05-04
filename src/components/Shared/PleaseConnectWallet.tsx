import { ConnectButton } from "@rainbow-me/rainbowkit";
import BaseLayoutV2 from "./Layout/BaseLayoutV2";

export default function PleaseConnectWallet() {
  return (
    <BaseLayoutV2>
      <div className="flex min-h-screen w-full items-center justify-center">
        Please Connect Wallet
        <ConnectButton />
      </div>
    </BaseLayoutV2>
  );
}
