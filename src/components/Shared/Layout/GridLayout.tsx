import { ReactNode } from "react";

interface GridLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function GridLayout({ children, className }: GridLayoutProps) {
  return (
    <div className={`${className} grid grid-cols-12 gap-[16px] px-[16px]`}>
      {children}
    </div>
  );
}
