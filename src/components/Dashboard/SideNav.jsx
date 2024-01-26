// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../../utils/AuthContext";
// import {
//   BookmarkSimple,
//   Calendar,
//   ShareNetwork,
//   User,
// } from "@phosphor-icons/react/dist/ssr";
// import logoimg from "../../assets/rendify_rbg.png";
// import {
//   House,
//   HouseSimple,
//   Notification,
//   ShootingStar,
//   X,
// } from "@phosphor-icons/react";
// import "../../sass/SideNav.scss";
// import {
//   Database_Id,
//   databases,
//   inviteCollectionId,
// } from "../../appwrite/appWriteConfig";
// import Hamburger from "hamburger-react";
// import { TooltipComponent } from "@syncfusion/ej2-react-popups";

// const SideNav = () => {
//   const { logoutUser, user } = useAuth();
//   const [selectedLink, setSelectedLink] = useState(false);
//   const [userRsvps, setUserRsvps] = useState([]);
//   const [unreadNotifications, setUnreadNotifications] = useState(0); //state for managing the badge thingy

//   const [isOpen, setOpen] = useState(false);

//   const handleNavBarToggle = () => {
//     setOpen(!isOpen);
//   };

//   //   const handleLinkClose = () => {
//   //     setSelectedLink("dashboard");
//   //   };
//   const handleLinkClick = (link) => {
//     setSelectedLink(link);

//     console.log(link, "clicked");
//   };
//   const handleNotificationClick = () => {
//     // Handle the click event for notifications
//     // This function could include logic to mark notifications as read, navigate to the notifications page, etc.
//     console.log("Notification clicked");
//     // Add your logic here
//   };

//   useEffect(() => {
//     const fetchUnreadNotifications = async () => {
//       try {
//         // Fetch unread notifications count for the current user
//         const notifications = await databases.listDocuments(
//           Database_Id,
//           inviteCollectionId
//         );
//         setUnreadNotifications(notifications.documents.length);
//       } catch (error) {
//         console.error("Error fetching notifications:", error);
//       }
//     };
//     fetchUnreadNotifications();
//   }, []); // Empty dependency array ensures the effect runs once on component mount

//   return (
//     <div className="side_nav">
//       <nav className="nav">
//         <div className="nav_links">
//           {/* <Link to="/">Home</Link> */}
//           <div className="dash_img">
//             <Link to={"/"}>
//               <img src={logoimg} alt="" />
//             </Link>
//           </div>
//           <Link
//             to={"/dashboard"}
//             className="link"
//             onClick={() => handleLinkClick("addevents")}
//           >
//             <House /> Home
//           </Link>
//           <Link
//             to={"/dashboard/addevents"}
//             className="link"
//             onClick={() => handleLinkClick("addevents")}
//           >
//             <Calendar /> Events
//           </Link>
//           <Link to="/invites" className="link">
//
//             <ShareNetwork /> Invites
//           </Link>
//           <Link
//             to={"/dashboard/rsvp"}
//             onClick={() => handleLinkClick("rsvp")}
//             state={{ eventDetails: userRsvps }}
//             className="link"
//           >
//             <BookmarkSimple /> RSVPs
//           </Link>
//           <Link to="/notifications" className="link">
//             <Notification onClick={handleNotificationClick} />
//             Notifications
//             {unreadNotifications > 0 && (
//               <span className="notification-badge">{unreadNotifications}</span>
//             )}
//           </Link>
//         </div>
//         <div className="down_bar">
//           <div>
//             <Link
//               onClick={() => handleLinkClick("profile")}
//               className="flex gap-3 items-center person"
//             >
//               <User /> {user.name}
//             </Link>
//           </div>
//           <div className="create">
//             <button className="button logout btn" onClick={logoutUser}>
//               Logout
//             </button>
//           </div>
//         </div>
//       </nav>
//       {
//         // Mobile side nav
//       }
//       {isOpen && (
//         <>
//           <div>
//             <nav className="mobile_nav">
//               <div className="nav_links">
//                 {/* <Link to="/">Home</Link> */}
//                 <div className="dash_img">
//                   <Link to={"/"}>
//                     <img src={logoimg} alt="" />
//                   </Link>
//                 </div>
//                 <Link
//                   to={"/dashboard"}
//                   className="link"
//                   onClick={() => handleLinkClick("addevents")}
//                 >
//                   <House /> Home
//                 </Link>
//                 <Link
//                   to={"/dashboard/addevents"}
//                   className="link"
//                   onClick={() => handleLinkClick("addevents")}
//                 >
//                   <Calendar /> Events
//                 </Link>
//                 <Link to="/invites" className="link">
//                   {" "}
//                   <ShareNetwork /> Invites
//                 </Link>
//                 <Link
//                   to={"/dashboard/rsvp"}
//                   onClick={() => handleLinkClick("rsvp")}
//                   state={{ eventDetails: userRsvps }}
//                   className="link"
//                 >
//                   <BookmarkSimple /> RSVPs
//                 </Link>
//                 <Link to="/notifications" className="link">
//                   <Notification onClick={handleNotificationClick} />
//                   Notifications
//                   {unreadNotifications > 0 && (
//                     <span className="notification-badge">
//                       {unreadNotifications}
//                     </span>
//                   )}
//                 </Link>
//               </div>
//               <div className="down_bar">
//                 <div>
//                   <Link
//                     onClick={() => handleLinkClick("profile")}
//                     className="flex gap-3 items-center person"
//                   >
//                     <User /> {user.name}
//                   </Link>
//                 </div>
//                 <div className="create">
//                   <button className="button logout btn" onClick={logoutUser}>
//                     Logout
//                   </button>
//                 </div>
//               </div>
//             </nav>
//           </div>
//         </>
//       )}
//       <div className="hamburger">
//         <Hamburger
//           onToggle={handleNavBarToggle}
//           color="black
//         "
//           rounded
//         />
//       </div>
//     </div>
//   );
// };

