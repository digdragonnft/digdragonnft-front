import GridLayout from "~/components/Shared/Layout/GridLayout";
import GridSpacer from "~/components/Shared/Layout/GridSpacer";
import StatCard1 from "~/components/Shared/Card/StatCard1";

import { motion } from "framer-motion";
import StatCard3 from "../Shared/Card/StatCard3";

export default function BoxRightV2() {
  const boxSlider = (delay: number) => {
    return {
      initial: { y: 20, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: {
        duration: 0.6,
        ease: "easeInOut",
        type: "spring",
        stiffness: 25,
        delay: delay,
      },
    };
  };

  return (
    <div className="col-span-12 my-2 flex flex-col items-center justify-center md:col-span-7"></div>
  );
}
