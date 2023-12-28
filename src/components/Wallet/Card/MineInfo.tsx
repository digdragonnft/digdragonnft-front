import React from "react";
import Loading from "~/components/Shared/Inidcators/Loading";
import { api } from "~/utils/api";
import dayjs from "dayjs";
import { address } from "~/blockchain/Mine/abi";

const MineInfo = () => {
  const { data: currentBlockNumber, isLoading: loadingBlockNumber } =
    api.blockchain.get.useQuery();
  const { data: mineInfo, isLoading: loadingMineInfo } =
    api.mine.getMineInfo.useQuery();
  const { data: balance, isLoading: loadingBalance } =
    api.reward.balanceOf.useQuery({
      address,
    });

  return (
    <div className="stats stats-vertical min-w-[300px] bg-base-100">
      <div className="stat flex items-center justify-between">
        <div className="">
          <div className="stat-title text-xl font-bold">Mine Info</div>
          {loadingMineInfo || !mineInfo ? (
            <Loading />
          ) : (
            <>
              {mineInfo.isActive ? (
                <div className="text-sm font-bold text-info">Active</div>
              ) : (
                <div className="text-sm font-bold text-error">Not Active</div>
              )}
            </>
          )}
        </div>

        <div className="font-semibold">
          APR: {loadingMineInfo ? <Loading /> : mineInfo?.apr.toString()} %
        </div>
      </div>
      <table className="table table-zebra table-sm">
        <tbody>
          <tr>
            <th>CurrentBlockNumber</th>
            <td className="font-bold text-info">
              {loadingBlockNumber || !currentBlockNumber ? (
                <Loading />
              ) : (
                currentBlockNumber!.toString()
              )}
            </td>
          </tr>
          <tr>
            <th>EndBlockNumber</th>
            <td className="font-bold text-info">
              {loadingMineInfo ? <Loading /> : mineInfo?.endBlock.toString()}
            </td>
          </tr>
          <tr>
            <th>BlockPerDay</th>
            <td className="font-bold text-info">{`${86400 / 5}`}</td>
          </tr>
          <tr>
            <th>Remaining Blocks</th>
            <td className="font-bold text-info">
              {loadingMineInfo ? (
                <Loading />
              ) : (
                (
                  +mineInfo?.endBlock.toString() -
                  +currentBlockNumber!.toString()
                ).toString()
              )}
            </td>
          </tr>
          <tr>
            <th>Remaining Days</th>
            <td className="font-bold text-info">
              {loadingMineInfo ? (
                <Loading />
              ) : (
                Math.floor(
                  ((+mineInfo?.endBlock.toString() -
                    +currentBlockNumber!.toString()) *
                    5) /
                    86400,
                ).toString()
              )}
            </td>
          </tr>
          <tr>
            <th>Ending Date</th>
            <td className="font-bold text-info">
              {loadingMineInfo ? (
                <Loading />
              ) : (
                <div>
                  {dayjs(new Date())
                    .add(
                      Math.floor(
                        ((+mineInfo?.endBlock.toString() -
                          +currentBlockNumber!.toString()) *
                          5) /
                          86400,
                      ),
                      "day",
                    )
                    .format("DD-MM-YYYY")}
                </div>
              )}
            </td>
          </tr>
          <tr>
            <th>Remaining Reward</th>
            <td className="font-bold text-error">
              {loadingBalance || !balance ? <Loading /> : balance!.toString()}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MineInfo;
