import React from "react";

interface LoadingProps {
  className?: string;
}

const Loading = ({ className }: LoadingProps) => {
  return (
    <span className={`loading loading-infinity loading-lg ${className}`}></span>
  );
};

export default Loading;
