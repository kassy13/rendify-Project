import { useEvent } from "../../utils/EventContextProvider";
import Navbar from "../Navbar";
import "../../sass/Explore.scss";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const Explore = () => {
  const {
    // cleanupEventDetails,
    getEventDeatails,
    event,
    setEvent,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    categories,
    // eventCategory,
  } = useEvent();
  //   console.log(cleanupEventDetails);
  console.log(event);

  console.log(categories);

  useEffect(() => {
    window.scrollTo({ top: 20, behavior: "smooth" });
  }, [currentPage]);

  const filterEventsByCategory = (category) => {
    console.log("Filtering events by category:", category);
    if (category === "All Events") {
      console.log("Fetching all events");
      getEventDeatails();
    } else {
      const filteredEvents = event.filter((e) => e.eventCategory === category);

      console.log("Filtered events:", filteredEvents);
      setEvent(filteredEvents);
    }
  };

  return (
    <div>
      <Navbar />
      <section className="explore_section">
        <h1>Explore the best events happening around you !</h1>
        <div className="categories">
          {/* Display all categories */}
          <Link
            key="All Events"
            to="/explore"
            onClick={() => filterEventsByCategory("All Events")}
          >
            All Events
          </Link>
          {categories.map((category) => (
            <Link
              key={category}
              to={`/explore/${encodeURIComponent(category)}`}
              onClick={() => filterEventsByCategory(category)}
            >
              {category}
            </Link>
          ))}
        </div>

        {/* event &&
          event.map((e) because event is inside an async function and can be undefined at some point */}
        <div className="each_event">
          {event?.slice((currentPage - 1) * 12, currentPage * 12).map((e) => {
            const {
              id,
              eventName,
              eventCategory,
              eventDate,
              //   eventDescription,
              eventImage,
              eventLocation,
              tickets,
              rsvp,
            } = e;
            return (
              <div className="explore" key={id}>
                <div className="event" key={id}>
                  <div className="event_img">
                    <img src={eventImage} alt={eventName} />
                  </div>
                  <div className="event_text">
                    <p className="cate">{eventCategory}</p>
                    <h5 className="date">{eventDate}</h5>
                    <Link
                      to={`/eventDetails/${id}`}
                      onClick={() => getEventDeatails(e)}
                    >
                      {/* Link to EventDetails with event ID */}
                      <h1>{eventName}</h1>
                    </Link>
                    <p className="location">Location : {eventLocation}</p>
                    <p className="location">Tickets : {tickets}</p>
                    <p className="location">Rsvp : {rsvp}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>
            Prev
          </button>
          <span>{`${currentPage} / ${totalPages}`}</span>
          <button onClick={nextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </section>
    </div>
  );
};
