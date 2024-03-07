// import React from "react";
// import "../../custom css/Updates.css";
// import { UpdatesData } from "../../Data/Data";
// import { useAuth } from "../../utils/AuthContext";
// const Updates = () => {
//   const { user } = useAuth();

//   return (
//     <div className="Updates">
//       {UpdatesData.map((update) => {
//         return (
//           <div className="update" key={update.name}>
//             <img src={update.img} alt="" />
//             {/* <div className="noti">
//               <div style={{ marginBottom: "0.5rem" }}></div>
//             </div> */}
//             <div className="note">
//               <span>
//                 <span>{update.name}</span>
//                 <span> {update.noti}</span>
//               </span>

//               <span> {update.time}</span>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Updates;

import React, { useState, useEffect } from "react";
import "../../custom css/Updates.css";
import { useAuth } from "../../utils/AuthContext";
import {
  databases,
  Database_Id,
  inviteCollectionId,
  EventBucket_Id,
  storageBucket,
} from "../../appwrite/appWriteConfig";
import Loader2 from "../../Loader/Loader2";

const Updates = () => {
  const { user } = useAuth();
  const [invites, setInvites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInvites = async () => {
      try {
        const response = await databases.listDocuments(
          Database_Id,
          inviteCollectionId
        );
        console.log(response);
        const userInvites = response.documents.filter(
          (invite) => invite.receiverId === user.$id
        ); // Sort invites by time (assuming there is a 'time' field)
        const sortedInvites = userInvites.sort((a, b) => b.time - a.time);

        // Set only the two latest invites
        setInvites(sortedInvites.slice(0, 2));
      } catch (error) {
        console.error("Error fetching invites:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvites();
  }, [user]);

  console.log(invites);
  return (
    <div className="Updates">
      {invites.map((invite) => (
        <div className="update" key={invite.$id}>
          {isLoading && <Loader2 />}
          <img src="/src/assets/rendify logo.png" alt="Rendify" />
          <div className="note">
            <span>
              <span>{invite.name}</span>
              <span>
                {" "}
                {invite.message.slice(0, 100)}
                {invite.message.length > 100 ? "..." : ""}
              </span>
            </span>
            <span> {invite.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Updates;
