import Image from "next/image";

import { motion } from "framer-motion";

export default function BoxRightV2() {
  const rockUp = (delay: number, y: number) => {
    return {
      initial: { y: y },
      animate: { y: 0 },
      transition: {
        duration: 0.2,
        ease: "easeIn",
        type: "spring",
        stiffness: 10,
        delay: delay,
      },
    };
  };

  const DigUpAndFloating = (delay: number, y: number, lastY: number) => {
    return {
      initial: { y: y, opacity: 0 },
      animate: { y: [30, lastY], opacity: 1 },
      transition: {
        duration: 0.5,
        ease: "easeIn",
        type: "spring",
        stiffness: 10,
        delay: delay,
      },
    };
  };

  return (
    <div className="relative col-span-12 my-2 flex min-h-[50vh] flex-col items-center justify-center md:col-span-7">
      <motion.div
        {...DigUpAndFloating(0.1, 0, -50)}
        className="absolute bottom-[20%] right-[3%] -z-[3] hidden w-96 xl:block"
      >
        <Image
          src="/images/main-red.png"
          width={300}
          height={300}
          alt="rock1"
        />
      </motion.div>
      <motion.div
        {...DigUpAndFloating(0.3, 0, -50)}
        className="absolute bottom-[20%] left-[3%] -z-[3] hidden w-96 xl:block"
      >
        <Image
          src="/images/main-blue.png"
          width={300}
          height={300}
          alt="rock1"
        />
      </motion.div>
      <motion.div
        {...DigUpAndFloating(0.2, 0, -50)}
        className="absolute bottom-[30%] -z-[3] w-36 md:w-48 xl:w-96"
      >
        <Image
          src="/images/main-yellow.png"
          width={300}
          height={300}
          alt="rock1"
        />
      </motion.div>
      <motion.div {...rockUp(0.1, 20)} className="absolute bottom-0">
        <Image src="/images/rock2.png" width={400} height={400} alt="rock1" />
      </motion.div>
      <motion.div
        {...rockUp(0.2, 30)}
        className="absolute bottom-[0] left-[20%] -z-[1]"
      >
        <Image src="/images/rock2.png" width={400} height={400} alt="rock1" />
      </motion.div>
      <motion.div
        {...rockUp(0.15, 50)}
        className="absolute bottom-0 right-[20%]"
      >
        <Image src="/images/rock1.png" width={400} height={400} alt="rock1" />
      </motion.div>
      <motion.div
        {...rockUp(0.1, 40)}
        className="absolute bottom-0 left-[20%] -z-[1]"
      >
        <Image src="/images/rock1.png" width={400} height={400} alt="rock1" />
      </motion.div>
    </div>
  );
}
