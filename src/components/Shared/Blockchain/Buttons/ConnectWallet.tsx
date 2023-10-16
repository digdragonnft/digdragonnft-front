import React from "react";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useAccount, useConnect } from "wagmi";
import Address from "../../Typepography/Address";

const ConnectWalletButton = () => {
  const { isConnected, address } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  return (
    <div onClick={() => connect()} className="btn btn-success text-secondary">
      {isConnected ? (
        `${address!.slice(0, 5)}...${address!.slice(37)}`
      ) : (
        <div>Connect Wallet</div>
      )}
    </div>
  );
};

export default ConnectWalletButton;
