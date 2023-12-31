import HeroSection from "./HeroSection";
import Navbar from "./Navbar";
import SectionOne from "./SectionOne";
import "../sass/hero.scss";

const Home = () => {
  return (
    <div className="">
      <div className="frost">
        <Navbar />
        <HeroSection />
      </div>

      <SectionOne />
    </div>
  );
};

export default Home;
