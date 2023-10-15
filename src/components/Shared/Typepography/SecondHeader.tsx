import React from "react";

const SecondHeader = ({
  text,
  color = "text-secondary",
}: {
  text: string;
  color?: string;
}) => {
  return (
    <h2 className={`${color} py-3 text-center text-2xl font-bold`}>{text}</h2>
  );
};

export default SecondHeader;
