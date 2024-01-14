import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { TiThMenu } from "react-icons/ti";
import { useAccount } from "wagmi";
export default function FloatingButton() {
  const { isConnected } = useAccount();
  return (
    <div className="fixed bottom-5 right-5 z-[20] sm:hidden">
      <div className="dropdown-end dropdown-top dropdown">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-circle btn-info btn-lg"
        >
          <TiThMenu size={24} className="text-white" />
        </div>
        <ul
          tabIndex={0}
          className="menu dropdown-content rounded-box z-[1] w-52  bg-info p-2 text-center text-white shadow-xl"
        >
          <li>
            {isConnected ? (
              <Link href="/wallet">Wallet</Link>
            ) : (
              <ConnectButton />
            )}
          </li>
          <li>
            <Link href="/mine">Mine Zone</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
