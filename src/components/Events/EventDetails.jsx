import { Link, json, useNavigate, useParams } from "react-router-dom";
import { useEvent } from "../../utils/EventContextProvider";
import "../../sass/Explore.scss";
import { Calendar, MapPin } from "@phosphor-icons/react";
import { Bookmarks, TwitterLogo } from "@phosphor-icons/react/dist/ssr";
import { useAuth } from "../../utils/AuthContext";
import {
  Database_Id,
  ID,
  databases,
  rsvpCollectionId,
} from "../../appwrite/appWriteConfig";
import { useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../Navbar";
// import LeafletMap from "../Map/Leaflet";
import SimpleMap from "../Map/Leaflet";

const EventDetails = () => {
  const navigate = useNavigate();
  const { event } = useEvent();
  const { id } = useParams();
  const { user } = useAuth();
  // const [rsvpMessage, setRsvpMessage] = useState("");
  // const [rsvpData, setRsvpData] = useState(null);

  // Find the selected event based on the id from the URL
  const selectedEvent = event?.find((e) => e.id === id);
  // const selectedEvent = Array.isArray(event) && event.find((e) => e.id === id);
  console.log(id);

  if (!selectedEvent) {
    return <div>Event not found!</div>;
  }

  const {
    eventName,
    eventCategory,
    eventDate,
    eventImage,
    eventLocation,
    eventDescription,
    tickets,
    rsvp,
    price,
    eventCoord,
  } = selectedEvent;
  console.log(selectedEvent);
  const handleRsvp = async (e) => {
    try {
      e.preventDefault();
      // Add some console logs to debug
      console.log("Tickets:", tickets);
      console.log("RSVP:", rsvp);
      console.log("Price:", price);
      // Conditionally navigate to "/rsvp" or "/payment" based on tickets and rsvp values
      if (tickets === "Paid" && rsvp && price > 0) {
        navigate("/payment", {
          state: { eventDetails: selectedEvent, id },
        });
      } else {
        navigate("/dashboard/rsvp", {
          state: { eventDetails: selectedEvent, id },
        });
        toast.success("Event Successfuly RSVPed");
      }
      if (user && selectedEvent) {
        const rsvpData = {
          eventId: selectedEvent.id,
          userId: user.$id,
          eventCategory: selectedEvent.eventCategory, // Make sure these fields are defined in your selectedEvent
          eventName: selectedEvent.eventName,
          tickets: selectedEvent.tickets,
          rsvp: selectedEvent.rsvp,
          eventDate: selectedEvent.eventDate,
          eventDescription: selectedEvent.eventDescription,
          // eventLocation: selectedEvent.eventCoord,
          price: selectedEvent.price,
          eventImagee: selectedEvent.eventImage, // Ensure it's a non-empty string
        };
        const response = await databases.createDocument(
          Database_Id,
          rsvpCollectionId,
          ID.unique(),
          rsvpData
        );
        console.log("RSVP saved:", response);
      }
    } catch (error) {
      console.log("error messase", error);
    }
  };
  // Handling sharing tweet using twitter intent
  const handleTweet = () => {
    try {
      const formattedDate = new Date(eventDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
      });

      // Separating each lines for better readability
      const tweetText = `Join me at ${eventName} on ${formattedDate}! 🎉\nFollow the link to join: ${window.location.href}`;

      // Including the event name as the hashtag
      const tweetParams = {
        text: tweetText,
        hashtags: eventName ? [eventName.replace(/\s/g, "")] : [], // Remove spaces from the event name and use it as the hashtag
        media: eventImage,
      };

      // Constructing the Twitter share URL with the tweet parameters
      const twitterShareUrl = `https://twitter.com/intent/tweet?${new URLSearchParams(
        tweetParams
      )}`;

      // Opening the Twitter share URL in a new tab
      window.open(twitterShareUrl, "_blank");
    } catch (error) {
      console.error("Error sharing on Twitter:", error);
    }
  };
  console.log(price, "price");

  return (
    <>
      <Navbar />
      <section className="event_details">
        <div className="left">
          <Link to="/explore">Back</Link>

          <div className="event_img">
            <img src={eventImage} alt={eventName} />
          </div>

          <h3>{eventDescription}</h3>
          {/* Add more details as needed */}
        </div>
        <div className="rightExplore">
          <h1>{eventName}</h1>

          <p className="tex">
            <Bookmarks size={32} className="icon" /> {eventCategory}
          </p>
          <p className="tex">
            <Calendar size={32} className="icon" /> {eventDate}
          </p>
          <p className="tex">
            <MapPin size={32} className="icon" /> {eventLocation}
          </p>

          {/* Render the SimpleMap component if event coordinates are available */}
          {/* Pass lat and lon to SimpleMap */}
          <SimpleMap
            lat={selectedEvent.eventCoord.lat}
            lon={selectedEvent.eventCoord.lon}
          />

          {/* Show a message if event location coordinates are not available */}

          <div className="rsvpExplore">
            <div className=" ">
              <p>Event: {tickets}</p>
              <p>
                {price === 0 || price === undefined ? "Free" : `NGN ${price}`}
              </p>
              <button
                type="submit"
                className="btn"
                onClick={(e) => handleRsvp(e)}
              >
                RSVP
              </button>
            </div>
          </div>
          <div className="tweet" onClick={handleTweet}>
            <p>
              Invite your Friends <br />{" "}
              <span>and enjoy a shared experience</span>
            </p>
            <div className="twit_logo pr-10">
              <TwitterLogo size={32} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EventDetails;
