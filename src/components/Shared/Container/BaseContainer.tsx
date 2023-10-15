import React from "react";
import { BaseContainerProps } from "~/interfaces/components/Shared/Container/BaseContainerProps";

const BaseContainer = ({ children }: BaseContainerProps) => {
  return <div className="min-h-screen max-w-xl bg-black">{children}</div>;
};

export default BaseContainer;
