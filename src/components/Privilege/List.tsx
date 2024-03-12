import FloatingButton from "../Shared/Button/FloatingButton";
import PrivilegeCard from "./Card";

export default function PrivilegeList() {
  return (
    <div>
      <div className="flex w-full px-10 py-10">
        <h1 className="font-bold text-white">Privilege</h1>
      </div>
      <div className="grid w-full grid-cols-1 justify-evenly gap-2 px-10 md:grid-cols-2 xl:grid-cols-4">
        <PrivilegeCard />
        <PrivilegeCard />
        <PrivilegeCard />
      </div>
      <FloatingButton />
    </div>
  );
}
