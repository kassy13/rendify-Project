// import { useLocation } from "react-router-dom";
// import {
//   Database_Id,
//   databases,
//   inviteCollectionId,
//   notiClient,
//   query,
// } from "../../appwrite/appWriteConfig";
// import { useEffect, useState } from "react";
// import { Query } from "appwrite";

// const Invites = () => {
//   const location = useLocation();
//   const { eventDetails } = location.state || {};

//   const [invites, setInvites] = useState([]);

//   useEffect(() => {
//     const fetchInvites = async () => {
//       try {
//         // Fetch initial invites for the specific event
//         const response = await databases.listDocuments(
//           Database_Id,
//           inviteCollectionId
//         );

//         // Set the initial invites in the state
//         setInvites(response.documents);
//       } catch (error) {
//         console.error("Error fetching invites:", error);
//       }
//     };

//     const unsubscribe = notiClient.subscribe(
//       `database.${Database_Id}.collections.${inviteCollectionId}.documents.invites`,
//       (response) => {
//         console.log("Received invite notification:", response);
//         // Update invites in real-time
//         fetchInvites();
//       }
//     );

//     // Fetch initial invites only if eventDetails is available
//     // if (eventDetails?.$id) {
//     //   fetchInvites();
//     // }

//     return () => {
//       unsubscribe();
//     };
//   }, [eventDetails.$id]);

//   return (
//     <div>
//       <div style={{ float: "left", width: "50%" }}>
//         {/* Display event details if available */}
//         {eventDetails ? (
//           <>
//             <h1>Invites for {eventDetails.eventName}</h1>
//             {invites.length > 0 ? (
//               invites.map((invite) => (
//                 <div key={invite.$id}>
//                   <p>Invited User ID: {invite.userId}</p>
//                   {/* Display other details of the invite */}
//                 </div>
//               ))
//             ) : (
//               <p>No invites for this event yet.</p>
//             )}
//           </>
//         ) : (
//           <p>No event details available.</p>
//         )}
//       </div>

//       <div style={{ float: "right", width: "50%" }}></div>
//     </div>
//   );
// };

// export default Invites;

import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Database_Id,
  databases,
  inviteCollectionId,
} from "../../appwrite/appWriteConfig";
import SideNav from "./SideNav";
import { useAuth } from "../../utils/AuthContext";
import "../../sass/invites.scss";
import Loader from "../../Loader/Loader";
import noEvent from "../../assets/evente.png";

const Invites = () => {
  const [invites, setInvites] = useState();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const handleGetInviteDetails = async () => {
    try {
      if (user) {
        const response = await databases.listDocuments(
          Database_Id,
          inviteCollectionId
        );
        console.log("response", response);
        const userInvites = response.documents.filter(
          (i) => i.receiverId === user.$id
        );
        setInvites(userInvites || []);
        console.log("User's Invites after filtering:", userInvites);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    handleGetInviteDetails();
  }, []);
  console.log("invites", invites);
  return (
    <div className="Dash">
      <div className="notifications invitees">
        <div className="sideNav">
          <SideNav />
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="main">
            <h1>Invites</h1>

            {invites?.length > 0 ? (
              <ul className="invites noti">
                {invites.map((invite) => (
                  <li key={invite.$id}>
                    <p>Title: {invite.title}</p>
                    <p>Message: {invite.message}</p>
                    {/* Add other properties as needed */}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="noEvent">
                <p>No invites available.</p>
                <img src={noEvent} alt="noEvent imag" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Invites;
