import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import PrivilegeList from "~/components/Privilege/List";
import FloatingButton from "~/components/Shared/Button/FloatingButton";
import BaseLayoutV2 from "~/components/Shared/Layout/BaseLayoutV2";
import LoadingScreen from "~/components/Shared/LoadingScreen";
import NavBarV2 from "~/components/Shared/Nav/NavBarV2";

export default function PrivilegePage() {
  const { replace } = useRouter();
  const { isConnected } = useAccount();
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    if (!isConnected) {
      replace("/");
    }
    setReady(true);
  }, [ready, setReady, isConnected]);

  if (!ready) {
    return <LoadingScreen />;
  }

  return (
    <BaseLayoutV2>
      <NavBarV2 />
      {/* <PrivilegeList /> */}
      <div className="p-10 text-xl font-bold text-white">
        Under Maintainance
      </div>
      <FloatingButton />
    </BaseLayoutV2>
  );
}
