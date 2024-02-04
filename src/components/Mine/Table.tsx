import { useAccount } from "wagmi";
import TableElement from "./TableElement";
import { api } from "~/utils/api";
import { address as mineAddress } from "~/blockchain/Mine/abi";
import { useEffect } from "react";
import { useStakedEvent } from "~/blockchain/Mine/stake";
import { useUnStakedEvent } from "~/blockchain/Mine/unstake";
import CardElement from "./CardElement";
import Loading from "../Shared/Inidcators/Loading";

export default function Table() {
  const { address } = useAccount();

  const {
    data: allMines,
    isLoading: loadingAllMine,
    refetch: refetchAllMine,
  } = api.mine.getAllMinesInfo.useQuery({
    owner: address!,
  });

  const {
    data: currentBlockNumber,
    isLoading: loadingBlockNumber,
    refetch: refetchBlockNumber,
  } = api.blockchain.get.useQuery();

  // const { stakedEvent, resetStaked } = useStakedEvent(address as string);
  // const { unStakedEvent, resetUnStaked } = useUnStakedEvent(address as string);

  //update when staking or unstaking event occured
  // useEffect(() => {
  //   refetchAllMine();
  // }, [stakedEvent, resetStaked, unStakedEvent, resetUnStaked]);

  return (
    <table className="table">
      <tbody className="sm:hidden">
        {allMines === undefined || allMines.length <= 0 || loadingAllMine ? (
          <Loading />
        ) : (
          <>
            {allMines.map((mine, index) => (
              <CardElement
                mineAddress={mine.mine!}
                key={index}
                active={mine?.isActive!}
                earned={mine?.pendingReward.toString()!}
                name={`kBTC/OG #${index + 1}`}
                //@ts-ignore
                apr={mine?.apr.toFixed(2).toString()!}
                liquidity={mine?.balance!}
                totalStaked={mine?.totolStaked.toString()}
                end={`${
                  mine
                    ? Math.floor(
                        ((+mine?.endBlock.toString() -
                          +currentBlockNumber!.toString()) *
                          5) /
                          86400,
                      ).toString() > "0"
                      ? Math.floor(
                          ((+mine?.endBlock.toString() -
                            +currentBlockNumber!.toString()) *
                            5) /
                            86400,
                        ).toString()
                      : "0"
                    : null
                }days`}
              />
            ))}
          </>
        )}
      </tbody>
      <tbody className="hidden sm:table">
        {allMines == undefined || allMines.length <= 0 || loadingAllMine ? (
          <Loading className="text-white" />
        ) : (
          <>
            {allMines.map((mine, index) => (
              <TableElement
                mineAddress={mine.mine!}
                key={index}
                active={mine?.isActive!}
                earned={mine?.pendingReward.toString()!}
                name={`kBTC/OG #${index}`}
                //@ts-ignore
                apr={mine?.apr.toFixed(2).toString()!}
                liquidity={mine?.balance!}
                totalStaked={mine?.totolStaked.toString()}
                end={`${
                  mine
                    ? Math.floor(
                        ((+mine?.endBlock.toString() -
                          +currentBlockNumber!.toString()) *
                          5) /
                          86400,
                      ).toString() > "0"
                      ? Math.floor(
                          ((+mine?.endBlock.toString() -
                            +currentBlockNumber!.toString()) *
                            5) /
                            86400,
                        ).toString()
                      : "0"
                    : null
                }days`}
              />
            ))}
          </>
        )}
      </tbody>
    </table>
  );
}
