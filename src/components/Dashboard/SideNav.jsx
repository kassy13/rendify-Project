import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import {
  BookmarkSimple,
  Calendar,
  ShareNetwork,
  User,
} from "@phosphor-icons/react/dist/ssr";
import logoimg from "../../assets/rendify_rbg.png";
import { House, Notification } from "@phosphor-icons/react";

const SideNav = () => {
  const { logoutUser, user } = useAuth();
  const [selectedLink, setSelectedLink] = useState(false);
  const [userRsvps, setUserRsvps] = useState([]);

  //   const handleLinkClose = () => {
  //     setSelectedLink("dashboard");
  //   };
  const handleLinkClick = (link) => {
    setSelectedLink(link);

    console.log(link, "clicked");
  };
  return (
    <div className="dashboard">
      <nav className="nav">
        <div className="nav_links">
          {/* <Link to="/">Home</Link> */}
          <div className="dash_img">
            <Link to={"/"}>
              <img src={logoimg} alt="" />
            </Link>
          </div>
          <Link
            to={"/dashboard"}
            className="link"
            onClick={() => handleLinkClick("addevents")}
          >
            <House /> Home
          </Link>
          <Link
            to={"/dashboard/addevents"}
            className="link"
            onClick={() => handleLinkClick("addevents")}
          >
            <Calendar /> Events
          </Link>
          <Link to="invites" className="link">
            {" "}
            <ShareNetwork /> Invites
          </Link>
          <Link
            to={"/dashboard/rsvp"}
            onClick={() => handleLinkClick("rsvp")}
            state={{ eventDetails: userRsvps }}
            className="link"
          >
            <BookmarkSimple /> RSVPs
          </Link>
          <Link to="/notifications" className="link">
            <Notification /> Notifications
          </Link>
        </div>
        <div className="down_bar">
          <div>
            <Link
              onClick={() => handleLinkClick("profile")}
              className="flex gap-3 items-center person"
            >
              <User /> {user.name}
            </Link>
          </div>
          <div className="create">
            <button className="button logout btn" onClick={logoutUser}>
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SideNav;
