import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import { GetPlaceDetail, GetPremiumPlaceImg, GetSocialMedia } from "../../redux/actions";

const customMarker = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const StreetView = ({ latitude, longitude }) => {
  const streetViewRef = useRef();

  useEffect(() => {
    if (streetViewRef.current) {
      const lat = parseFloat(latitude);
      const lng = parseFloat(longitude);

      if (!isNaN(lat) && !isNaN(lng)) {
        new window.google.maps.StreetViewPanorama(streetViewRef.current, {
          position: { lat, lng },
          pov: { heading: 100, pitch: 0 },
          zoom: 1,
        });
      } else {
        console.error("Coordenadas inválidas:", { lat, lng });
      }
    }
  }, [latitude, longitude]);

  return <div ref={streetViewRef} style={{ width: "100%", height: "400px" }} />;
};

const socialMediaIcons = {
  0: "https://cdn-icons-png.flaticon.com/512/124/124010.png", // Facebook
  1: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png", // Instagram
  2: "https://cdn-icons-png.flaticon.com/512/888/888859.png", // Website
  3: "https://cdn-icons-png.flaticon.com/512/732/732200.png", // Other
};

const Card = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  const place = useSelector((state) => state.placeDetail);
  const premiumImages = useSelector((state) => state.premiumPlaceImg);
  const socialMedia = useSelector((state) => state.socialMedia);

  useEffect(() => {
    if (id) {
      dispatch(GetPlaceDetail(id));
    }
    dispatch(GetPremiumPlaceImg());
    dispatch(GetSocialMedia());
  }, [dispatch, id]);

  if (!place || Object.keys(place).length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Cargando detalles del lugar...</p>
      </div>
    );
  }

  const { title, description_place, image_url, latitude, longitude, phone } = place;

  // Filtra las imágenes premium por id_place
  const filteredImages = premiumImages.filter(
    (img) => parseInt(img.id_place) === parseInt(id)
  );

  return (
    <div className="min-h-screen bg-gray-100 flex mt-9">
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
          <h1 className="text-3xl font-bold text-center text-gray-800 mt-12">{title}</h1>
          <img
            src={image_url}
            alt={title}
            className="w-full max-h-96 object-cover rounded-lg sm:max-h-[50vh] md:max-h-[60vh] lg:max-h-[70vh]"
          />

          {/* Miniaturas de imágenes premium */}
          {filteredImages.length > 0 && (
            <div className="mt-4">
              <div className="flex justify-center mt-2">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredImages.map((img, index) => (
                    <img
                      key={index}
                      src={img.url_img}
                      alt={`Imagen premium ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80"
                      onClick={() => setSelectedImage(img.url_img)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <p className="text-gray-700 text-base">{description_place}</p>

          <div className="flex flex-wrap justify-center space-x-4 mt-4">
            <a href={`tel:${phone}`} className="bg-green-500 hover:bg-green-700 text-white px-4 py-4 rounded-md shadow-md">
              Llamar
            </a>
            <a href={`https://wa.me/${phone}`} className="bg-green-600 hover:bg-green-800 text-white px-4 py-4 rounded-md shadow-md">
              Enviar WhatsApp
            </a>

            {socialMedia?.length > 0 && (
              <div className="flex space-x-4 items-center justify-center">
                {socialMedia
                  .filter((media) => media.id_place === parseInt(id))
                  .map((media, index) => (
                    <a
                      key={index}
                      href={media.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full shadow hover:opacity-80"
                    >
                      <img
                        src={socialMediaIcons[media.social_media_type]}
                        alt="social icon"
                        className="w-8 h-8"
                      />
                    </a>
                  ))}
              </div>
            )}
          </div>

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
            </MapContainer>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mt-8">Vista interactiva</h2>
          <StreetView latitude={latitude} longitude={longitude} />
        </div>
      </div>

      {/* Modal para imagen ampliada */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white p-4 max-w-3xl mx-auto rounded-lg">
            <img
              src={selectedImage}
              alt="Imagen ampliada"
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-600"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
