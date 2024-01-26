import React, { useEffect, useState } from "react";
import {
  Collection_Id,
  Database_Id,
  databases,
  account,
  storageBucket,
  EventBucket_Id,
  Project_Id,
} from "../../appwrite/appWriteConfig";
import { AppwriteException } from "appwrite";
import "../../sass/createaddEvent.scss";
// import { X } from "@phosphor-icons/react/dist/ssr";
import { Laptop, MapPin } from "@phosphor-icons/react";
import { Link, useLocation } from "react-router-dom";
import SideNav from "../Dashboard/SideNav";
import Loader2 from "../../Loader/Loader2";
import rsvpimg from "../../assets/norsvp.gif";
import UpdateEvent from "./UpdateEvent";

const AddedEvents = ({ uploadedFile, onClose, onCardClick }) => {
  const location = useLocation();
  const [eventDocuments, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const getEventAdded = async () => {
    try {
      const user = await account.getSession("current");

      if (user) {
        const allEventDocuments = await databases.listDocuments(
          Database_Id,
          Collection_Id
        );

        const userEvents = allEventDocuments.documents
          .filter((document) => document.creatorUserId === user.userId)
          .reverse(); // Reverse the order of events;

        console.log("User events:", userEvents);

        setDocuments([...userEvents]);
      } else {
        console.log("User not logged in");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      throw new AppwriteException(error.message);
    } finally {
      setLoading(false);
    }
  };
  console.log("event documents", eventDocuments);

  useEffect(() => {
    getEventAdded();
    if (location.state && location.state.updatedEvent) {
      // Handle the updated event details as needed
      const updatedEvent = location.state.updatedEvent;
      console.log("Updated Event:", updatedEvent);
      // Move this log statement inside the map function
      // console.log("File ID:", document.updatedEvent.eventImage);
    } else {
      console.log("NOT FOUND");
    }
  }, [location.state]);

  console.log("Location State:", location.state);

  // const handleClose = () => {
  //   onClose(); // Call the onClose function to close the component
  // };
  // const handleCardClick = (eventId) => {
  //   onCardClick(eventId);
  //   console.log("card clicked", eventId);
  // };
  // console.log("File ID:", location.state.updatedEvent.eventImage);

  return (
    <div className="Dash">
      <div className="mapped">
        <div className="sidenav">
          <SideNav />
        </div>
        {loading ? (
          <Loader2 />
        ) : (
          <div className="other_side">
            <div className="heading">
              <h1>My Events</h1>
              {/* <button onClick={handleClose}>
            <X className="icon_x" />
          </button> */}
            </div>

            <div key={eventDocuments.$id} className="each_event">
              {eventDocuments.length === 0 ? (
                <div className="noevent">
                  <p>No Events Found</p>
                  <div className="addevent_img">
                    <img src={rsvpimg} alt="" />
                  </div>
                </div>
              ) : (
                eventDocuments.map((document) => (
                  <Link key={document.$id} to={`/edit-event/${document.$id}`}>
                    <div
                      className="mapped_event"
                      // onClick={() => handleCardClick("editevent")}
                    >
                      {/* <div className="addevent_img">
                      {(
                        <img
                          src={`https://cloud.appwrite.io/v1/storage/buckets/657ca5c1b97d85e735d0/files/${document.eventImage}/view?project=656f89964f0ca3d8368e&mode=admin`}
                          alt=""
                        />
                      ) || (
                        <img
                          src={`https://cloud.appwrite.io/v1/storage/buckets/657ca5c1b97d85e735d0/files/65903a9e4d3b0b3f024a/view?project=656f89964f0ca3d8368e&mode=admin`}
                        />
                      )}
                    </div> */}
                      {/* <div className="addevent_img">
                      {document.eventImage && (
                        <img
                          src={storageBucket.getFilePreview(
                            EventBucket_Id,
                            document.eventImage
                          )}
                          alt=""
                        />
                      )}
                    </div> */}

                      {/* <div className="addevent_img">
                      {document.eventImage && (
                        <img
                          src={
                            typeof document.eventImage === "string"
                              ? document.eventImage.startsWith("https://")
                                ? document.eventImage
                                : storageBucket.getFilePreview(
                                    EventBucket_Id,
                                    document.eventImage
                                  )
                              : storageBucket.getFilePreview(
                                  EventBucket_Id,
                                  document.eventImage.$id
                                )
                          }
                          alt=""
                        />
                      )}
                      {location.state?.updatedEvent?.eventImage && (
                        <img
                          src={
                            location.state.updatedEvent.eventImage.startsWith(
                              "https://"
                            )
                              ? location.state.updatedEvent.eventImage
                              : storageBucket.getFilePreview(
                                  EventBucket_Id,
                                  location.state.updatedEvent.eventImage
                                )
                          }
                          alt=""
                        />
                      )}
                    </div> */}

                      <div className="addevent_img">
                        {(document.eventImage && (
                          <img
                            src={
                              typeof document.eventImage === "string"
                                ? document.eventImage.startsWith("https://")
                                  ? document.eventImage
                                  : `https://cloud.appwrite.io/v1/storage/buckets/657ca5c1b97d85e735d0/files/${document.eventImage}/view?project=656f89964f0ca3d8368e&mode=admin`
                                : `https://cloud.appwrite.io/v1/storage/buckets/657ca5c1b97d85e735d0/files/${document.eventImage.$id}/view?project=656f89964f0ca3d8368e&mode=admin`
                            }
                            alt=""
                          />
                        )) ||
                          (location.state?.updatedEvent?.eventImage && (
                            <img
                              src={
                                location.state.updatedEvent.eventImage.startsWith(
                                  "https://"
                                )
                                  ? location.state.updatedEvent.eventImage
                                  : `https://cloud.appwrite.io/v1/storage/buckets/657ca5c1b97d85e735d0/files/${location.state.updatedEvent.eventImage}/view?project=657c3799c6f17860adb1&mode=admin`
                              }
                              // https://cloud.appwrite.io/v1/storage/buckets/657ca5c1b97d85e735d0/files/6590290b5fb8cf5e6350/view?project=656f89964f0ca3d8368e&mode=admin
                              alt=""
                            />
                          ))}
                      </div>

                      <div className="mapped_details">
                        <h1>{document.eventName}</h1>
                        <h4>{document.eventDescription}</h4>

                        <p>
                          Start Date:{" "}
                          {new Date(document.startDate).toDateString()},
                          <span>
                            {" "}
                            {new Date(document.startDate).toLocaleTimeString()}
                          </span>
                        </p>
                        <p>
                          End Date: {new Date(document.endDate).toDateString()},
                          <span>
                            {" "}
                            {new Date(document.endDate).toLocaleTimeString()}
                          </span>
                        </p>
                        <h6 className="catte">Category: {document.Category}</h6>
                        {/* <h1>Creator User ID: {document.creatorUserId}</h1>
          <p>{document.$id}</p> */}
                        <p className="medium">
                          {document.Medium === "In Person" ? (
                            <MapPin className="icon" />
                          ) : (
                            <Laptop className="icon" />
                          )}
                        </p>
                        <p>privacy: {document.Privacy}</p>
                        <p>RSVP: {document.RSVP}</p>
                        <p>Tickets: {document.Tickets}</p>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddedEvents;
