import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = () => {
  const position = [-32.599861, -66.126184]; // Coordenadas de San Francisco del Monte de Oro
  return (
    <div className="h-full w-full">
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>San Francisco del Monte de Oro</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
