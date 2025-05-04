import FloatingButton from "../Shared/Button/FloatingButton";
import PrivilegeCard from "./Card";

export default function PrivilegeList() {
  return (
    <div>
      <div className="flex w-full px-10 py-10">
        <h1 className="font-bold text-white">Privilege</h1>
      </div>
      <div className="grid w-full grid-cols-1 justify-evenly gap-2 px-10 md:grid-cols-2 xl:grid-cols-4">
        <PrivilegeCard
          hero="/images/jibjibcoin.jpeg"
          title="JIBJIB Coin Airdrop"
          avatar="/images/jibjibcoin2.png"
          content="JIBJIB Coin Airdrop for digdragon holder
          claiming on JBC Chain"
          link="/privilege/jibjib?title=JIBJIB Coin Airdrop&content=JIBJIB Coin Airdrop for digdragon holder
          claiming on JBC Chain&avatar=/images/jibjibcoin2.png"
        />
      </div>
      <FloatingButton />
    </div>
  );
}
