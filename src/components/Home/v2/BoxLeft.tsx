import TypingText from "~/components/Shared/Typepography/TypingText/Text";

const texts: string[] = ["NFT", "Mining", "Privilege"];

export default function BoxLeft() {
  return (
    <div className="order-1 col-span-12 flex flex-col justify-center gap-6 p-4 md:order-none md:col-span-4">
      <div>
        <div className="text-[50px] font-bold leading-[120%] text-white">
          More Than Profession
        </div>
        <TypingText texts={texts} />
      </div>

      <p className="hidden text-slate-300 md:block">
        the group of people who admired NFT technology and Crypto mining.
        Therefore the holders can join many of our activities
      </p>

      <button className="btn btn-info text-white hover:bg-opacity-80">
        Start Mining
      </button>
    </div>
  );
}
