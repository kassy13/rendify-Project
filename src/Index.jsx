import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import SectionOne from "./components/SectionOne";
import "././sass/hero.scss";
import {useState} from "react";

import Footer from "./components/Footer";

import Loader3 from "./Loader/Loader3";
// import Loader from "../Loader/Loader";

const Index = () => {
  const [loading, setLoading] = useState(false);
  return loading ? (
    <Loader3 />
  ) : (
    <div className="">
      <div>
        <div className="frost">
          <Navbar />
          <HeroSection />
        </div>
        <SectionOne />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
