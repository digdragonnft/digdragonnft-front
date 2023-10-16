import { type MyNFTStatusProps } from "~/interfaces/Wallet/MyNFTStatusProp";

const MyNFTStatus = ({ title, icon, value }: MyNFTStatusProps) => {
  return (
    <div className="stat flex items-center gap-4">
      <div className="stat-figure text-success">icon</div>
      <div>
        <div className="stat-title text-right font-bold text-neutral">
          {value ?? "N/A"}/99
        </div>
        <div className="stat-desc">
          <progress
            className="progress progress-primary w-56"
            value="10"
            max="99"
          ></progress>
          <div>{title}</div>
        </div>
      </div>
    </div>
  );
};
export default MyNFTStatus;
