import React, { useEffect, useState } from "react";
import SideNav from "../Dashboard/SideNav";
import Loader2 from "../../Loader/Loader2";
import {
  Collection_Id,
  Database_Id,
  EventBucket_Id,
  ID,
  databases,
  storageBucket,
} from "../../appwrite/appWriteConfig";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../sass/createaddEvent.scss";

const UpdateEvent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const eventDetails = location.state?.eventDetails;
  const [loading, setLoading] = useState(false);
  const [formEventImage, setFormEventImage] = useState({
    eventImage: null,
  });

  const [updatedEventDetails, setUpdatedEventDetails] = useState({
    // Initialize with the existing event details

    eventName: "",
    Category: "",
    Location: "",
    eventDescription: "",
    Participants: "",
    // Add more attributes as needed
    startDate: "",
    endDate: "",
    eventImage: eventDetails?.eventImage || "",
    Tickets: "",
    Privacy: "",
    RSVP: "",
    Medium: "",
  });
  //   console.log(eventDetails);
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("Selected File:", selectedFile);
    if (selectedFile) {
      setFormEventImage({
        eventImage: selectedFile,
      });
      // This will show the selected file name in the input
    }
  };

  const updateFile = async (fileId, file) => {
    try {
      const fileName = file.name;
      const result = await storageBucket.updateFile(
        EventBucket_Id,
        fileId,
        fileName
      );

      const fileUrl = result["$id"];
      return { fileUrl, fileId };
    } catch (error) {
      console.error("File update failed", error);
      throw new Error("File update failed");
    }
  };

  useEffect(() => {
    // Initialize state with existing event details when eventDetails changes
    if (eventDetails) {
      setUpdatedEventDetails({
        // Initialize with the existing event details
        eventName: eventDetails?.eventName || "",
        Category: eventDetails?.Category || "",
        // Location: eventDetails?.eventCoordinates || "",
        eventDescription: eventDetails?.eventDescription || "",
        Participants: eventDetails?.Participants || "",
        // Add more attributes as needed
        startDate: eventDetails?.startDate || "",
        endDate: eventDetails?.endDate || "",
        eventImage: eventDetails?.eventImage || "",
        Tickets: eventDetails?.Tickets || "",
        Privacy: eventDetails?.Privacy || "",
        RSVP: eventDetails?.RSVP || "",
        Medium: eventDetails?.Medium || "",
      });
    }
  }, [eventDetails]);
  console.log("event details", eventDetails);
  console.log("updated event details", updatedEventDetails);

  //   Handling the updating of events and images
  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let fileUrl = updatedEventDetails.eventImage;
      console.log("file url", fileUrl);
      // Step 1: Upload New Image to Storage Bucket
      if (formEventImage.eventImage) {
        const result = await storageBucket.createFile(
          EventBucket_Id,
          ID.unique(),
          formEventImage.eventImage
        );

        const fileId = result["$id"];
        setUpdatedEventDetails({
          ...updatedEventDetails,
          eventImage: fileUrl,
        });

        const updatedImages = await storageBucket.listFiles(EventBucket_Id);

        console.log("updated images", updatedImages);

        console.log("update event result", result);
        console.log(fileId);
        fileUrl = `https://cloud.appwrite.io/v1/storage/buckets/657ca5c1b97d85e735d0/files/${fileId}/view?project=656f89964f0ca3d8368e&mode=admin`;
      }
      console.log("formevent image", formEventImage);

      // Step 2: Update Document with New Image URL
      await databases.updateDocument(
        Database_Id,
        Collection_Id,
        eventDetails.$id,
        {
          ...updatedEventDetails,
          //   eventImage: fileUrl,
          eventImage: fileUrl,
        }
      );

      // Navigate to the added events page
      navigate("/dashboard/addevents", {
        state: { updatedEvent: updatedEventDetails },
      });

      toast.success("Event updated successfully");
    } catch (error) {
      toast.error("Error updating event", error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update_event Dash ">
      <div className="update">
        <div className="sidenav">
          <SideNav />
        </div>
        <div className="other_side DashGlass">
          <h1>Update Event</h1>
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateEvent(e);
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
                  setUpdatedEventDetails({
                    ...updatedEventDetails,
                    eventName: e.target.value,
                  });
                }}
                value={updatedEventDetails.eventName}
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
                  setUpdatedEventDetails({
                    ...updatedEventDetails,
                    eventDescription: e.target.value,
                  });
                }}
                value={updatedEventDetails.eventDescription}
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
                  onChange={(e) =>
                    setUpdatedEventDetails({
                      ...updatedEventDetails,
                      Privacy: e.target.value,
                    })
                  }
                  value={updatedEventDetails.Privacy}
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
                  onChange={(e) =>
                    setUpdatedEventDetails({
                      ...updatedEventDetails,
                      Medium: e.target.value,
                    })
                  }
                  value={updatedEventDetails.Medium || ""}
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
                  onChange={(e) => {
                    setUpdatedEventDetails({
                      ...updatedEventDetails,
                      startDate: e.target.value,
                    });
                  }}
                  value={updatedEventDetails.startDate}
                />
              </div>
              <div className="date-time inp">
                <label htmlFor="End Date Time">
                  End Date Time <span>*</span>
                </label>
                <input
                  type="date"
                  required
                  onChange={(e) => {
                    setUpdatedEventDetails({
                      ...updatedEventDetails,
                      endDate: e.target.value,
                    });
                  }}
                  value={updatedEventDetails.endDate}
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
                    setUpdatedEventDetails({
                      ...updatedEventDetails,
                      Participants: e.target.value,
                    });
                  }}
                  value={updatedEventDetails.Participants}
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
                  onChange={(e) =>
                    setUpdatedEventDetails({
                      ...updatedEventDetails,
                      Category: e.target.value,
                    })
                  }
                  value={updatedEventDetails.Category || ""}
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
                  onChange={(e) =>
                    setUpdatedEventDetails({
                      ...updatedEventDetails,
                      RSVP: e.target.value,
                    })
                  }
                  value={updatedEventDetails.RSVP || ""}
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
                  required
                  onChange={(e) =>
                    setUpdatedEventDetails({
                      ...updatedEventDetails,
                      Tickets: e.target.value,
                    })
                  }
                  value={updatedEventDetails.Tickets || ""}
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
            {loading ? <Loader2 /> : ""}
            <button type="submit" className="btn" onClick={handleUpdateEvent}>
              Update Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateEvent;
