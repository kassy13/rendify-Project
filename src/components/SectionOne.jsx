import { useCallback, useEffect, useState } from "react";
import { clientContentful } from "../Contentful/client";
import "../sass/hero.scss";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/scrollbar";

const SectionOne = () => {
  const [sectionOne, setSectionOne] = useState([]);
  const [sectionLoading, setSectionLoading] = useState(false);

  const cleanupSectionOneDetails = useCallback((rawData) => {
    const cleanSectionOneDetails = rawData.map((detail) => {
      const { sys, fields } = detail;
      const { id } = sys;
      const rendify = fields.atrendify.content[0].content[0];
      const cardOne = fields.cardone.content[0].content[0].value;
      const cardOneDetails = fields.cardone.content[1].content[0].value;
      const cardTwo = fields.cardtwo.content[0].content[0].value;
      const cardTwoDetails = fields.cardtwo.content[1].content[0].value;
      const cardThree = fields.cardthree.content[0].content[0].value;
      const cardThreeDetails = fields.cardthree.content[1].content[0].value;
      const cardFour = fields.cardfour.content[0].content[0].value;
      const cardFourDetails = fields.cardfour.content[1].content[0].value;
      const cardFive = fields.cardfive.content[0].content[0].value;
      const cardFivedetails = fields.cardfive.content[1].content[0].value;
      const updatedDetails = {
        id,
        rendify,
        cardOne,
        cardOneDetails,
        cardTwo,
        cardTwoDetails,
        cardThree,
        cardThreeDetails,
        cardFour,
        cardFourDetails,
        cardFive,
        cardFivedetails,
      };
      return updatedDetails;
    });
    setSectionOne(cleanSectionOneDetails);
  }, []);

  const getSectionDetails = useCallback(async () => {
    setSectionLoading(true);
    try {
      const response = await clientContentful.getEntries({
        content_type: "section2",
      });
      //   console.log(response);
      const responseData = response.items;
      console.log(responseData);

      if (responseData) {
        cleanupSectionOneDetails(responseData);
      } else {
        setSectionOne([]);
      }
      setSectionLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [cleanupSectionOneDetails]);
  useEffect(() => {
    getSectionDetails();
  }, [getSectionDetails]);

  return (
    <div>
      {sectionOne.map((item) => {
        const {
          id,
          rendify,
          cardOne,
          cardOneDetails,
          cardTwo,
          cardTwoDetails,
          cardThree,
          cardThreeDetails,
          cardFour,
          cardFourDetails,
          cardFive,
          cardFivedetails,
        } = item;
        return (
          <div className="section_one" key={id}>
            <div className="services">
              <h1> Our services</h1>
              <div className="rendi">{rendify.value}</div>
            </div>
            <div className="cards">
              <Swiper
                modules={[Navigation, Pagination, Autoplay, A11y]}
                spaceBetween={50}
                // slidesPerView={3}
                // Number of slides per view for small screens (mobile)
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                autoplay={{ delay: 5000 }}
                pagination={{ clickable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log("slide change")}
                breakpoints={{
                  640: {
                    slidesPerView: 1, // 1 slide per view for screens less than 640px wide (mobile)
                  },
                  768: {
                    slidesPerView: 2, // 2 slides per view for screens between 640px and 768px wide (tablet)
                  },
                  1024: {
                    slidesPerView: 3, // 3 slides per view for screens wider than 1024px (desktop)
                  },
                }}
              >
                <SwiperSlide>
                  <div className="card">
                    <ul>
                      <li className="event"> {cardOne}</li>
                      <li>{cardOneDetails}</li>
                    </ul>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="card">
                    <ul>
                      <li className="event">{cardTwo}</li>
                      <li>{cardTwoDetails}</li>
                    </ul>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="card">
                    <ul>
                      <li className="event">{cardThree}</li>
                      <li>{cardThreeDetails}</li>
                    </ul>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="card">
                    <ul>
                      <li className="event">{cardFour} </li>
                      <li>{cardFourDetails} </li>
                    </ul>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="card">
                    <ul>
                      <li className="event">{cardFive}</li>
                      <li>{cardFivedetails} </li>
                    </ul>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SectionOne;
