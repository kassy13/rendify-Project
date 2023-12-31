import { useEffect, useState } from "react";
import {
  databases,
  Database_Id,
  Collection_Id,
} from "../../appwrite/appWriteConfig";
import { useNavigate, useParams } from "react-router-dom";
import { Copy, Pen, Share, Trash } from "@phosphor-icons/react";
import SideNav from "../Dashboard/SideNav";
import "../../sass/createaddEvent.scss";
import { toast } from "react-toastify";
import rsvpimg from "../../assets/norsvp.gif";
import Loader2 from "../../Loader/Loader2";

const EditEvent = () => {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // console.log("Event ID:", eventId);
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await databases.getDocument(
          Database_Id,
          Collection_Id,
          eventId
        );
        setEventDetails(response);
      } catch (error) {
        console.error("Error fetching event details:", error);
      } finally {
        setLoading(true);
      }
    };

    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId]);
  // if (!loading) {
  //   return (
  //     <div className="loader">
  //       <Loader2 />
  //     </div>
  //   );
  // }

  const copyEventIdToClipboard = () => {
    if (eventDetails) {
      navigator.clipboard.writeText(eventDetails.$id);
      toast.success("Event Id Copied");
    }
  };
  const handleDeleteEvent = async (e, id) => {
    e.preventDefault();
    try {
      await databases.deleteDocument(Database_Id, Collection_Id, id);

      toast.success("Event Deleted");

      navigate("/dashboard/addevents");
      console.log(id);
    } catch (error) {
      toast.error("Error deleting Event");
      console.error("Error deleting Event", error);
    }
    setShowDeleteModal(false);
  };
  const toggleDeleteModal = () => {
    setShowDeleteModal((prevState) => !prevState);
  };
  const handleEditEvent = async (e, id) => {
    e.preventDefault();
    console.log("handleedit", id);

    navigate("/dashboard/updateevent", { state: { eventDetails } });
  };

  return (
    <div className="edit-event">
      <div className="sidenav">
        <SideNav />
      </div>
      {!loading ? (
        <Loader2 />
      ) : (
        <div className="other_side">
          <div className="otherside_card">
            <div className="otherside_img">
              <img
                src={`https://cloud.appwrite.io/v1/storage/buckets/657ca5c1b97d85e735d0/files/${eventDetails.eventImage}/view?project=656f89964f0ca3d8368e&mode=admin`}
                alt=""
              />
            </div>
            <div className="textt">
              <p>Event Name: {eventDetails.eventName}</p>
              <p> category :{eventDetails.Category} </p>
              <p>Privacy: {eventDetails.Privacy}</p>
              <p>
                Start Date: {new Date(eventDetails.startDate).toDateString()},
                <span>
                  {" "}
                  {new Date(eventDetails.startDate).toLocaleTimeString()}
                </span>
              </p>
              <p>
                End Date: {new Date(eventDetails.endDate).toDateString()},
                <span>
                  {" "}
                  {new Date(eventDetails.endDate).toLocaleTimeString()}
                </span>
              </p>
            </div>
          </div>

          <div className="actions">
            <button
              className="btn"
              onClick={(e) => handleEditEvent(e, eventDetails.$id)}
            >
              <p>
                Edit <Pen />
              </p>
            </button>
            <button className="btn" onClick={toggleDeleteModal}>
              <p>
                Delete <Trash />
              </p>
            </button>
            <button className="btn" onClick={copyEventIdToClipboard}>
              <p>
                Copy Id <Copy />
              </p>
            </button>
            <button className="btn">
              <p>
                Invite <Share />
              </p>
            </button>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this event?</p>
            <div className="modal-buttons">
              <button className="btn" onClick={toggleDeleteModal}>
                Cancel
              </button>
              <button
                className="btn"
                onClick={(e) => handleDeleteEvent(e, eventDetails.$id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditEvent;
