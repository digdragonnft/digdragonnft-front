import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useRouter } from "next/router";
import { TiThMenu } from "react-icons/ti";
import { useAccount } from "wagmi";
export default function FloatingButton() {
  const { isConnected } = useAccount();
  const { pathname } = useRouter();
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
        {isConnected ? (
          <ul
            tabIndex={0}
            className="menu dropdown-content rounded-box z-[1] w-52  bg-info p-2 text-center text-white shadow-xl"
          >
            <li>
              <Link
                className={`${
                  pathname == "/privilege" ? "text-info" : "text-white"
                } flex items-center gap-2 hover:text-info`}
                href="/privilege"
              >
                Privilege
              </Link>
            </li>
            <li>
              <Link href="/mine">Mine Zone</Link>
            </li>
          </ul>
        ) : (
          <ul
            className="w-42 menu dropdown-content rounded-box z-[1]  bg-info p-2 text-center text-white shadow-xl"
            tabIndex={0}
          >
            <li className="flex w-full items-center justify-center">
              <ConnectButton />
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
