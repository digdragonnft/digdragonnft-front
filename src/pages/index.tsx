import React from "react";
import BoxLeft from "~/components/Home/BoxLeft";
import BoxRight from "~/components/Home/BoxRight";
import BaseLayoutV2 from "~/components/Shared/Layout/BaseLayoutV2";
import GridLayout from "~/components/Shared/Layout/GridLayout";
import GridSpacer from "~/components/Shared/Layout/GridSpacer";
import NavBarV2 from "~/components/Shared/Nav/NavBarV2";

import { useEffect, useState } from "react";
import FloatingButton from "~/components/Shared/Button/FloatingButton";
import LoadingScreen from "~/components/Shared/LoadingScreen";

import { motion } from "framer-motion";
import { useAccount } from "wagmi";
import { api } from "~/utils/api";
import Loading from "~/components/Shared/Inidcators/Loading";
import BoxRightV2 from "~/components/Home/BoxRightV2";

export default function Home() {
  const [ready, setReady] = useState<boolean>(false);
  const { address } = useAccount();
  const { data: allMines, isLoading: allMineLoading } =
    api.mine.getAllMinesInfo.useQuery({
      owner: address!,
    });

  useEffect(() => {
    setReady(true);
  }, [ready, setReady]);

  if (!ready) {
    return <LoadingScreen />;
  }

  return (
    <BaseLayoutV2>
      <NavBarV2 />
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
          type: "spring",
          stiffness: 25,
        }}
        exit={{ opacity: 0 }}
        className="mt-10 flex h-[80vh] items-center justify-center"
      >
        <GridLayout className="h-full">
          <GridSpacer />
          <BoxLeft />
          <BoxRightV2 />
          <GridSpacer />
        </GridLayout>
      </motion.div>
      <FloatingButton />
    </BaseLayoutV2>
  );
}
