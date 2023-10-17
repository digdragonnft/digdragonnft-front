import React from "react";
import { useAccount } from "wagmi";
import Loading from "~/components/Shared/Inidcators/Loading";
import { api } from "~/utils/api";

const MyMine = () => {
  const { address } = useAccount();
  const { data, isLoading } = api.mine.getUserInfo.useQuery({
    wallet: address as string,
  });
  return (
    <div className="stats stats-vertical shadow lg:stats-horizontal">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="stat">
          <div className="stat-title text-xl font-bold">Pending reward</div>
          <div className="stat-value">
            {data?.pendingReward.toString().slice(0, 11)}
          </div>
          <div className="stat-title text-right font-bold">dBtc</div>
          <div>
            <div className="divider">staked tokens</div>
            {data?.userInfo?.stakedTokenIds.map((token) => (
              <div key={token} className="badge badge-primary">
                {token.toString()}
              </div>
            ))}
            <div className="stat-title text-right">
              total hash power :{" "}
              <span className="font-bold text-warning">
                {data?.userInfo?.stakedHashPowerAmount.toString()}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyMine;
