import React from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "./App.css";
import { useEffect, useState } from "react";
import supabase from "../supabase";
import Pointer from "./components/Pointer";

function App() {
  const [currentLat, setCurrentLat] = useState();
  const [currentLon, setCurrentLon] = useState();
  const [safeToLoad, setSafeToLoad] = useState(false);
  const [pointers, setPointers] = useState([]);

  useEffect(() => {
    async function getpoints() {
      let { data: points, error } = await supabase.from("points").select("*");
      console.log("Data: ", points);
      setPointers(points);
    }
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setCurrentLat(latitude);
      setCurrentLon(longitude);
      setSafeToLoad(true);
      getpoints();
    }
    function error() {
      console.log("Unable to retrieve your location");
      alert("Cannot access location", error);
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
            {/* <Marker position={position}>
              <Popup>
                <img
                  src="src/assets/opendrain.jpeg"
                  width={300}
                  height={270}
                ></img>
                <p>Open drain</p>
              </Popup>
            </Marker> */}
            {pointers.map
              ? pointers.map((pointer) => {
                  return <Pointer data={pointer} />;
                })
              : null}
          </MapContainer>
        </div>
      </>
    );
  }
}

export default App;
