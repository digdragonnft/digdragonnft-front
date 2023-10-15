import { GiMineWagon } from "react-icons/gi";
import { MenuItemProps } from "~/interfaces/components/Shared/Navbar/MenuItemProps";

const MenuItem = ({ title, path }: MenuItemProps) => {
  return (
    <a className="flex items-center gap-2">
      <GiMineWagon size={24} />
      <span>{title}</span>
    </a>
  );
};

export default MenuItem;
