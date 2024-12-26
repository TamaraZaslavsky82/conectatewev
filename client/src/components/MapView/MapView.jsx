import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Coordenadas de San Francisco del Monte de Oro, San Luis, Argentina
const sanFranciscoCoordinates = { lat: -32.6167, lng: -65.4500 };

const MapView = ({ places }) => {
  return (
    <MapContainer
      center={sanFranciscoCoordinates} // Inicializar el mapa en San Francisco del Monte de Oro
      zoom={13} // Nivel de zoom
      style={{ height: "600px", width: "100%" }} // Altura del mapa
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Renderizar los marcadores de los lugares */}
      {places && places.map((place) => (
        <Marker
          key={place.id}
          position={{ lat: place.latitude, lng: place.longitude }} // Usar coordenadas de cada lugar
          icon={new L.Icon({
            iconUrl: 'https://example.com/icon.png', // Cambiar por el icono que desees
            iconSize: [25, 25], // Tamaño del icono
          })}
        >
          <Popup>
            <h3>{place.title}</h3>
            <p>{place.description_place}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
