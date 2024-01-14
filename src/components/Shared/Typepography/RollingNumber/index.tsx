import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface RollingNumberProps {
  number: number;
}

function formatForDisplay(number: number = 0) {
  return parseFloat(Math.max(number, 0).toString())
    .toFixed(2)
    .split("")
    .reverse();
}

export default function RollingNumber({ number }: RollingNumberProps) {
  const numArray = formatForDisplay(number);
  return (
    <div className="relative m-auto flex h-full flex-row-reverse overflow-hidden bg-red-300 text-white">
      {numArray.map((num, index) =>
        num === "." ? (
          <DecimalColumn key={index} />
        ) : (
          <NumberColumn key={index} digit={num} />
        ),
      )}
    </div>
  );
}

function NumberColumn({ digit }: { digit: string }) {
  const [position, setPosition] = useState<number>(0);
  const columnContainer = useRef<HTMLDivElement>(null);
  const setColumnToNumber = (number: string) => {
    setPosition(columnContainer!.current!.clientHeight * parseInt(number));
  };

  useEffect(() => setColumnToNumber(digit), [digit]);

  return (
    <div className="relative w-[18px] bg-red-400" ref={columnContainer}>
      <motion.div
        animate={{ y: position }}
        className="absolute bottom-0 h-[1000%] bg-green-200"
      >
        {[9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((num) => (
          <div className="" key={num}>
            <span>{num}</span>
          </div>
        ))}
      </motion.div>
      {/* <span className="hidden">0</span> */}
    </div>
  );
}

function DecimalColumn() {
  //display . for the decimal position
  return (
    <div>
      <span>.</span>
    </div>
  );
}
