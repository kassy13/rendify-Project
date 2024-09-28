import React, {useCallback, useEffect, useState} from "react";
import {clientContentful} from "../Contentful/client";
import "../sass/hero.scss";
import heroimga from "../assets/Glass_Prism0094.png";
import {Link} from "react-router-dom";
import Loader from "../Loader/Loader";
// import heroimga from "../assets/Clay_Purple0077.png";

const HeroSection = () => {
  const [hero, setHero] = useState([]);
  const [heroLoading, setHeroLoading] = useState(false);

  const cleanupHeroDetails = useCallback((rawData) => {
    const cleanHeroDetails = rawData.map((detail) => {
      const {sys, fields} = detail;
      const {id} = sys;
      const heroTitle = fields.herosection;
      const heroPara = fields.heroPara;
      const heroimg = fields.heroimg.fields.file.url;
      const updatedDetails = {id, heroTitle, heroPara, heroimg};
      return updatedDetails;
    });
    setHero(cleanHeroDetails);
  }, []);

  const getHeroDetails = useCallback(async () => {
    setHeroLoading(true);
    try {
      const response = await clientContentful.getEntries({
        content_type: "rendifyHero",
      });
      const responseData = response.items;
      console.log(responseData);

      if (responseData) {
        cleanupHeroDetails(responseData);
      } else {
        setHero([]);
      }
      setHeroLoading(false);
    } catch (error) {
      console.log(error);
      setHeroLoading(false);
    }
  }, [cleanupHeroDetails]);
  useEffect(() => {
    getHeroDetails();
  }, [getHeroDetails]);

  console.log(hero);
  return heroLoading ? (
    <Loader />
  ) : (
    <div>
      {hero.map((item) => {
        const {id, heroTitle, heroPara, heroimg} = item;
        return (
          <div className="hero_section" key={id}>
            <div className="text_wrap">
              <h1 className="hero_title">{heroTitle}</h1>
              <p> {heroPara} </p>

              <Link to={"/explore"} className="btn">
                Get Started
              </Link>
            </div>
            <div className="hero_img">
              {/* <img src={heroimg} alt="" /> */}
              <img src={heroimga} alt="" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HeroSection;
