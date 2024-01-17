import CountUp from "react-countup";
interface StatCardOutlineProps {
  title: string;
  value: string;
  count: boolean;
}
export default function StatCardOutline({
  title,
  value,
  count,
}: StatCardOutlineProps) {
  return (
    <div className="min-w-[200px] rounded-xl border-[1px] border-info p-2">
      <div className="font-bold text-white">{title}</div>
      <div className="text-info">
        {count ? (
          <CountUp
            start={+value - +value * 0.0001}
            end={+value}
            decimals={10}
            duration={3}
          />
        ) : (
          value
        )}
      </div>
    </div>
  );
}
