import CTA from "../components/CTA";
import Expertise from "../components/Expertise";
import Hero from "../components/Hero";
import PageWrapper from "../components/PageWrapper";
import Portfolio from "../components/Portfolio";

const HomePage = () => (
  <PageWrapper>
    <Hero />
    <Expertise />
    <Portfolio />
    <CTA />
  </PageWrapper>
);

export default HomePage;