import { useCallback, useEffect, useState } from "react";
// import "../../sass/Dashboard.scss";
import "../../sass/createaddEvent.scss";
// import Loader from "../../Loader/Loader";
import {
  Collection_Id,
  Database_Id,
  EventBucket_Id,
  ID,
  Project_Id,
  account,
  databases,
  notiClient,
  storageBucket,
  // storage,
} from "../../appwrite/appWriteConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../utils/AuthContext";
import { X } from "@phosphor-icons/react";
import Loader2 from "../../Loader/Loader2";
import { Client } from "appwrite";
import SideNav from "../Dashboard/SideNav";
import "../../sass/btn.scss";

const CreateEvent = ({ onClose }) => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [createEvent, setcreateEvent] = useState({
    Category: "disabled",
    // startDate: null,
    // endDate: null,
    startDate: "", // Initialize startDate with an empty string
    endDate: "", // Initialize endDate with an empty string
    eventName: "",
    eventDescription: "",
    eventImage: null,
    Tickets: "disabled",
    Privacy: "disabled",
    RSVP: "disabled",
    Medium: "disabled",
    Participants: null,
  });

  const [formEventImage, setFormEventImage] = useState({
    eventImage: null,
  });
  const [loading, setLoading] = useState(false);

  const [notifications, setNotifications] = useState([]);

  const showNotification = useCallback(
    (title, message, eventDetails) => {
      console.log("Notification triggered:", title, message, eventDetails);
      const newNotification = {
        title,
        message,
        eventDetails,
        timestamp: new Date(),
      };
      setNotifications([...notifications, newNotification]);
    },
    [notifications]
  );

  useEffect(() => {
    // Retrieve the user's unique identifier from local storage
    const userId = localStorage.getItem("userId");

    // Check if userId is not null before setting the user state
    if (userId) {
      setUser({
        $id: userId,
      });
    }

    // For Notifications
  }, [setUser, showNotification]);

  //   To create and add events attrivutes to the database
  // const addNewEvent = async (e) => {
  //   e.preventDefault();

  //   setLoading(true);

  //   try {
  //     const userSession = await account.getSession("current");

  //     if (userSession) {
  //       const uploadedFile = await uploadFile(formEventImage.eventImage);
  //       const fileId = uploadedFile["$id"];
  //       // Use the fileId in your database document or wherever it's needed
  //       console.log("uploaded dile ID", fileId);
  //       // console.log("Uploaded File ID:", uploadedFile);
  //       // const fileUrl = `https://cloud.appwrite.io/v1/storage/buckets/${EventBucket_Id}/files/${uploadedFile.fileId}/view?project=${Database_Id}`;

  //       // Preview the file
  //       const previewResult = await storageBucket.getFilePreview(
  //         EventBucket_Id,
  //         fileId
  //       );
  //       console.log("File Preview Result:", previewResult);

  //       const response = await databases.createDocument(
  //         Database_Id,
  //         Collection_Id,
  //         ID.unique(),
  //         {
  //           startDate: Date.now(),
  //           endDate: Date.now(),
  //           ...createEvent,
  //           eventImage: fileId, // Use the userId from the session
  //           creatorUserId: userSession.userId,
  //           // eventImage: uploadedFile.fileId,
  //           // Category: createEvent.Category,
  //           // Tickets: createEvent.Tickets,
  //           // Privacy: createEvent.Privacy,
  //           // RSVP: createEvent.RSVP,
  //           // Medium: createEvent.Medium,
  //         }
  //       );
  //       console.log("uploaded file", uploadedFile);
  //       console.log("Event created:", response);
  //       toast.success("Event created successfully");
  //       navigate("/addevents");
  //       setLoading(false);
  //     } else {
  //       console.log("User not logged in");
  //       // Handle anonymous user case if needed
  //     }
  //   } catch (error) {
  //     console.error("Error creating event:", error);
  //     toast.error("Error creating event");
  //     setLoading(false);
  //   }
  // };

  // SHowing the notification function
  // function showNotification(title, message) {
  //   const newNotification = { title, message, timestamp: new Date() };
  //   setNotifications([...notifications, newNotification]);
  // }

  const addNewEvent = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const userSession = await account.getSession("current");

      if (userSession) {
        // Upload the file
        const uploadedFile = await uploadFile(formEventImage.eventImage);
        const fileId = uploadedFile.fileId;

        // Check if the file upload was successful
        if (!fileId) {
          console.error("File upload failed");
          toast.error("File upload failed");
          setLoading(false);
          return;
        }

        // Instead of directly setting file ID, construct the file URL
        const fileUrl = `https://cloud.appwrite.io/v1/storage/buckets/${EventBucket_Id}/files/${fileId}/view?project=${Project_Id}`;

        // Create the event document with the file URL
        const response = await databases.createDocument(
          Database_Id,
          Collection_Id,
          ID.unique(),
          {
            startDate: Date.now(),
            endDate: Date.now(),
            ...createEvent,
            // eventImage: uploadedFile.$id, // Use the file URL
            eventImage: fileUrl,
            creatorUserId: userSession.userId,
          }
        );

        console.log("Event created:", response);

        // Pass event details to showNotification
        showNotification("Event Created", "A new event has been created!", {
          eventName: createEvent.eventName,
          startDate: createEvent.startDate,
          endDate: createEvent.endDate,

          // Add other event details as needed
        });

        toast.success("Event created successfully");
        navigate("/addevents");
        setLoading(false);
      } else {
        console.log("User not logged in");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Error creating event");
      setLoading(false);
    }
  };

  // console.log("createEvent:", createEvent);

  const handleCreateClose = () => {
    onClose();
  };
  // For uploading an image
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("Selected File:", selectedFile);
    if (selectedFile) {
      setFormEventImage({
        eventImage: selectedFile,
      });
    }
  };

  const uploadFile = async (file) => {
    console.log("File object:", file);

    try {
      const result = await storageBucket.createFile(
        EventBucket_Id,
        ID.unique(),
        file
      );

      console.log("Upload Result:", result);

      const fileId = result["$id"];

      if (!fileId) {
        console.error("File upload failed");
        throw new Error("File upload failed");
      }

      console.log("File ID:", fileId);

      return { fileId, file };
    } catch (error) {
      console.error("File upload failed", error);
      throw new Error("File upload failed");
    }
  };

  return (
    <div className="create_event_container Dash">
      {loading ? (
        <Loader2 />
      ) : (
        <div className="eventCont">
          <div className="sidenav">
            <SideNav />
          </div>
          <div className="create_event DashGlass">
            <button onClick={handleCreateClose} className="close">
              <X />
            </button>
            <h2>Create Event</h2>
            <form
              className="form"
              onSubmit={(e) => {
                e.preventDefault();
                addNewEvent(e);
              }}
            >
              <div className="inp">
                <label>
                  Title <span>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter Event Title"
                  onChange={(e) => {
                    setcreateEvent({
                      ...createEvent,
                      eventName: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="inp">
                <label htmlFor="Description">
                  Description <span>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter Event Description"
                  onChange={(e) => {
                    setcreateEvent({
                      ...createEvent,
                      eventDescription: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="mode">
                <div className="privacy">
                  <label htmlFor="Privacy">
                    Privacy <span>*</span>
                  </label>
                  <select
                    name="Privacy"
                    id=""
                    required
                    value={createEvent.Privacy}
                    onChange={(e) =>
                      setcreateEvent({
                        ...createEvent,
                        Privacy: e.target.value,
                      })
                    }
                  >
                    <option value="disabled" disabled>
                      Choose from the options
                    </option>

                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                  </select>
                </div>
                <div className="medium ">
                  <label htmlFor="medium">
                    Medium <span>*</span>
                  </label>
                  <select
                    name="Medium"
                    id=""
                    required
                    value={createEvent.Medium}
                    onChange={(e) =>
                      setcreateEvent({ ...createEvent, Medium: e.target.value })
                    }
                  >
                    <option value="disabled" disabled>
                      Choose from the options
                    </option>

                    <option value="Online">Online</option>
                    <option value="In Person">In Person</option>
                  </select>
                </div>
              </div>
              <div className="date">
                <div className="date-time inp">
                  <label htmlFor="Start Date Time">
                    Start Date Time <span>*</span>
                  </label>
                  <input
                    type="date"
                    required
                    // Set min attribute to today's date
                    min={new Date().toISOString().split("T")[0]}
                    value={createEvent.startDate} // Bind value to createEvent.startDate
                    onChange={(e) => {
                      setcreateEvent({
                        ...createEvent,
                        startDate: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="date-time inp">
                  <label htmlFor="End Date Time">
                    End Date Time <span>*</span>
                  </label>
                  <input
                    type="date"
                    required
                    // Set min attribute to today's date
                    min={new Date().toISOString().split("T")[0]}
                    value={createEvent.startDate} // Bind value to createEvent.startDate
                    onChange={(e) => {
                      setcreateEvent({
                        ...createEvent,
                        endDate: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="date">
                <div className="inp">
                  <label htmlFor="Duration">Duration</label>
                  <input type="text" placeholder="Enter Event Duration" />
                </div>
                <div className="inp">
                  <label>Max Participants</label>
                  <input
                    type="number"
                    onChange={(e) => {
                      setcreateEvent({
                        ...createEvent,
                        Participants: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>

              <div className="modee">
                <div className="category">
                  <label htmlFor="">
                    Category <span>*</span>
                  </label>
                  <select
                    name="Category"
                    id=""
                    required
                    value={createEvent.Category}
                    onChange={(e) =>
                      setcreateEvent({
                        ...createEvent,
                        Category: e.target.value,
                      })
                    }
                  >
                    <option value="disabled" disabled>
                      Choose from the categories
                    </option>

                    <option value="Conference">Conference</option>
                    <option value="Music & Arts">Music & Arts</option>
                    <option value="Social">Social</option>
                    <option value="Sports">Sports</option>
                    <option value="Networking">Networking</option>
                    <option value="Wellness & Lifestyle">
                      Wellness & Lifestyle
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="accept">
                  <label htmlFor="rsvp"> Accepting RSVPs?</label>
                  <select
                    name="RSVP"
                    id=""
                    required
                    value={createEvent.RSVP}
                    onChange={(e) =>
                      setcreateEvent({ ...createEvent, RSVP: e.target.value })
                    }
                  >
                    <option value="disabled" disabled>
                      Choose from the options
                    </option>

                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="ticket">
                  <label htmlFor="ticket">
                    Tickets <span>*</span>
                  </label>
                  <select
                    name="Tickets"
                    id=""
                    value={createEvent.Tickets}
                    required
                    onChange={(e) =>
                      setcreateEvent({
                        ...createEvent,
                        Tickets: e.target.value,
                      })
                    }
                  >
                    <option value="disabled" disabled>
                      Choose any of the options
                    </option>

                    <option value="Free">Free</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>
              </div>
              <div className="inp textarea">
                <label htmlFor="Terms">Terms and Conditions</label>
                {/* <input type="text" /> */}
                <textarea name="" id=""></textarea>
              </div>
              <div className="inp">
                <label htmlFor="Terms">
                  Location <span>*</span>
                </label>
                <input type="text" placeholder="Enter Location " required />
              </div>
              <div className="inp file">
                <label>
                  Select FIle <span>*</span>
                </label>
                <input
                  type="file"
                  id="eventImage"
                  name="eventImage"
                  accept="image"
                  onChange={handleImageChange}
                />
              </div>

              <button type="submit" className="btn">
                Add Event
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateEvent;
