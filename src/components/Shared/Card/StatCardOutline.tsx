import { useEffect, useRef } from "react";
import CountUp, { useCountUp } from "react-countup";

interface StatCardOutlineProps {
  title: string;
  value: string;
  count: boolean;
  decimal: boolean;
}

export default function StatCardOutline({
  title,
  value,
  count,
  decimal,
}: StatCardOutlineProps) {
  const countRef = useRef<HTMLDivElement>(null);
  const { update } = useCountUp({
    decimals: decimal ? 10 : 0,
    ref: countRef,
    start: +value - +value * 0.001,
    end: +value,
    duration: 3,
    onUpdate: () => {
      console.log("update");
    },
  });

  useEffect(() => {
    update(value);
  }, [value]);

  return (
    <div className="min-w-[200px] rounded-xl border-[1px] border-info p-2">
      <div className="font-bold text-white">{title}</div>
      <div className="text-info">
        {count ? (
          <div ref={countRef} />
        ) : (
          // <CountUp
          //   start={+value - +value * 0.0001}
          //   end={+value}
          //   decimals={10}
          //   duration={3}
          // />
          value
        )}
      </div>
    </div>
  );
}
