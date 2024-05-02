import Link from "next/link";
import TypingText from "~/components/Shared/Typepography/TypingText/Text";

const texts: string[] = ["NFT", "Mining", "Privilege"];

export default function BoxLeft() {
  return (
    <div className="order-1 col-span-12 flex flex-col justify-center gap-6  p-4 md:order-none md:col-span-4">
      <div>
        <div className="text-[50px] font-bold leading-[120%] text-white xl:text-[80px]">
          More Than Profession
        </div>
        <TypingText texts={texts} />
      </div>

      <p className="text-slate-300">
        the group of people who admired NFT technology and Crypto mining.
        Therefore the holders can join many of our activities
      </p>

      <Link
        href="/mine"
        className="btn btn-info hidden text-white hover:bg-opacity-80 md:flex"
      >
        Start Mining
      </Link>
    </div>
  );
}
