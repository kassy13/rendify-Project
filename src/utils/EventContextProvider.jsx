import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { clientContentful } from "../Contentful/client";

const EventContex = createContext();

export const EventContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const [event, setEvent] = useState();
  const [loading, setLoading] = useState(false);

  const cleanupEventDetails = useCallback((rawData) => {
    const cleanEventDetails = rawData.map((detail) => {
      const { sys, fields } = detail;
      const { id } = sys;
      const eventName = fields.eventName.content[0].content[0].value;
      const eventCategory = fields.category;
      const eventDate = fields.eventDate;
      const eventDescription = fields.eventDescription;
      const eventImage = fields.eventImage.fields.file.url;
      const eventLocation = fields.eventLocation;
      const rsvp = fields.rsvp;
      const tickets = fields.tickets;
      const price = fields.price;
      const priceId = fields.priceId;
      const { lat, lon } = fields.eventCoordinates;

      const updatedDetails = {
        id,
        eventName,
        eventCategory,
        eventDate,
        eventDescription,
        eventImage,
        eventLocation,
        rsvp,
        tickets,
        price,
        priceId,
        eventCoord: { lat, lon },
        loading,
      };
      return updatedDetails;
    });
    setEvent(cleanEventDetails);
  }, []);

  const getEventDeatails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await clientContentful.getEntries({
        content_type: "allEvents",
      });
      const responseData = response.items;
      console.log(responseData);

      if (responseData) {
        cleanupEventDetails(responseData);
      } else {
        setEvent([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [cleanupEventDetails]);

  useEffect(() => {
    getEventDeatails();
  }, [getEventDeatails]);

  // Pagination Logic here
  const getPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return event.slice(startIndex, endIndex);
  };

  const totalPages = event ? Math.ceil(event.length / itemsPerPage) : 1;

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // filtering logic here
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const allCategories = [...new Set(event?.map((e) => e.eventCategory))];
    setCategories(allCategories);
  }, [event]);

  const contextData = {
    event,
    setEvent,
    getEventDeatails,
    cleanupEventDetails,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    categories,

    // setCategories,
  };
  console.log(categories);
  return (
    <EventContex.Provider value={contextData}>
      {/* {loading ? <Loader /> : children} */}
      {children}
    </EventContex.Provider>
  );
};
// Custom Hook
export const useEvent = () => {
  return useContext(EventContex);
};
export default EventContex;

// export default EventContextprovider;
