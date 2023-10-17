import React from "react";
import { api } from "~/utils/api";
import Loading from "../Inidcators/Loading";
import { MineData } from "~/interfaces/blockchain/Mine/MineData";

const MineStat = () => {
  const { data, isLoading } = api.mine.getAll.useQuery();

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="stats stats-vertical bg-neutral text-white shadow">
          {data.map((mine: MineData) => (
            <div key={mine.mineNo} className="stat">
              <div className="stat-value">{mine.mineNo}</div>
              <div
                className={`stat-title text-xl font-bold ${
                  mine.isActive ? "text-[#00ff00]" : "text-[#ff0000]"
                }`}
              >
                {mine.isActive ? "Active" : "Stop"}
              </div>
              <div className="stat-desc text-white">
                from block - [{mine.startBlock} - {mine.endBlock}]
              </div>
              <div className="stat-desc text-white">
                {new Date(mine.startTime as string).toDateString()} -
                {new Date(mine.endTime as string).toDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MineStat;
