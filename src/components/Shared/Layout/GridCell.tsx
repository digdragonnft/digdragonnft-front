import { ReactNode } from "react";

interface GridCellProps {
  children: ReactNode;
  className?: string;
  span: number;
}

export default function GridCell({
  children,
  span,
  className = "",
}: GridCellProps) {
  return (
    <div className={`col-span-${span.toString()} ${className}`}>{children}</div>
  );
}
