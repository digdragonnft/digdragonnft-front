import Link from "next/link";
import { useAccount } from "wagmi";

interface TableElementProps {
  name: string;
  apr: string;
  earned: string;
  liquidity: string;
  totalStaked: string;
  totalHash?: string;
  active: boolean;
  end: string;
  mineAddress: string;
  link: string;
}
export default function TableElement({
  name,
  apr,
  earned,
  liquidity,
  totalStaked,
  totalHash,
  active,
  end,
  mineAddress,
  link,
}: TableElementProps) {
  const { isConnected } = useAccount();

  return (
    <tr
      className={`bg-white bg-opacity-20 ${
        active ? "cursor-pointer text-white" : "text-slate-500"
      }`}
    >
      <td>
        <div className="font-bold">
          {name}{" "}
          {active ? (
            <div className="badge badge-primary text-green-400">active</div>
          ) : null}
        </div>
      </td>
      <td>
        <div className="text-sm">Earned</div>
        <div className="font-bold text-info">
          {(+earned).toFixed(10).toString() ?? 0}
        </div>
      </td>
      <td>
        <div className="text-sm">APR</div>
        <div className="font-bold text-info">{apr}</div>
      </td>
      <td>
        <div className="text-sm">Liquidity</div>
        <div className="font-bold text-info">
          {+liquidity > 0 ? (
            liquidity
          ) : (
            <span className="badge badge-primary">Pending</span>
          )}
        </div>
      </td>
      <td>
        <div className="text-sm">Total Staked</div>
        <div className="font-bold text-info">{totalStaked}</div>
      </td>
      <td>
        <div className="text-sm">End In</div>
        <div className="font-bold text-info">{end}</div>
      </td>
      <td>
        {isConnected ? (
          <Link
            href={`/${link}?mine=${mineAddress}&title=${name}&isActive=${active}`}
            className="font-bold"
          >
            <span className="btn btn-info font-bold text-white">Enter</span>
          </Link>
        ) : null}
      </td>
    </tr>
  );
}
