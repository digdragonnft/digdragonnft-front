interface StatCard2Props {
  title: string;
  content: string;
  subContent?: string;
}

export default function StatCard2({
  title,
  content,
  subContent,
}: StatCard2Props) {
  return (
    <div className="stats w-full rounded-md bg-base-200 bg-opacity-50 shadow backdrop-blur-sm">
      <div className="stat">
        <div className="stat-title text-xl font-semibold text-slate-900">
          {title}
        </div>
        <div className="stat-value text-right text-slate-900">{content}</div>
        <div className="text-right text-xl font-semibold text-slate-900">
          {subContent}
        </div>
      </div>
    </div>
  );
}
