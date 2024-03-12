import PrivilegeList from "~/components/Privilege/List";
import BaseLayoutV2 from "~/components/Shared/Layout/BaseLayoutV2";
import NavBarV2 from "~/components/Shared/Nav/NavBarV2";

export default function PrivilegePage() {
  return (
    <BaseLayoutV2>
      <NavBarV2 />
      <PrivilegeList />
    </BaseLayoutV2>
  );
}
