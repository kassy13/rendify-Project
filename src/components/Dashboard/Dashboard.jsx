import { useEffect, useState } from "react";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import {
  Collection_Id,
  Database_Id,
  avatars,
  databases,
  query,
  rsvpCollectionId,
  rsvpDatabaseId,
} from "../../appwrite/appWriteConfig";
import "../../sass/Dashboard.scss";
import CreateEvent from "../Events/CreateEvent";
// import logoimg from "../../assets/rendify_rbg.png";
// import {
//   BookmarkSimple,
//   Calendar,
//   ShareNetwork,
//   User,
// } from "@phosphor-icons/react/dist/ssr";
// import { Notification } from "@phosphor-icons/react";
import { BigHead } from "@bigheads/core";
// import AddedEvents from "../Events/AddedEvents";
// import Rsvp from "../Events/Rsvp";
// import Profile from "../Dashboard/Profile";
// import EditEvent from "../Events/EditEvent";
import SideNav from "./SideNav";

const Dashboard = () => {
  const navigate = useNavigate();
  const { logoutUser, user } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCreateClicked, setCreateClicked] = useState(false);
  const [userRsvps, setUserRsvps] = useState([]);
  const location = useLocation(); // Use useLocation hook
  const [selectedLink, setSelectedLink] = useState(false);
  // const [selectedEvent, setSelectedEvent] = useState(null); //for conditionally rendering the cards inside the addevent component on the dashboard
  const [selectedEventId, setSelectedEventId] = useState(null);

  useEffect(() => {
    console.log("Current user state:", user);

    const fetchUserAvatar = async () => {
      try {
        const storedAvatarUrl = localStorage.getItem(`avatar_${user.id}`);

        if (!storedAvatarUrl) {
          const avatarDetails = await BigHead({});
          const avatarUrl = avatarDetails.src;

          setAvatarUrl(avatarUrl);
          localStorage.setItem(`avatar_${user.id}`, avatarUrl);
        } else {
          setAvatarUrl(storedAvatarUrl);
        }
      } catch (error) {
        console.error("Error fetching or storing user avatar", error);
      }
    };

    const fetchUserRsvps = async () => {
      try {
        if (user) {
          const response = await databases.listDocuments(
            rsvpDatabaseId,
            rsvpCollectionId
          );
          setUserRsvps(response.documents || []);
        }
      } catch (error) {
        console.error("Error fetching user RSVPs:", error);
      }
    };

    if (user) {
      fetchUserAvatar();
      fetchUserRsvps();
    }

    // const intervalId = setInterval(() => {
    //   setCurrentTime(new Date());
    // }, 1000);

    // return () => clearInterval(intervalId);

    console.log("User state after effects:", user);
  }, [user, location.state, location.pathname]);

  if (!user) {
    return navigate("/login");
  }

  const handleCreateClick = () => {
    console.log("Before state change:", user);
    setCreateClicked(true);
    console.log("After state change:", user);
    // Handle create click
  };

  const handleCreateClose = () => {
    console.log("After state change", user);
    setCreateClicked(false);
  };

  const handleLinkClick = (link) => {
    setSelectedLink(link);

    console.log(link, "clicked");
  };

  const handleLinkClose = () => {
    setSelectedLink("dashboard");
  };

  const handleCardClick = (eventId) => {
    setSelectedEventId(eventId);
    console.log("selected event ID", eventId);
    setSelectedLink("editevent"); // Set the link to 'editevent' to render EditEvent component
  };

  return (
    <div className="dashboard">
      <SideNav />
      {isCreateClicked ? (
        <CreateEvent onClose={handleCreateClose} />
      ) : (
        <div className="main-content">
          <div className="header">
            <div className="flex gap-2 dash">
              <h1>Dashboard</h1>
              <span className="flex">
                <p>{currentTime.toLocaleTimeString()}</p>
                <p>{currentTime.toDateString()}</p>
              </span>
            </div>

            <div className="flex person  items-center gap-2 pb-6">
              <div className="avatar">
                <h3>
                  Welcome <span> {user.name}</span>{" "}
                </h3>

                <div className="avat">
                  <BigHead
                    body="chest"
                    clothing="shirt"
                    clothingColor="black"
                  />
                </div>
              </div>
            </div>

            <button className="button create btn" onClick={handleCreateClick}>
              Create Event
            </button>
          </div>

          {/* {(selectedLink === "addevents" && (
            <AddedEvents
              onClose={handleLinkClose}
              onCardClick={handleCardClick}
            />
          )) ||
            (selectedLink === "editevent" && selectedEventId && (
              <EditEvent eventId={selectedEventId} onClose={handleLinkClose} />
            )) ||
            (selectedLink === "rsvp" && <Rsvp onClose={handleLinkClose} />) ||
            (selectedLink === "profile" && (
              <Profile onClose={handleLinkClose} />
            ))} */}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
