import About from "~/components/Home/About";
import Hero from "~/components/Home/Hero";
import OurNFT from "~/components/Home/OurNFT";
import Project from "~/components/Home/Project";
import Team from "~/components/Home/Team";
import BaseContainer from "~/components/Shared/Container/BaseContainer";
import Footer from "~/components/Shared/Footer";
import BaseLayout from "~/components/Shared/Layouts/BaseLayout";
import BaseNavbar from "~/components/Shared/Navbar/BaseNavbar";

export default function Home() {
  return (
    <BaseLayout>
      <BaseNavbar />
      <BaseContainer>
        <Hero />
        <About />
        <OurNFT />
        <Project />
        <Team />
      </BaseContainer>
      <Footer />
    </BaseLayout>
  );
}
