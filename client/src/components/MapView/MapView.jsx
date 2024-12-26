import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Configuración de íconos personalizados
const premiumIcon = new L.Icon({
  iconUrl: "/star-icon.png", // Ruta relativa desde `public`
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const regularIcon = new L.Icon({
  iconUrl: "/default-icon.png", // Ruta relativa desde `public`
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

// Función para crear un ícono con texto personalizado
const createLabelIcon = (text, isPremium) => {
    return L.divIcon({
      html: `
        <div class="flex items-center gap-2 text-gray-800 font-semibold text-sm px-3 py-1 rounded-lg shadow-md whitespace-nowrap">
          ${
            isPremium
              ? `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-5 h-5 text-yellow-500">
                   <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                 </svg>`
              : ""
          }
          <span>${text}</span>
        </div>
      `,
      iconSize: [0, 0], // El tamaño lo define el contenido dinámico
      className: "custom-label-icon",
    });
  };
  
  
  
  

const MapView = ({ places }) => {
  const center = [-32.6044, -66.1136]; // Coordenadas de San Francisco del Monte de Oro

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {places.map((place) => (
        <Marker
          key={place.id}
          position={[place.latitude, place.longitude]}
          icon={createLabelIcon(place.title, place.status_type === 0)} // Crear ícono personalizado con el título
        >
          <Popup>
            <div>
              <strong>{place.title}</strong>
              <br />
              {place.status_type === 0 ? "Lugar Destacado" : " "}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
