import React from "react";

const Notification = ({ notifications }) => {
  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications &&
          notifications.map((notification, index) => (
            <li key={index}>
              <strong>{notification.title}</strong>: {notification.message}
            </li>
          ))}
      </ul>
    </div>
  );
};

// const Notification = ({ notifications, onClick }) => {
//     const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

//     return (
//       <div>
//         <h2>
//           Notifications
//           {unreadNotificationsCount > 0 && (
//             <span className="badge">{unreadNotificationsCount}</span>
//           )}
//         </h2>
//         <ul>
//           {notifications &&
//             notifications.map((notification, index) => (
//               <li key={index} onClick={() => onClick(notification)}>
//                 <strong>{notification.title}</strong>: {notification.message}
//               </li>
//             ))}
//         </ul>
//       </div>
//     );
//   };

export default Notification;
