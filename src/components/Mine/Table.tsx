import { useAccount } from "wagmi";
import TableElement from "./TableElement";
import { api } from "~/utils/api";
import { address as mineAddress } from "~/blockchain/Mine/abi";
import { useEffect } from "react";
import { useStakedEvent } from "~/blockchain/Mine/stake";
import { useUnStakedEvent } from "~/blockchain/Mine/unstake";
import CardElement from "./CardElement";

export default function Table() {
  const { address } = useAccount();

  const {
    data: currentBlockNumber,
    isLoading: loadingBlockNumber,
    refetch: refetchBlockNumber,
  } = api.blockchain.get.useQuery();

  const {
    data: mineInfo,
    isLoading: loadingMineInfo,
    refetch: refetchMineInfo,
  } = api.mine.getMineInfo.useQuery();

  const {
    data: balance,
    isLoading: loadingBalance,
    refetch: refetchMineBalance,
  } = api.reward.balanceOf.useQuery({
    address: mineAddress as string,
  });

  const {
    data,
    isLoading,
    refetch: getUserInfo,
  } = api.mine.getUserInfo.useQuery({
    wallet: address as string,
  });

  const { stakedEvent, resetStaked } = useStakedEvent(address as string);
  const { unStakedEvent, resetUnStaked } = useUnStakedEvent(address as string);

  //update when staking or unstaking event occured
  useEffect(() => {
    refetchMineBalance();
    refetchMineInfo();
  }, [stakedEvent, resetStaked, unStakedEvent, resetUnStaked]);

  return (
    <table className="table">
      <tbody className="sm:hidden">
        <CardElement
          active={mineInfo?.isActive!}
          earned={data?.pendingReward.toString()!}
          name="kBTC/OG #1"
          apr={mineInfo?.apr.toFixed(2).toString()!}
          liquidity={balance!}
          totalStaked={mineInfo?.totolStaked.toString()}
          end={`${
            mineInfo
              ? Math.floor(
                  ((+mineInfo?.endBlock.toString() -
                    +currentBlockNumber!.toString()) *
                    5) /
                    86400,
                ).toString()
              : null
          }days`}
        />
        <CardElement
          active={false}
          earned={"N/A"}
          name="KBTC/OG #2"
          apr={"N/A"}
          liquidity={"N/A"}
          totalStaked={"N/A"}
          end={"N/A"}
        />
      </tbody>
      <tbody className="hidden sm:table">
        <TableElement
          active={true}
          earned={data?.pendingReward.toString()!}
          name="kBTC/OG #1"
          apr={mineInfo?.apr.toFixed(2).toString()!}
          liquidity={balance!}
          totalStaked={mineInfo?.totolStaked.toString()}
          end={`${
            mineInfo
              ? Math.floor(
                  ((+mineInfo?.endBlock.toString() -
                    +currentBlockNumber!.toString()) *
                    5) /
                    86400,
                ).toString()
              : 0
          }days`}
        />
        <TableElement
          active={false}
          earned={"N/A"}
          name="KBTC/OG #2"
          apr={"N/A"}
          liquidity={"N/A"}
          totalStaked={"N/A"}
          end={"N/A"}
        />
      </tbody>
    </table>
  );
}
