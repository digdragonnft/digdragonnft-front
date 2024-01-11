interface StateCard1Props {
  title: string;
  value: string;
}

export default function StatCard1({ title, value }: StateCard1Props) {
  return (
    <div className="stats relative w-full overflow-hidden rounded-md bg-base-200 bg-opacity-50 shadow backdrop-blur-sm">
      {/* <div className="absolute -right-3 -top-3  h-[50px] w-[50px] rounded-full bg-info blur-xl"></div> */}
      <div className="stat">
        <div className="stat-title text-xl font-semibold text-slate-900">
          {title}
        </div>
        <div className="stat-value text-white">{value}</div>
      </div>
    </div>
  );
}
