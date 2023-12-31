// import React from "react";
// import { useParams, useLocation } from "react-router-dom";

// const Rsvp = () => {
//   const { state } = useLocation();
//   const { id } = useParams();

//   if (!state || !state.eventDetails) {
//     return <div>Event not found!</div>;
//   }

//   const {
//     eventName,
//     eventCategory,
//     eventDate,
//     eventImage,
//     eventLocation,
//     eventDescription,
//     tickets,
//     rsvp,
//     price,
//   } = state.eventDetails;

//   return (
//     <div>
//       <h2>RSVP Details</h2>
//       <p>Event Id: {id}</p>
//       <p>{eventName}</p>
//       <p>{eventCategory}</p>
//       <p>{eventDate}</p>
//       <img src={eventImage} alt={eventName} />
//       <p>{eventLocation}</p>
//       <p>{eventDescription}</p>
//       <p>{tickets}</p>
//       <p>{price === 0 ? "Free" : `NGN ${price}`}</p>
//       <p>{rsvp}</p>
//       {/* Display other RSVP details as needed */}
//     </div>
//   );
// };

// export default Rsvp;

import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  databases,
  rsvpCollectionId,
  rsvpDatabaseId,
} from "../../appwrite/appWriteConfig";
import { useAuth } from "../../utils/AuthContext";
import SideNav from "../Dashboard/SideNav";
// import "../../sass/Dashboardcomponents.scss";
// import Loader from "../../Loader/Loader";
import "../../sass/createaddEvent.scss";
import Loader2 from "../../Loader/Loader2";
import rsvpimg from "../../assets/norsvp.gif";
const Rsvp = () => {
  const location = useLocation();
  console.log("Location:", location);
  const { id } = useParams();
  const { user } = useAuth();
  const [userRsvps, setUserRsvps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRsvps = async () => {
      try {
        if (user) {
          // Fetch RSVPs for the current user from the Appwrite database
          const response = await databases.listDocuments(
            rsvpDatabaseId,
            rsvpCollectionId
          );
          console.log("All RSVPs from Appwrite:", response.documents);
          // Filter the documents based on the user's ID
          const userRsvps = response.documents.filter(
            (rsvp) => rsvp.userId === user.$id
          );

          setUserRsvps(userRsvps || []);
          console.log("User's RSVPs after filtering:", userRsvps);
        }
      } catch (error) {
        console.error("Error fetching user RSVPs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRsvps();
  }, [user, id]); // Including id in the dependency array to re-run the effect when the id changes

  // if (!location || !location.state || !location.state.eventDetails) {
  //   console.error("Event Details not found in location.state:", location.state);
  //   return <div>No RSVPs Yet! (Event Details not found)</div>;
  // }

  // const {
  //   eventName,
  //   eventCategory,
  //   eventDate,
  //   eventImage,
  //   eventLocation,
  //   eventDescription,
  //   tickets,
  //   price,
  // } = location.state.eventDetails;

  console.log("rsvp state", location.state); // Access location.state instead of state
  console.log("userRsvps", userRsvps);

  return (
    <div className="rsvp">
      <div className="sidenav">
        <SideNav />
      </div>
      <div className="other_sideNav">
        {loading && <Loader2 />} {/* Loader is now part of the main content */}
        {!loading && (
          <div className="each_rsvp">
            {userRsvps.length === 0 ? (
              <div className="no_rsvp">
                <p>No RSVPs Yet!</p>
                <img src={rsvpimg} alt="" />
              </div>
            ) : (
              userRsvps.map((rsvp) => (
                <div key={rsvp.$id} className="rsvps">
                  <div className="rsvp_content">
                    <div className="textss">
                      <p>Event Id: {rsvp.eventId}</p>
                      <p>Event Name: {rsvp.eventName}</p>
                      <p>Event Ticket: {rsvp.tickets}</p>
                      <p>Event Description : {rsvp.EventDescription}</p>
                      <p>Event Location: {rsvp.eventLocation}</p>
                      <p>Event Category:{rsvp.eventCategory}</p>
                    </div>
                    <div className="rsvp_img">
                      <img src={rsvp.eventImage} alt="" />
                    </div>
                  </div>
                  {/* Display other RSVP details as needed */}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Rsvp;
