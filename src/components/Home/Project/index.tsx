import Image from "next/image";
import React from "react";
import SecondHeader from "~/components/Shared/Typepography/SecondHeader";

const Project = () => {
  return (
    <div className="bg-base-100">
      <SecondHeader text="VERIFY PROJECTS" color="text-primary" />
      <div className="place-contents-center grid grid-cols-2 place-items-center py-2">
        <div>
          <Image
            src="/images/freecitylogo.png"
            width={150}
            height={150}
            alt="freecity"
          />
          <p className="py-2 text-center text-xs">OFFICIAL PROJECT</p>
        </div>
        <div>
          <Image
            src="/images/bitkubchainlogo.png"
            width={150}
            height={150}
            alt="bitkubchain"
          />
          <p className="py-2 text-center text-xs">REGISTERED PROJECT</p>
        </div>
      </div>
    </div>
  );
};

export default Project;
