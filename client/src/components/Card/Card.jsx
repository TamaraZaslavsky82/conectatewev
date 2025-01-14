import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import { GetPlaceDetail } from "../../redux/actions";

const customMarker = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Componente para agregar la ruta al mapa
const RoutingControl = ({ destination }) => {
  const map = useMap();
  const routingControlRef = useRef();

  useEffect(() => {
    if (routingControlRef.current) {
      map.removeControl(routingControlRef.current);
    }

    routingControlRef.current = L.Routing.control({
      waypoints: [
        L.latLng(0, 0), // Punto inicial (se actualizará más adelante)
        L.latLng(destination[0], destination[1]),
      ],
      createMarker: function () {
        return null; // No crear marcadores adicionales
      },
      routeWhileDragging: true,
      show: false, // Ocultar el cartel de información
      addWaypoints: false, // No permitir agregar puntos intermedios
      draggableWaypoints: false, // Evitar que los puntos sean arrastrados
    }).addTo(map);


    // Obtener la ubicación actual del usuario
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        routingControlRef.current.setWaypoints([
          L.latLng(latitude, longitude), // Punto inicial desde la ubicación actual
          L.latLng(destination[0], destination[1]),
        ]);
      },
      (error) => {
        console.error("Error al obtener la ubicación del usuario:", error);
      }
    );

    return () => {
      map.removeControl(routingControlRef.current);
    };
  }, [map, destination]);

  return null;
};

const Card = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const place = useSelector((state) => state.placeDetail);

  useEffect(() => {
    if (id) {
      dispatch(GetPlaceDetail(id));
    }
  }, [dispatch, id]);

  if (!place || Object.keys(place).length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Cargando detalles del lugar...</p>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: `${title}\n\n${description_place}\n\nUbicación: https://maps.google.com/?q=${latitude},${longitude}`,
        url: window.location.href, // URL actual de la página
      })
        .then(() => console.log('Contenido compartido'))
        .catch((error) => console.error('Error al compartir:', error));
    } else {
      alert('La funcionalidad para compartir no está soportada en este navegador.');
    }
  };

  const { title, description_place, image_url, latitude, longitude, phone } = place;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="fixed top-24 left-4 z-50">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md shadow-md"
        >
          Volver
        </button>
      </div>
      <div className="w-full flex justify-center overflow-y-auto">
        <div className="max-w-4xl w-full h-screen overflow-y-auto border rounded-lg shadow-lg p-6 bg-white space-y-6">
          <h1 className="text-3xl font-bold text-center text-gray-800">{title}</h1>
          <img
            src={image_url}
            alt={title}
            className="object-cover h-80 w-full rounded-lg"
          />
          <p className="text-gray-700 text-base">{description_place}</p>
          
          <div className="flex space-x-4">
            <a href={`tel:${phone}`} className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-md">
              Llamar
            </a>
            <a href={`https://wa.me/${phone}`} className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded-md shadow-md">
              Enviar WhatsApp
            </a>
          </div>
          {/* Mapa */}
          <div className="w-full h-96 mt-4">
            <MapContainer
              center={[latitude, longitude]}
              zoom={13}
              scrollWheelZoom={false}
              className="h-full w-full"
            >
              <TileLayer
                url="https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.carto.com/">CARTO</a>'
              />
              <Marker position={[latitude, longitude]} icon={customMarker}>
                <Popup>{title}</Popup>
              </Marker>
              <RoutingControl destination={[latitude, longitude]} />
            </MapContainer>
          </div>
          <button
            onClick={handleShare}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-md"
          >
            Compartir
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
