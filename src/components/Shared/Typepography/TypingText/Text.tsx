import { useEffect } from "react";
import Cursor from "./Cursor";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";

interface TypingTextProps {
  texts: string[];
}

export default function TypingText({ texts }: TypingTextProps) {
  const textIndex = useMotionValue(0);
  const baseText = useTransform(textIndex, (latest) => texts[latest] || "");
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    baseText.get().slice(0, latest),
  );

  const updatedThisRound = useMotionValue(true);

  useEffect(() => {
    animate(count, 60, {
      type: "tween",
      duration: 4,
      ease: "easeIn",
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 2,
      onUpdate(latest) {
        if (updatedThisRound.get() === true && latest > 0) {
          updatedThisRound.set(false);
        } else if (updatedThisRound.get() === false && latest === 0) {
          if (textIndex.get() === texts.length - 1) {
            textIndex.set(0);
          } else {
            textIndex.set(textIndex.get() + 1);
          }

          updatedThisRound.set(true);
        }
      },
    });
  }, []);

  return (
    <span className="">
      <motion.span className="bg-gradient-to-br from-info to-purple-400 bg-clip-text text-[60px] font-semibold text-transparent">
        {displayText}
      </motion.span>
      <Cursor />
    </span>
  );
}
