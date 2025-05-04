import React from "react";
import { type Address } from "~/types/Address";

const Address = ({
  address,
  abbr = false,
}: {
  address: Address;
  abbr?: boolean;
}) => {
  return (
    <div>
      {abbr ? `${address.slice(0, 5)}...${address.slice(37)}` : address}
    </div>
  );
};

export default Address;
