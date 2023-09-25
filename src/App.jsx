import React from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const position = [28.7077245, 77.1389801];
  const [currentLat, setCurrentLat] = useState();
  const [currentLon, setCurrentLon] = useState();
  const [safeToLoad, setSafeToLoad] = useState(false);

  useEffect(() => {
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setCurrentLat(latitude);
      setCurrentLon(longitude);
      setSafeToLoad(true);
    }

    function error() {
      console.log("Unable to retrieve your location");
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
      return;
    }
  }, []);
  if (!safeToLoad) {
    return (
      <div>
        <p>loading map</p>
      </div>
    );
  } else {
    return (
      <>
        <div id="map">
          <MapContainer
            center={[currentLat, currentLon]}
            zoom={100}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                <img
                  src="src/assets/opendrain.jpeg"
                  width={300}
                  height={270}
                ></img>
                <p>Open drain</p>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </>
    );
  }
}

export default App;