// export default SideNav;

import React, { useEffect, useState } from "react";
import logoimg from "../../assets/rendify_rbg.png";
import "../../custom css/sideNav.css";
import { House } from "@phosphor-icons/react/dist/ssr";
import { Link, useLocation } from "react-router-dom";
import {
  BookmarkSimple,
  Calendar,
  HouseSimple,
  Notification,
  ShareNetwork,
  ShootingStar,
  SignOut,
  User,
} from "@phosphor-icons/react";
import { useAuth } from "../../utils/AuthContext";
import {
  Database_Id,
  databases,
  inviteCollectionId,
} from "../../appwrite/appWriteConfig";
import Hamburger from "hamburger-react";
import { motion } from "framer-motion";

const SideNav = ({ unreadCount }) => {
  const { logoutUser, user } = useAuth();
  const [selectedLink, setSelectedLink] = useState(false);
  const [userRsvps, setUserRsvps] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0); //state for managing the badge thingy

  const [isOpen, setOpen] = useState(false);
  const { pathname } = useLocation();
  const handleLinkClose = () => {
    setSelectedLink("dashboard");
  };
  const handleLinkClick = (link) => {
    setSelectedLink(link);

    console.log(link, "clicked");
  };
  const handleNotificationClick = () => {
    // Handle the click event for notifications
    // This function could include logic to mark notifications as read, navigate to the notifications page, etc.
    console.log("Notification clicked");
    // Add your logic here
    updateUnreadCount();
  };

  useEffect(() => {
    const fetchUnreadNotifications = async () => {
      try {
        // Fetch unread notifications count for the current user
        const notifications = await databases.listDocuments(
          Database_Id,
          inviteCollectionId
        );

        // Filter notifications relevant to the current user
        const userNotifications = notifications.documents.filter(
          (notification) => notification.receiverId === user.$id
        );

        // setUnreadNotifications(notifications.documents.length);
        setUnreadNotifications(userNotifications.length);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchUnreadNotifications();
  }, []); // Empty dependency array ensures the effect runs once on component mount

  // For switching between active links
  const handleLinkActive = (link) => {
    return pathname === link ? "active" : "";
  };

  const sideNavVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-55%",
    },
  };

  return (
    <>
      <div
        className="hamburger"
        style={isOpen ? { left: "55%" } : { left: "5%" }}
      >
        <Hamburger color="black" rounded onToggle={() => setOpen(!isOpen)} />
      </div>
      <motion.div
        className="SideNav"
        variants={sideNavVariants}
        animate={window.innerWidth <= 768 ? `${isOpen}` : ""}
      >
        {/* logo */}

        <div className="logo">
          <Link to={"/"} className="link">
            <img src={logoimg} alt="" />{" "}
          </Link>
        </div>
        {/* Menu */}

        <div className="nav_links menu">
          <Link
            to={"/dashboard"}
            className={`link links menuItem ${handleLinkActive("/dashboard")}`}
            // onClick={() => handleLinkClick("addevents")}
          >
            <House /> <span>Home</span>
          </Link>
          <Link
            to={"/dashboard/addevents"}
            className={`link menuItem ${handleLinkActive(
              "/dashboard/addevents"
            )}`}
            onClick={() =>
              handleLinkClick(`'/dashboard/addevents' || 'edit-event'`)
            }
          >
            <Calendar /> <span>Events</span>
          </Link>
          <Link
            to="/invites"
            className={`link menuItem ${handleLinkActive("invites")}`}
          >
            <ShareNetwork /> <span>Invites</span>
          </Link>
          <Link
            to={"/dashboard/rsvp"}
            onClick={() => handleLinkClick("rsvp")}
            state={{ eventDetails: userRsvps }}
            className={`link menuItem ${handleLinkActive("/dashboard/rsvp")}`}
          >
            <BookmarkSimple /> <span>RSVPs</span>
          </Link>
          <Link
            to="/notifications"
            className={`link menuItem ${handleLinkActive("/notifications")}`}
          >
            <Notification />
            <span>Notifications</span>

            {/* {unreadNotifications > 0 && <span>{unreadNotifications}</span>} */}
            {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
          </Link>
        </div>
        <div className="down_bar">
          <div>
            <Link
              onClick={() => handleLinkClick("profile")}
              className={`link menuItem lex gap-3 items-center person `}
            >
              <User />
              <span>{user.name}</span>
            </Link>
          </div>
          <div className="create">
            <button
              className="button logout btn btnlogout menuItem link"
              onClick={logoutUser}
            >
              <SignOut /> <span>Logout</span>
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default SideNav;
