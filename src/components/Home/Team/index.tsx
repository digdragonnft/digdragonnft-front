import React from "react";
import Image from "next/image";
import SecondHeader from "~/components/Shared/Typepography/SecondHeader";

const Team = () => {
  return (
    <div className="px-5 py-2">
      <SecondHeader text="CORE TEAM" />
      <div className="grid grid-cols-3 place-items-center gap-3 p-2">
        <Image src="/images/tong1.png" width={88} height={88} alt="team" />
        <Image src="/images/tong2.png" width={88} height={88} alt="team" />
        <Image src="/images/tong3.png" width={88} height={88} alt="team" />
        <Image src="/images/tong4.png" width={88} height={88} alt="team" />
        <Image src="/images/tong5.png" width={88} height={88} alt="team" />
        <Image src="/images/tong6.png" width={88} height={88} alt="team" />
      </div>
    </div>
  );
};

export default Team;
