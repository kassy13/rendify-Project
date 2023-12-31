// // SimpleMap.js
// import "leaflet/dist/leaflet.css";
// import L, { circle, map } from "leaflet";
// import { useEffect } from "react";
// import { toast } from "react-toastify";

// const SimpleMap = () => {
//   useEffect(() => {
//     let mymap;

//     // Check if the map container exists

//     // Create the map only if the container is not already initialized
//     mymap = L.map("map").setView([51.505, -0.09], 13);

//     L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       maxZoom: 19,
//       attribution:
//         '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//     }).addTo(mymap);
//     // navigator.geolocation.getCurrentPosition(success, error);
//     navigator.geolocation.getCurrentPosition(success, erlor);

//     let marker, circle, zoomed;

//     function success(position) {
//       const lat = position.coords.latitude;
//       const lng = position.coords.longitude;
//       const accuracy = position.coords.accuracy;

//       if (marker) {
//         mymap.removeLayer(marker, circle);
//       }
//       marker = L.marker([lat, lng]).addTo(mymap);
//       circle = L.circle([lat, lng], { radius: accuracy }).addTo(mymap);

//       if (!zoomed) {
//         zoomed = mymap.fitBounds(circle.getBounds());
//       }
//       mymap.setView([lat, lng]);
//     }

//     function erlor(err) {
//       if (err.code === 1) {
//         toast.error("Please allow Geolocation access");
//         alert("Please allow Geolocation access");
//       } else {
//         toast("Cannot get current location");
//         alert("Cannot get current location");
//       }
//       console.log(err);
//     }
//     return () => {
//       // Cleanup code if needed
//       if (mymap) {
//         mymap.remove();
//       }
//     };
//   }, []);

//   return <div id="map" style={{ height: "200px" }}></div>;
// };

// export default SimpleMap;

// SimpleMap.js
// SimpleMap.js
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";
import { toast } from "react-toastify";

const SimpleMap = ({ lat, lon }) => {
  useEffect(() => {
    const mymap = L.map("map").setView([lat, lon], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(mymap);

    const marker = L.marker([lat, lon]).addTo(mymap);

    return () => {
      if (mymap) {
        mymap.remove();
      }
    };
  }, [lat, lon]);

  return <div id="map" style={{ height: "200px", borderRadius: "10px" }}></div>;
};

export default SimpleMap;
