import { useEffect, useState } from "react";
import { type MyNFTProps } from "~/interfaces/Wallet/MyNFTProps";
import {
  GiSwordSpade,
  GiShieldReflect,
  GiWingfoot,
  GiDragonHead,
} from "react-icons/gi";
import { FaExternalLinkAlt } from "react-icons/fa";
import MyNFTStatus from "./MyNFTStatus";
import MyNFTStat from "./MyNFTStat";
import { type MyNFTRarity } from "~/interfaces/Wallet/MyNFTRarity";
import Link from "next/link";
import { useStake, useStakedEvent } from "~/blockchain/Mine/stake";
import { useAccount } from "wagmi";
import Loading from "~/components/Shared/Inidcators/Loading";
import { motion } from "framer-motion";

const MyNFT = ({ data, isApprovedForAll }: MyNFTProps) => {
  const { address } = useAccount();
  const [loading, setLoading] = useState<boolean>(false);
  const { stake, staking } = useStake();
  const { stakedEvent, resetStaked } = useStakedEvent(address as string);

  useEffect(() => {
    if (stakedEvent) {
      setLoading(false);
      resetStaked();
    }
  }, [stakedEvent]);

  const handleToMine = () => {
    setLoading(true);
    const tokenId = +(data?.tokenId)!.toString();
    stake([tokenId]);
  };

  const [rarity, setRarity] = useState<MyNFTRarity>({
    text: "N",
    color: "bg-base-300",
  });

  const getRarity = () => {
    switch (data?.attributes[0].value) {
      case "normal": {
        setRarity({
          text: "N",
          color: "bg-base-300",
        });
        break;
      }
      case "rare": {
        setRarity({
          text: "R",
          color: "bg-gradient-to-br from-[#2E3192] to-[#1BFFFF] text-white",
        });
        break;
      }
      case "super rare": {
        setRarity({
          text: "SR",
          color: "bg-gradient-to-br from-[#009245] to-[#FCEE21] text-white",
        });
        break;
      }
      case "Super special rare": {
        setRarity({
          text: "SSR",
          color: "bg-gradient-to-br from-[#FF512F] to-[#DD2476] text-white",
        });
        break;
      }
      default: {
        setRarity({
          text: "N",
          color: "bg-base-300",
        });
      }
    }
  };

  useEffect(() => {
    getRarity();
  }, []);

  return (
    <>
      <motion.div
        initial={{ y: 0 }}
        transition={{
          duration: 0.2,
          ease: "easeInOut",
        }}
        whileHover={{ y: -5 }}
        className="card w-full max-w-[320px] bg-base-100 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
      >
        {/**Rarity Badge */}
        <div
          className={` absolute right-3 top-5 flex h-[45px] w-[45px] items-center  justify-center rounded-full ${rarity.color}  font-bold`}
        >
          {rarity.text}
        </div>

        <div
          className={`absolute left-5 top-8 flex flex-col items-start  justify-center text-5xl font-bold`}
        >
          <div className="text-2xl leading-3 text-white">
            {
              //@ts-ignore
              data?.attributes[5].value
            }
          </div>
          <div className="text-xs font-bold text-warning">HASH</div>
        </div>
        <figure className="overflow-hidden py-2">
          <img
            className="w-96 rounded-3xl p-2"
            src={data?.image}
            alt="nft-image"
          />
        </figure>
        <div className="stats stats-vertical shadow">
          {/**TokenName */}
          <MyNFTStat
            icon={<GiDragonHead size={30} />}
            title={"Token's Name"}
            value={data?.name}
          />
          <MyNFTStatus
            icon={<GiSwordSpade size={24} />}
            title={
              //@ts-ignore
              data?.attributes[2].trait_type
            }
            value={
              //@ts-ignore
              Math.floor(+data?.attributes[2].value).toString()
            }
          />
          <MyNFTStatus
            icon={<GiShieldReflect size={24} />}
            title={
              //@ts-ignore
              data?.attributes[3].trait_type
            }
            value={
              //@ts-ignore
              Math.floor(+data?.attributes[3].value).toString()
            }
          />
          <MyNFTStatus
            icon={<GiWingfoot size={24} />}
            title={
              //@ts-ignore
              data?.attributes[4].trait_type
            }
            value={
              //@ts-ignore
              Math.floor(+data?.attributes[4].value).toString()
            }
          />
          <button
            className="btn btn-neutral mx-1"
            disabled={!isApprovedForAll || staking || loading}
            onClick={() => handleToMine()}
          >
            {isApprovedForAll ? (
              <>
                {loading || staking ? (
                  <div className="flex items-center gap-2">
                    <Loading />
                    <span>Entering..</span>
                  </div>
                ) : (
                  <span>To Mine</span>
                )}
              </>
            ) : (
              "not approve to mine"
            )}
          </button>
          <Link
            href={`https://www.bkcscan.com/token/0x7c80f994c724b0c8f834f4303c4f142004798219/instance/${data.tokenId?.toString()}/token-transfers`}
            target="_blank"
            className="btn btn-ghost mx-1 my-1"
          >
            <FaExternalLinkAlt /> on bkcscan
          </Link>
        </div>
      </motion.div>
    </>
  );
};

export default MyNFT;
