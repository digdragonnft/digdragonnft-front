import { GiMineWagon } from "react-icons/gi";
import { MenuItemProps } from "~/interfaces/components/Shared/Navbar/MenuItemProps";
import Link from "next/link";

const MenuItem = ({ title, path }: MenuItemProps) => {
  return (
    <Link
      href={path == undefined ? path : "#"}
      className="flex items-center gap-2"
    >
      <GiMineWagon size={24} />
      <span>{title}</span>
    </Link>
  );
};

export default MenuItem;
