import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FaStar } from "react-icons/fa";

const Map = ({ places }) => {
  const defaultPosition = [-32.599861, -66.126184];

  // Función para crear un icono personalizado
  const createCustomIcon = (place) => {
    return L.divIcon({
      className: "custom-marker",
      html: `
        <div style="display: flex; align-items: center; flex-direction: column; text-align: center;">
          <span style="background: white; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 12px;">
            ${place.title}
            ${place.status_type === 0 ? '<span style="color: gold;">⭐</span>' : ''}
          </span>
          <img src="https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png" alt="marker" />
        </div>
      `,
      iconSize: [30, 42],
      iconAnchor: [15, 42],
      popupAnchor: [0, -42],
    });
  };

  return (
    <div className="h-full w-full">
      <MapContainer
        center={defaultPosition}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {places.map((place) => (
          <Marker
            key={place.id}
            position={[
              place.latitude || defaultPosition[0],
              place.longitude || defaultPosition[1],
            ]}
            icon={createCustomIcon(place)}
          >
            <Popup>
              <div className="flex items-center">
                <h3 className="font-bold text-lg mr-2">{place.title}</h3>
                {place.status_type === 0 && (
                  <FaStar className="text-yellow-500" />
                )}
              </div>
              <p>{place.description_place}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
