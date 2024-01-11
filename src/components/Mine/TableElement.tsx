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
}: TableElementProps) {
  const { isConnected } = useAccount();

  return (
    <tr
      className={`bg-white bg-opacity-20 ${
        active ? "cursor-pointer text-white" : "text-slate-500"
      } backdrop-blur-sm`}
    >
      <td>
        <div className="font-bold">{name}</div>
      </td>
      <td>
        <div className="font-bold">Earned</div>
        <div className="font-bold text-info">{earned}</div>
      </td>
      <td>
        <div className="font-bold">APR</div>
        <div className="font-bold text-info">{apr}</div>
      </td>
      <td>
        <div className="font-bold">Liquidity</div>
        <div className="font-bold text-info">{liquidity}</div>
      </td>
      <td>
        <div className="font-bold">Total Staked</div>
        <div className="font-bold text-info">{totalStaked}</div>
      </td>
      <td>
        <div className="font-bold">End In</div>
        <div className="font-bold text-info">{end}</div>
      </td>
      <td>
        {active && isConnected ? (
          <Link href="/wallet" className="font-bold">
            <span className="btn btn-info font-bold text-white">Manage</span>
          </Link>
        ) : null}
      </td>
    </tr>
  );
}
