import { TbPick } from "react-icons/tb";
import { LiaSlackHash } from "react-icons/lia";
import { PiSwordFill, PiShieldFill } from "react-icons/pi";
import { GiFluffyWing } from "react-icons/gi";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useStake, useStakedEvent } from "~/blockchain/Mine/stake";
import { useAccount } from "wagmi";
import { useUnStakedEvent, useUnstake } from "~/blockchain/Mine/unstake";

const variants = {
  hover: {
    x: 0,
  },
  initial: {
    x: 250,
  },
};

interface NFTCardProps {
  tokenId: string;
  name: string;
  image: string;
  video: string;
  hash: string;
  atk: string;
  def: string;
  spd: string;
  rarity: string;
  staked: boolean;
}

export default function NFTCard({
  tokenId,
  staked,
  name,
  image,
  video,
  hash,
  atk,
  def,
  spd,
  rarity,
}: NFTCardProps) {
  const [isHover, setIsHovered] = useState<boolean>(false);
  const { address } = useAccount();
  const [UnstakingLoading, setUnstakingLoading] = useState<boolean>(false);
  const [stakingLoading, setStakingLoading] = useState<boolean>(false);
  const { stake, staking, staked: stakedDone, stakingError } = useStake();
  const { unstake, unstaking, unstaked, unstakingError } = useUnstake();
  const { stakedEvent, resetStaked } = useStakedEvent(address as string);
  const { unStakedEvent, resetUnStaked } = useUnStakedEvent(address as string);

  useEffect(() => {
    if (stakedEvent || unStakedEvent) {
      setStakingLoading(false);
      setUnstakingLoading(false);
      resetStaked();
      resetUnStaked();
    }

    if (stakingError || unstakingError) {
      setStakingLoading(false);
      setUnstakingLoading(false);
    }
  }, [stakedEvent, stakingError, unstakingError, stakedDone, unstaked]);

  const handleToMine = () => {
    setStakingLoading(true);
    const selectedTokenId = +tokenId!.toString();
    stake([selectedTokenId]);
  };
  const handleUnstake = () => {
    setUnstakingLoading(true);
    const selectedTokenId = +tokenId!.toString();
    unstake([selectedTokenId]);
  };

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative z-[4] h-[225px] w-[225px] cursor-pointer overflow-hidden rounded-xl"
    >
      <motion.video
        variants={variants}
        animate={isHover ? { scale: 1.2, y: -5 } : []}
        transition={{ duration: 0.3 }}
        className="absolute left-0 top-0 object-contain"
        width={286}
        height={286}
        placeholder={image}
        loop
        autoPlay
      >
        <source src={video} type="video/mp4" />
      </motion.video>
      <div className="absolute flex h-[30px] w-full justify-between px-4 py-2 font-semibold text-white">
        <LiaSlackHash size={24} />
        <h1 className="text-info">{hash}</h1>
      </div>

      <div className="absolute right-[5%] top-[15%] z-[1] flex gap-1">
        <FaStar className="text-yellow-400" size={16} />
        {rarity == "rare" ||
        rarity == "super rare" ||
        rarity == "super special rare" ? (
          <FaStar className="text-yellow-400" size={16} />
        ) : null}
        {rarity == "super rare" || rarity == "super special rare" ? (
          <FaStar className="text-yellow-400" size={16} />
        ) : null}
        {rarity == "super special rare" ? (
          <FaStar className="text-yellow-400" size={16} />
        ) : null}
      </div>

      <div className="absolute left-[3%] top-[20%] flex h-full w-[50px] flex-col text-white">
        <div className="flex gap-1 text-[12px] font-bold">
          <PiSwordFill size={16} /> {atk}
        </div>
        <div className="flex gap-1 text-[12px] font-bold">
          <PiShieldFill size={16} /> {def}
        </div>
        <div className="flex gap-1 text-[12px] font-bold">
          <GiFluffyWing size={16} /> {spd}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 z-[1] flex h-[80px] w-full items-center justify-center bg-white bg-opacity-30 px-2 py-3 font-bold text-black backdrop-blur-sm">
        <motion.div
          animate={
            staked
              ? {
                  rotate: ["-10deg", "90deg", "90deg", "-10deg"],
                  backgroundColor: [
                    "#ffa300",
                    "#ffa300",
                    "#fff",
                    "#ffa300",
                    "#ffa300",
                  ],
                }
              : {
                  rotate: ["0deg"],
                  backgroundColor: [""],
                }
          }
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 1,
          }}
          className="absolute left-[40%] top-[-30%] flex h-[50px] w-[50px] translate-x-[-50%] items-center justify-center rounded-full bg-info"
        >
          <TbPick className="text-white" size={30} />
        </motion.div>
        <h1 className="mt-2 text-white">{name}</h1>
      </div>
      <motion.div
        variants={variants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        animate={
          isHover || stakingLoading || UnstakingLoading ? "hover" : "initial"
        }
        className="absolute left-0 top-0 z-[4] flex h-full w-full items-center justify-center gap-2 overflow-hidden bg-slate-800 bg-opacity-80"
      >
        {!staked ? (
          <button
            disabled={stakingLoading}
            onClick={() => handleToMine()}
            className={`btn btn-info text-white hover:bg-white hover:text-info disabled:bg-white disabled:text-slate-900`}
          >
            {!stakingLoading ? "Stake" : "Staking.."}
          </button>
        ) : (
          <button
            disabled={UnstakingLoading}
            onClick={() => handleUnstake()}
            className="disbled:text-slate-900 btn btn-info text-white hover:bg-white hover:text-info disabled:bg-white"
          >
            {!UnstakingLoading ? "Unstake" : "Unstaking.."}
          </button>
        )}
        {/* <button className="btn bg-white text-info">Unstake</button> */}
      </motion.div>
    </div>
  );
}
