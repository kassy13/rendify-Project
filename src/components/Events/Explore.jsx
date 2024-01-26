// import { useEvent } from "../../utils/EventContextProvider";
// import Navbar from "../Navbar";
// import "../../sass/Explore.scss";
// import { Link, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";

// export const Explore = () => {
//   const {
//     // cleanupEventDetails,
//     getEventDeatails,
//     event,
//     setEvent,
//     currentPage,
//     totalPages,
//     nextPage,
//     prevPage,
//     categories,
//     // eventCategory,
//   } = useEvent();
//   //   console.log(cleanupEventDetails);
//   console.log(event);
//   const [loading, setLoading] = useState(true);

//   console.log(categories);

//   useEffect(() => {
//     window.scrollTo({ top: 20, behavior: "smooth" });
//   }, [currentPage]);

//   const filterEventsByCategory = (category) => {
//     console.log("Filtering events by category:", category);
//     if (category === "All Events") {
//       console.log("Fetching all events");
//       getEventDeatails();
//     } else {
//       const filteredEvents = event.filter((e) => e.eventCategory === category);

//       console.log("Filtered events:", filteredEvents);
//       setEvent(filteredEvents);
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <section className="explore_section">
//         <h1>Explore the best events happening around you !</h1>
//         <div className="categories">
//           {/* Display all categories */}
//           <Link
//             key="All Events"
//             to="/explore"
//             onClick={() => filterEventsByCategory("All Events")}
//           >
//             All Events
//           </Link>
//           {categories.map((category) => (
//             <Link
//               key={category}
//               to={`/explore/${encodeURIComponent(category)}`}
//               onClick={() => filterEventsByCategory(category)}
//             >
//               {category}
//             </Link>
//           ))}
//         </div>

//         {/* event &&
//           event.map((e) because event is inside an async function and can be undefined at some point */}
//         <div className="each_event">
//           {event?.slice((currentPage - 1) * 12, currentPage * 12).map((e) => {
//             const {
//               id,
//               eventName,
//               eventCategory,
//               eventDate,
//               //   eventDescription,
//               eventImage,
//               eventLocation,
//               tickets,
//               rsvp,
//             } = e;
//             return (
//               <div className="explore" key={id}>
//                 <div className="event" key={id}>
//                   <div className="event_img">
//                     <img src={eventImage} alt={eventName} />
//                   </div>
//                   <div className="event_text">
//                     <p className="cate">{eventCategory}</p>
//                     <h5 className="date">{eventDate}</h5>
//                     <Link
//                       to={`/eventDetails/${id}`}
//                       onClick={() => getEventDeatails(e)}
//                     >
//                       {/* Link to EventDetails with event ID */}
//                       <h1>{eventName}</h1>
//                     </Link>
//                     <p className="location">Location : {eventLocation}</p>
//                     <p className="location">Tickets : {tickets}</p>
//                     <p className="location">Rsvp : {rsvp}</p>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//         <div className="pagination">
//           <button onClick={prevPage} disabled={currentPage === 1}>
//             Prev
//           </button>
//           <span>{`${currentPage} / ${totalPages}`}</span>
//           <button onClick={nextPage} disabled={currentPage === totalPages}>
//             Next
//           </button>
//         </div>
//       </section>
//     </div>
//   );
// };

import { useEvent } from "../../utils/EventContextProvider";
import Navbar from "../Navbar";
import "../../sass/Explore.scss";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import {
  Collection_Id,
  Database_Id,
  databases,
} from "../../appwrite/appWriteConfig";

export const Explore = () => {
  // Destructure values from the useEvent hook
  const {
    getEventDeatails, // Fix typo: getEventDetails
    event,
    setEvent,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    categories,
  } = useEvent();

  // State to track loading status
  const [loading, setLoading] = useState(true);
  const [eventsAwaited, setEventsAwaited] = useState([]);

  useEffect(() => {
    // Scroll to top when the page changes
    window.scrollTo({ top: 20, behavior: "smooth" });
    handlecreatedEventsfromFronted();
  }, [currentPage]);

  // Function to filter events by category
  const filterEventsByCategory = (category) => {
    // Log the category being filtered
    console.log("Filtering events by category:", category);
    if (category === "All Events") {
      // Fetch all events if the category is "All Events"
      console.log("Fetching all events");
      getEventDeatails(); // Fix typo: getEventDetails
    } else {
      // Filter events based on the selected category
      const filteredEvents =
        event && eventsAwaited.filter((e) => e.eventCategory === category);

      console.log("Filtered events:", filteredEvents);
      setEvent(filteredEvents);
    }
  };

  const handlecreatedEventsfromFronted = async () => {
    try {
      const response = await databases.listDocuments(
        Database_Id,
        Collection_Id
      );
      setEventsAwaited(response.documents);
      console.log("event awaited", response);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("final event awaited", eventsAwaited);

  return (
    <div>
      <Navbar />
      <section className="explore_section">
        <h1>Explore the best events happening around you!</h1>
        {/* Display event categories */}
        <div className="categories">
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
        <div>
          <div className="each_event">
            {event?.slice((currentPage - 1) * 12, currentPage * 12).map((e) => {
              const {
                id,
                eventName,
                eventCategory,
                eventDate,
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
                        <h1>{eventName}</h1>
                      </Link>
                      <p className="location">Location: {eventLocation}</p>
                      <p className="location">Tickets: {tickets}</p>
                      <p className="location">Rsvp: {rsvp}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Display Awaited Events */}
          <div className="each_event">
            {eventsAwaited.map((awaited) => {
              return (
                <div className="explore" key={awaited.id}>
                  <div className="event" key={awaited.id}>
                    <div className="event_img">
                      <img src={awaited.eventImage} alt={awaited.eventName} />
                    </div>
                    <div className="event_text">
                      <p className="cate">{awaited.Category}</p>
                      <h5 className="date">{awaited.startDate}</h5>
                      <Link
                        to={`/eventDetails/${awaited.$id}`}
                        onClick={(e) => handlecreatedEventsfromFronted(e)}
                      >
                        <h1>{awaited.eventName}</h1>
                      </Link>
                      {/* <p className="location">{awaited.eventName}</p> */}
                      <p className="location">Location: {awaited.Location}</p>
                      <p className="location">Tickets: {awaited.Tickets}</p>
                      <p className="location">Rsvp: {awaited.RSVP}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Display events with loader */}
          {/* Pagination controls */}
          <div className="pagination">
            <button onClick={prevPage} disabled={currentPage === 1}>
              Prev
            </button>
            <span>{`${currentPage} / ${totalPages}`}</span>
            <button onClick={nextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
