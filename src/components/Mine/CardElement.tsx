import Link from "next/link";
import { useAccount } from "wagmi";

interface CardElementProps {
  name: string;
  apr: string;
  earned: string;
  liquidity: string;
  totalStaked: string;
  totalHash?: string;
  active: boolean;
  end: string;
  mineAddress: string;
}
export default function CardElement({
  name,
  apr,
  earned,
  liquidity,
  totalStaked,
  totalHash,
  active,
  end,
  mineAddress,
}: CardElementProps) {
  const { isConnected } = useAccount();

  return (
    <tr className="flex justify-center">
      <td>
        <div
          className={`min-w-[300px] max-w-md overflow-hidden rounded-xl bg-white bg-opacity-30 shadow backdrop-blur-sm`}
        >
          <div
            className={`flex w-full justify-between border-b-[1px] border-b-white border-opacity-20 px-2 py-3 font-bold text-info shadow ${
              active ? "text-white" : "text-slate-500"
            }`}
          >
            <div>{name}</div>
            {/* <div>#1</div> */}
          </div>

          <ul
            className={`flex w-full flex-col gap-1 px-2 py-2 text-white ${
              active ? "text-white" : "text-slate-700"
            }`}
          >
            <li className="flex justify-between">
              <div className="">Earned</div>
              <div className="font-bold text-info">
                {(+earned).toFixed(10).toString()}
              </div>
            </li>
            <li className="flex justify-between">
              <div className="">APR</div>
              <div className="font-bold text-info">{apr}</div>
            </li>
            <li className="flex justify-between">
              <div className="">Liquidity</div>
              <div className="font-bold text-info">{liquidity}</div>
            </li>
            <li className="flex justify-between">
              <div className="">Total Staked</div>
              <div className="font-bold text-info">{totalStaked}</div>
            </li>
            <li className="flex justify-between">
              <div className="">End In</div>
              <div className="font-bold text-info">{end}</div>
            </li>
            <li className="flex justify-center">
              {isConnected ? (
                <Link
                  href={`/wallet?mine=${mineAddress}`}
                  className="font-bold"
                >
                  <span className="btn btn-info font-bold text-white">
                    Manage
                  </span>
                </Link>
              ) : null}
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
}
