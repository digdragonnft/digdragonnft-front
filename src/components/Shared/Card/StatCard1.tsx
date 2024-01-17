import Loading from "../Inidcators/Loading";
import CountUp from "react-countup";

interface StateCard1Props {
  title: string;
  value: string;
  count: boolean;
}

export default function StatCard1({ title, value, count }: StateCard1Props) {
  return (
    <div className="stats relative w-full overflow-hidden rounded-md bg-base-200 bg-opacity-50 shadow backdrop-blur-sm">
      {/* <div className="absolute -right-3 -top-3  h-[50px] w-[50px] rounded-full bg-info blur-xl"></div> */}
      <div className="stat">
        <div className="stat-title text-xl font-semibold text-slate-900">
          {title}
        </div>
        <div className="stat-value text-white">
          {value == "N/A" ? (
            <Loading />
          ) : (
            <>
              {count ? (
                <CountUp
                  start={+value - +value * 0.5}
                  end={+value}
                  duration={2}
                />
              ) : (
                value
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
