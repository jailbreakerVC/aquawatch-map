import React from "react";
import { Marker, Popup } from "react-leaflet";

export default function Pointer(data) {

  console.log("inside pointer i am getting", data);
  const position = [data.data.latitude, data.data.longitude];
  return (
    <Marker position={position} >
      <Popup>
        <img src={data.data.image_url} width={300} height={270}></img>
        <p>{data.data.desc}</p>
      </Popup>
    </Marker>
  );
}
