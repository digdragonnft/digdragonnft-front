import Link from "next/link";
import { useAccount } from "wagmi";
import Image from "next/image";

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
  link: string;
  rewardToken: string;
  image: string;
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
  link,
  rewardToken,
  image,
}: CardElementProps) {
  const { isConnected } = useAccount();

  return (
    <div className="card glass w-96 w-full text-white shadow-xl md:max-w-[380px]">
      <figure className="relative w-full overflow-hidden">
        <Image src={image} alt="mine" width={1000} height={1000} />
        <div className="absolute right-[5%] top-[5%] font-bold">
          {active ? (
            <div className="badge badge-primary text-green-400 ring ring-green-300">
              Active
            </div>
          ) : (
            <div className="badge badge-ghost text-gray-400">Ended</div>
          )}
        </div>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <div className="badge badge-info font-semibold text-white">
          {rewardToken}
        </div>
        <hr />
        <div className="card-content">
          <div className="grid grid-cols-2">
            <div>APR</div>
            <div className="flex justify-end">{apr}</div>
            <div>EARN</div>
            <div className="flex justify-end">{earned}</div>
            <div>Liquidity</div>
            <div className="flex justify-end">
              {+liquidity > 0 ? (
                liquidity
              ) : (
                <span className="badge badge-info text-white">Pending</span>
              )}
            </div>
            <div>Total Staked</div>
            <div className="flex justify-end">{totalStaked}</div>
            <div>End</div>
            <div className="flex justify-end">{end}</div>
          </div>
        </div>
        <div className="card-actions justify-end">
          {isConnected ? (
            <Link
              href={`/${link}?mine=${mineAddress}&title=${name}&isActive=${active}`}
              className="font-bold"
            >
              <span className="btn btn-info font-bold text-white">Enter</span>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
