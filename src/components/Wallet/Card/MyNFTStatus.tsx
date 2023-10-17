import { type MyNFTStatusProps } from "~/interfaces/Wallet/MyNFTStatusProp";

const MyNFTStatus = ({ title, icon, value }: MyNFTStatusProps) => {
  return (
    <div className="stat flex items-center gap-4">
      <div className="stat-figure text-success">{icon}</div>
      <div>
        <div className="stat-title text-right font-bold text-neutral">
          {value ?? "N/A"}/25
        </div>
        <div className="stat-desc">
          <progress
            className="progress-neutral progress w-56  bg-gradient-to-r from-white to-base-300"
            value={value?.toString()}
            max="25"
          ></progress>
          <div>{title}</div>
        </div>
      </div>
    </div>
  );
};
export default MyNFTStatus;
