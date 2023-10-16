import { type MyNFTStatProps } from "~/interfaces/Wallet/MyNFTStatProps";

const MyNFTStat = ({ icon, title, value }: MyNFTStatProps) => {
  return (
    <div className="stat flex items-center gap-4">
      <div className="stat-figure text-success">
        {/* <TbNfc size={30} /> */}
        {icon ?? null}
      </div>
      <div>
        <div className="stat-value text-neutral">{value ?? "N/A"}</div>
        <div className="stat-desc">{title ?? "N/A"}</div>
      </div>
    </div>
  );
};

export default MyNFTStat;
