import { useAccount } from "wagmi";
import TableElement from "./TableElement";
import { api } from "~/utils/api";
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

  return (
    <>
      {/* <div className="hidden w-full md:block">
        <table className="table-xl table">
          <tbody>
            {allMines == undefined ||
            allMines.length <= 0 ||
            loadingAllMine ||
            loadingBlockNumber ? (
              <Loading className="text-white" />
            ) : (
              <>
                {allMines.map((mine, index) => (
                  <TableElement
                    link={mine?.link}
                    mineAddress={mine.mine!}
                    key={index}
                    active={mine?.isActive!}
                    earned={mine?.pendingReward.toString()!}
                    name={mine?.name}
                    //@ts-ignore
                    apr={mine?.apr.toFixed(5).toString()!}
                    liquidity={mine?.balance!}
                    totalStaked={mine?.totolStaked.toString()}
                    end={`${
                      mine || loadingBlockNumber
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
      </div> */}
      <div className="grids-col-1 grid max-w-[1440px] gap-2 md:grid-cols-2 xl:grid-cols-3">
        {allMines == undefined ||
        allMines.length <= 0 ||
        loadingAllMine ||
        loadingBlockNumber ? (
          <Loading className="text-white" />
        ) : (
          <>
            {allMines.map((mine, index) => (
              <CardElement
                link={mine?.link}
                image={mine?.image}
                rewardToken={mine?.rewardToken}
                mineAddress={mine.mine!}
                key={index}
                active={mine?.isActive!}
                earned={mine?.pendingReward.toString()!}
                name={mine?.name}
                //@ts-ignore
                apr={mine?.apr.toFixed(5).toString()!}
                liquidity={mine?.balance!}
                totalStaked={mine?.totolStaked.toString()}
                end={`${
                  mine || loadingBlockNumber
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
      </div>
    </>
  );
}
