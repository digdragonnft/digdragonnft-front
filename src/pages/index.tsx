import React, { ReactNode } from "react";
import BoxLeft from "~/components/Home/BoxLeft";
import BoxRight from "~/components/Home/BoxRight";
import BaseLayoutV2 from "~/components/Shared/Layout/BaseLayoutV2";
import GridLayout from "~/components/Shared/Layout/GridLayout";
import GridSpacer from "~/components/Shared/Layout/GridSpacer";
import NavBarV2 from "~/components/Shared/Nav/NavBarV2";

import { useEffect, useState } from "react";
import FloatingButton from "~/components/Shared/Button/FloatingButton";

export default function Home() {
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    setReady(true);
  }, [ready, setReady]);

  if (!ready) {
    return (
      <BaseLayoutV2>
        <div className="min-h-screen w-full">
          <div className="loading loading-spinner"></div>
        </div>
      </BaseLayoutV2>
    );
  }

  return (
    <BaseLayoutV2>
      <NavBarV2 />
      <div className="mt-10 flex h-[80vh] items-center justify-center">
        <GridLayout className="h-full">
          <GridSpacer />
          <BoxLeft />
          <BoxRight />
          <GridSpacer />
        </GridLayout>
      </div>
      <FloatingButton />
    </BaseLayoutV2>
  );
}

// export default function Home() {
//   return (
//     <BaseLayout>
//       <BaseNavbar />
//       <BaseContainer>
//         <Hero />
//         <About />
//         <OurNFT />
//         <Project />
//         <Team />
//       </BaseContainer>
//       <Footer />
//     </BaseLayout>
//   );
// }
