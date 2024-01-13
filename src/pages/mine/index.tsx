import React, { useEffect, useState } from "react";
import Table from "~/components/Mine/Table";
import BaseLayoutV2 from "~/components/Shared/Layout/BaseLayoutV2";
import FloatingButton from "~/components/Shared/Button/FloatingButton";
import NavBarV2 from "~/components/Shared/Nav/NavBarV2";
import LoadingScreen from "~/components/Shared/LoadingScreen";

const Mine = () => {
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    setReady(true);
  }, [ready, setReady]);

  if (!ready) {
    return <LoadingScreen />;
  }
  return (
    <BaseLayoutV2>
      <NavBarV2 />
      <div className="flex w-full px-10 py-10">
        <h1 className="font-bold text-white">Mine Zone</h1>
      </div>
      <div className="flex justify-center px-10">
        <Table />
      </div>
      <FloatingButton />
    </BaseLayoutV2>
  );
};

export default Mine;
