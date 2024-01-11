import React, { ReactNode } from "react";
import BoxLeft from "~/components/Home/v2/BoxLeft";
import BoxRight from "~/components/Home/v2/BoxRight";
import BaseLayoutV2 from "~/components/Shared/v2/BaseLayoutV2";
// import About from "~/components/Home/About";
// import Hero from "~/components/Home/Hero";
// import OurNFT from "~/components/Home/OurNFT";
// import Project from "~/components/Home/Project";
// import Team from "~/components/Home/Team";
// import BaseContainer from "~/components/Shared/Container/BaseContainer";
// import Footer from "~/components/Shared/Footer";
// import BaseLayout from "~/components/Shared/Layouts/BaseLayout";
// import BaseNavbar from "~/components/Shared/Navbar/BaseNavbar";
import GridLayout from "~/components/Shared/v2/GridLayout";
import GridSpacer from "~/components/Shared/v2/GridSpacer";
import NavBarV2 from "~/components/Shared/v2/NavBarV2";

import { useEffect, useState } from "react";

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
