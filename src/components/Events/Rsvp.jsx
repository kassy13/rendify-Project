import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  Database_Id,
  databases,
  rsvpCollectionId,
} from "../../appwrite/appWriteConfig";
import { useAuth } from "../../utils/AuthContext";
import SideNav from "../Dashboard/SideNav";
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

  // Function to trim event description to 150 words
  const trimEventDescription = (description) => {
    const words = description.split(/\s+/);
    const trimmedDescription = words.slice(0, 50).join(" ");
    return `${trimmedDescription}...`;
  };

  useEffect(() => {
    const fetchUserRsvps = async () => {
      try {
        if (user) {
          const response = await databases.listDocuments(
            Database_Id,
            rsvpCollectionId
          );
          console.log("All RSVPs from Appwrite:", response.documents);
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
  }, [user, id]);

  return (
    <div className="Dash">
      <div className="rsvp">
        <div className="sidenav">
          <SideNav />
        </div>
        <div className="other_sideNav">
          {loading && <Loader2 />}
          {!loading && (
            <div className="rsvp_container">
              <h2>My RSVPs</h2>
              <div className="each_rsvp">
                {userRsvps.length === 0 ? (
                  <div className="no_rsvp">
                    <p>No RSVPs Yet!</p>
                    <div className="no_rsvpImg">
                      <img src={rsvpimg} alt="" />
                    </div>
                  </div>
                ) : (
                  userRsvps.map((rsvp) => (
                    <div key={rsvp.$id} className="rsvps">
                      <div className="rsvp_content">
                        <div className="textss">
                          <p>Event Name: {rsvp.eventName}</p>
                          <p>Event Ticket: {rsvp.tickets}</p>
                          <p>
                            Event Description:{" "}
                            {trimEventDescription(rsvp.eventDescription)}
                          </p>

                          <p>Event Location: {rsvp.eventLocation}</p>
                          <p>Event Category: {rsvp.eventCategory}</p>
                        </div>
                        <div className="rsvp_img">
                          <img src={rsvp.eventImagee} alt="" />
                        </div>
                      </div>

                      <button className="btn">Generate Qr code</button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <div className="modal-container">
        <div className="modal">
          <button className="close-btn">Close</button>
          <h2>Generated QR Code:</h2>
        </div>
      </div> */}
    </div>
  );
};

export default Rsvp;
