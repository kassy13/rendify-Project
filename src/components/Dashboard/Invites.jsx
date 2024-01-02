import { useLocation } from "react-router-dom";
import {
  Database_Id,
  databases,
  inviteCollectionId,
  notiClient,
  query,
} from "../../appwrite/appWriteConfig";
import { useEffect, useState } from "react";
import { Query } from "appwrite";

const Invites = () => {
  const location = useLocation();
  const { eventDetails } = location.state || {};

  const [invites, setInvites] = useState([]);

  useEffect(() => {
    const fetchInvites = async () => {
      try {
        // Fetch initial invites for the specific event
        const response = await databases.listDocuments(
          Database_Id,
          inviteCollectionId,
          [
            Query.equal("eventId", eventDetails.$id),
            // Add more queries as needed
          ]
        );

        // Set the initial invites in the state
        setInvites(response.documents);
      } catch (error) {
        console.error("Error fetching invites:", error);
      }
    };

    const unsubscribe = notiClient.subscribe(
      `database.${Database_Id}.collections.${inviteCollectionId}.documents.invites`,
      (response) => {
        console.log("Received invite notification:", response);
        // Update invites in real-time
        fetchInvites();
      }
    );

    // Fetch initial invites only if eventDetails is available
    if (eventDetails?.$id) {
      fetchInvites();
    }

    return () => {
      unsubscribe();
    };
  }, [eventDetails.$id]);

  return (
    <div>
      <div style={{ float: "left", width: "50%" }}>
        {/* Display event details if available */}
        {eventDetails ? (
          <>
            <h1>Invites for {eventDetails.eventName}</h1>
            {invites.length > 0 ? (
              invites.map((invite) => (
                <div key={invite.$id}>
                  <p>Invited User ID: {invite.userId}</p>
                  {/* Display other details of the invite */}
                </div>
              ))
            ) : (
              <p>No invites for this event yet.</p>
            )}
          </>
        ) : (
          <p>No event details available.</p>
        )}
      </div>

      <div style={{ float: "right", width: "50%" }}></div>
    </div>
  );
};

export default Invites;
