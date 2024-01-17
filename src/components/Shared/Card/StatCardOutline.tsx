interface StatCardOutlineProps {
  title: string;
  value: string;
}
export default function StatCardOutline({
  title,
  value,
}: StatCardOutlineProps) {
  return (
    <div className="min-w-[200px] rounded-xl border-[1px] border-info p-2">
      <div className="font-bold text-white">{title}</div>
      <div className="text-info">{value}</div>
    </div>
  );
}
