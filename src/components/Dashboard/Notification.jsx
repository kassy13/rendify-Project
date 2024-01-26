// import { useEffect, useState } from "react";
// import {
//   Database_Id,
//   databases,
//   inviteCollectionId,
// } from "../../appwrite/appWriteConfig";
// import { useAuth } from "../../utils/AuthContext";
// import logoimg from "../../assets/lg-black.png";
// import "../../sass/Notification.scss";
// import SideNav from "./SideNav";
// import Loader2 from "../../Loader/Loader2";

// const Notification = ({ notifications }) => {
//   const { user } = useAuth();
//   const [getNotificationMessage, setGetNotificationMessage] = useState([]);
//   const [loading, setloading] = useState(true);
//   console.log(user);
//   const getnotificationMessage = async () => {
//     try {
//       const response = await databases.listDocuments(
//         Database_Id,
//         inviteCollectionId
//       );
//       console.log("response", response);
//       setGetNotificationMessage(response.documents);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setloading(false);
//     }
//   };

//   // Call the function on component mount
//   useEffect(() => {
//     getnotificationMessage();
//   }, []); // Empty dependency array ensures the effect runs once on component mount

//   console.log(getNotificationMessage);
//   // return (
//   //   <div>
//   //     <SideNav />

//   //     {getNotificationMessage.length > 0 ? (
//   //       <div className="notifications">
//   //         <div className="noti">
//   //           <h2>Notifications</h2>
//   //           <div className="noti_card">
//   //             <div className="noti_img">
//   //               <img src={logoimg} alt="" />
//   //             </div>
//   //             <ul>
//   //               {getNotificationMessage
//   //                 .filter(
//   //                   (notification) => notification.receiverId === user.$id
//   //                 )
//   //                 .map((notification, index) => (
//   //                   <li key={index}>{notification.message}</li>
//   //                 ))}
//   //             </ul>
//   //           </div>
//   //         </div>
//   //       </div>
//   //     ) : (
//   //       <p>No Invites yet</p>
//   //     )}
//   //   </div>
//   // );
//   console.log("user", user);
//   return (
//     <div className="Dash">
//       <div className="notifications">
//         <>
//           <div className="sideNav">
//             <SideNav />
//           </div>
//           {loading ? (
//             <Loader2 />
//           ) : (
//             <div className="noti">
//               <h2>Notifications</h2>
//               {getNotificationMessage.length > 0 ? (
//                 <div className="noti_card">
//                   <div className="noti_img">
//                     <img src={logoimg} alt="" />
//                   </div>
//                   <ul>
//                     {getNotificationMessage
//                       .filter(
//                         (notification) => notification.receiverId === user.$id
//                       )
//                       .map((notification, index) => (
//                         <li key={index}>{notification.message}</li>
//                       ))}
//                   </ul>
//                 </div>
//               ) : (
//                 <p>No Invites yet</p>
//               )}
//             </div>
//           )}
//         </>
//       </div>
//     </div>
//   );
// };

// export default Notification;

import React, { useEffect, useState } from "react";
import {
  Database_Id,
  databases,
  inviteCollectionId,
} from "../../appwrite/appWriteConfig";
import { useAuth } from "../../utils/AuthContext";
import logoimg from "../../assets/lg-black.png";
import "../../sass/Notification.scss";
import SideNav from "./SideNav";
import Loader2 from "../../Loader/Loader2";

const Notification = () => {
  const { user } = useAuth();
  const [getNotificationMessage, setGetNotificationMessage] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setloading] = useState(true);

  const getNotificationMessages = async () => {
    try {
      const response = await databases.listDocuments(
        Database_Id,
        inviteCollectionId
      );
      const notifications = response.documents;
      // Sort notifications so that unread ones come first
      const sortedNotifications = notifications.sort((a, b) => {
        if (a.read && !b.read) return 1;
        if (!a.read && b.read) return -1;
        return 0;
      });

      setGetNotificationMessage(sortedNotifications);
      // Calculate the unread count
      const unreadNotifications = sortedNotifications.filter(
        (notification) =>
          !notification.read && notification.receiverId === user.$id
      );
      setUnreadCount(unreadNotifications.length);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  // Call the function on component mount
  useEffect(() => {
    getNotificationMessages();
  }, []); // Empty dependency array ensures the effect runs once on component mount

  // Function to mark a notification as read
  const markAsRead = async (notificationId) => {
    try {
      // Implement the logic to update the read property in the database
      // For example:
      await databases.updateDocument(
        Database_Id,
        inviteCollectionId,
        notificationId,
        {
          read: true,
        }
      );

      // Update the unread count after marking as read
      // const updatedUnreadCount = unreadCount - 1;
      // setUnreadCount(updatedUnreadCount >= 0 ? updatedUnreadCount : 0);
      setUnreadCount((prevUnreadCount) =>
        prevUnreadCount > 0 ? prevUnreadCount - 1 : 0
      );
      // Move the marked notification to the bottom
      setGetNotificationMessage((prevNotifications) => {
        const updatedNotifications = prevNotifications.map((notification) =>
          notification.$id === notificationId
            ? { ...notification, read: true }
            : notification
        );
        return [
          ...updatedNotifications.sort((a, b) =>
            a.read ? 1 : b.read ? -1 : 0
          ),
        ];
      });
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <div className="Dash">
      <div className="notifications">
        <div className="sideNav">
          <SideNav unreadCount={unreadCount} />
        </div>
        {loading ? (
          <Loader2 />
        ) : (
          <div className="noti">
            <h2>Notifications</h2>
            {getNotificationMessage.length > 0 ? (
              <div className="noti_card">
                {/* <div className="noti_img">
                  <img src={logoimg} alt="" />
                </div> */}
                <ul className="messages">
                  {getNotificationMessage
                    .filter(
                      (notification) => notification.receiverId === user.$id
                    )
                    .map((notification, index) => (
                      <li key={index}>
                        <div className="noti_img">
                          <img src={logoimg} alt="" />
                        </div>
                        {notification.message}{" "}
                        {!notification.read && (
                          <button
                            className="btn"
                            onClick={() => markAsRead(notification.$id)}
                          >
                            Mark as Read
                          </button>
                        )}
                      </li>
                    ))}
                </ul>
                {/* {unreadCount > 0 && <p>Unread Notifications: {unreadCount}</p>} */}
              </div>
            ) : (
              <p>No Invites yet</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
