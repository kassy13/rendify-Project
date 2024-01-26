import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  Database_Id,
  databases,
  rsvpCollectionId,
} from "../../appwrite/appWriteConfig";
import { useAuth } from "../../utils/AuthContext";
import SideNav from "../Dashboard/SideNav";
import "../../sass/createaddEvent.scss";
import Loader2 from "../../Loader/Loader2";
import rsvpimg from "../../assets/norsvp.gif";
import QRCode from "qrcode.react";
import QrReader from "react-qr-scanner";

const Rsvp = () => {
  const location = useLocation();
  console.log("Location:", location);
  const { id } = useParams();
  const { user } = useAuth();
  const [userRsvps, setUserRsvps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qrcodeData, setQrcodeData] = useState("");
  const [scannedData, setScannedData] = useState(null);
  const [showQrCodeModal, setShowQrCodeModal] = useState(false);

  useEffect(() => {
    const fetchUserRsvps = async () => {
      try {
        if (user) {
          const response = await databases.listDocuments(
            Database_Id,
            rsvpCollectionId
          );
          console.log("All RSVPs from Appwrite:", response.documents);
          const userRsvps = response.documents.filter(
            (rsvp) => rsvp.userId === user.$id
          );
          setUserRsvps(userRsvps || []);
          console.log("User's RSVPs after filtering:", userRsvps);
        }
      } catch (error) {
        console.error("Error fetching user RSVPs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRsvps();
  }, [user, id]);

  const generateQrCode = (event) => {
    const qrCodeData = JSON.stringify(event);
    setQrcodeData(qrCodeData);
    setShowQrCodeModal(true);
    console.log("qrcodedata", qrCodeData);
  };

  const handleScan = () => {
    try {
      const parsedData = JSON.parse(qrcodeData);
      console.log("Scanned event details:", parsedData);
      setScannedData(parsedData);

      // Create a new div element to display the scanned data
      const displayDiv = document.createElement("div");
      displayDiv.innerHTML = `
        <h2>Scanned Event Details:</h2>
        <p>Event Name: ${parsedData.eventName}</p>
        <p>Event Ticket: ${parsedData.tickets}</p>
        <p>Event Description: ${parsedData.eventDescription}</p>
        <!-- Add more RSVP details as needed -->
      `;

      // Append the created div to the body or another container
      document.body.appendChild(displayDiv);
    } catch (error) {
      console.error("Error parsing QR code data:", error);
    }
  };

  console.log("scanning", scannedData);

  return (
    <div className="Dash">
      <div className="rsvp">
        <div className="sidenav">
          <SideNav />
        </div>
        <div className="other_sideNav">
          {loading && <Loader2 />}
          {!loading && (
            <div className="rsvp_container">
              <h2>My RSVPs</h2>
              <div className="each_rsvp">
                {userRsvps.length === 0 ? (
                  <div className="no_rsvp">
                    <p>No RSVPs Yet!</p>
                    <div className="no_rsvpImg">
                      <img src={rsvpimg} alt="" />
                    </div>
                  </div>
                ) : (
                  userRsvps.map((rsvp) => (
                    <div key={rsvp.$id} className="rsvps">
                      <div className="rsvp_content">
                        <div className="textss">
                          <p>Event Name: {rsvp.eventName}</p>
                          <p>Event Ticket: {rsvp.tickets}</p>
                          <p>Event Description: {rsvp.eventDescription}</p>
                          <p>Event Location: {rsvp.eventLocation}</p>
                          <p>Event Category: {rsvp.eventCategory}</p>
                        </div>
                        <div className="rsvp_img">
                          <img src={rsvp.eventImagee} alt="" />
                        </div>
                      </div>
                      <button
                        className="btn"
                        onClick={() => generateQrCode(rsvp)}
                      >
                        Generate Qr code
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {showQrCodeModal && (
        <div className="modal-container">
          <div className="modal">
            <button
              className="close-btn"
              onClick={() => setShowQrCodeModal(false)}
            >
              Close
            </button>
            <h2>Generated QR Code:</h2>
            <QRCode value={qrcodeData} />
          </div>
        </div>
      )}

      <QrReader
        delay={300}
        onError={console.error}
        onScan={handleScan}
        style={{ display: "none" }} // Hide the webcam
      />

      {/* {qrcodeData && (
        <div>
          <h2>Scanned Event Details:</h2>
          <p>Event Name: {qrcodeData.eventName}</p>
          <p>Event Ticket: {qrcodeData.tickets}</p>
          <p>Event Description: {qrcodeData.eventDescription}</p>
          
        </div>
      )} */}
    </div>
  );

  // console.log("scanned data", scannedData);
  // return (
  //   <div className="Dash">
  //     <div className="rsvp">
  //       <div className="sidenav">
  //         <SideNav />
  //       </div>
  //       <div className="other_sideNav">
  //         {loading && <Loader2 />}
  //         {!loading && (
  //           <div className="rsvp_container">
  //             <h2>My RSVPs</h2>
  //             <div className="each_rsvp">
  //               {userRsvps.length === 0 ? (
  //                 <div className="no_rsvp">
  //                   <p>No RSVPs Yet!</p>
  //                   <div className="no_rsvpImg">
  //                     <img src={rsvpimg} alt="" />
  //                   </div>
  //                 </div>
  //               ) : (
  //                 userRsvps.map((rsvp) => (
  //                   <div key={rsvp.$id} className="rsvps">
  //                     <div className="rsvp_content">
  //                       <div className="textss">
  //                         <p>Event Id: {rsvp.$id}</p>
  //                         <p>Event Name: {rsvp.eventName}</p>
  //                         <p>Event Ticket: {rsvp.tickets}</p>
  //                         <p>Event Description: {rsvp.eventDescription}</p>
  //                         <p>Event Location: {rsvp.eventLocation}</p>
  //                         <p>Event Category: {rsvp.eventCategory}</p>
  //                         <p>Event Date: {rsvp.eventDate}</p>
  //                         {/* Add more properties as needed */}
  //                       </div>
  //                       <div className="rsvp_img">
  //                         <img src={rsvp.eventImagee} alt="" />
  //                       </div>
  //                     </div>
  //                     <button
  //                       className="btn"
  //                       onClick={() => generateQrCode(rsvp)}
  //                     >
  //                       Generate Qr code
  //                     </button>
  //                   </div>
  //                 ))
  //               )}
  //             </div>
  //           </div>
  //         )}
  //       </div>
  //     </div>

  //     {showQrCodeModal && (
  //       <div className="modal-container">
  //         <div className="modal">
  //           <button
  //             className="close-btn"
  //             onClick={() => setShowQrCodeModal(false)}
  //           >
  //             Close
  //           </button>
  //           <h2>Generated QR Code:</h2>
  //           <QRCode value={qrcodeData} />
  //         </div>
  //       </div>
  //     )}

  //     {/* ... (existing code) */}
  //     {scannedData && (
  //       <div>
  //         <h2>Scanned Event Details:</h2>
  //         <p>Event Name: {scannedData.eventName}</p>
  //         <p>Event Ticket: {scannedData.tickets}</p>
  //         <p>Event Description: {scannedData.eventDescription}</p>
  //         {/* Add more RSVP details as needed */}
  //       </div>
  //     )}
  //   </div>
  // );
};

export default Rsvp;
