import { ReactNode } from "react";
import Loading from "../Inidcators/Loading";

interface StatCard2Props {
  title: string;
  children: ReactNode;
  subContent?: string;
}

export default function StatCard3({
  title,
  children,
  subContent,
}: StatCard2Props) {
  return (
    <div className="stats w-full rounded-md bg-base-200 bg-opacity-50 shadow backdrop-blur-sm">
      <div className="stat">
        <div className="stat-title text-xl font-semibold text-slate-900">
          {title}
        </div>
        {children}
        <div className="text-right text-xl font-semibold text-slate-900">
          {subContent == "N/A" ? <Loading /> : subContent}
        </div>
      </div>
    </div>
  );
}
