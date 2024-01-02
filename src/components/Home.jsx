import HeroSection from "./HeroSection";
import Navbar from "./Navbar";
import SectionOne from "./SectionOne";
import "../sass/hero.scss";
import { useState } from "react";
import Loader from "../Loader/Loader";

const Home = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="">
      {loading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <div className="frost">
            <Navbar />
            <HeroSection />
          </div>
          <SectionOne />
        </>
      )}
    </div>
  );
};

export default Home;
