import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Table from "~/components/Mine/Table";
import BaseLayoutV2 from "~/components/Shared/v2/BaseLayoutV2";
import NavBarV2 from "~/components/Shared/v2/NavBarV2";

const Mine = () => {
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    setReady(true);
  }, [ready, setReady]);

  if (!ready) {
    return (
      <BaseLayoutV2>
        <div className="min-h-screen w-full">
          <div className="loading loading-spinner"></div>
        </div>
      </BaseLayoutV2>
    );
  }
  return (
    <BaseLayoutV2>
      <NavBarV2 />
      <div className="flex w-full px-10 py-10">
        <h1 className="font-bold text-white">Mine Zone</h1>
      </div>
      <div className="flex overflow-y-scroll px-10">
        <Table />
      </div>
    </BaseLayoutV2>
  );
};

export default Mine;