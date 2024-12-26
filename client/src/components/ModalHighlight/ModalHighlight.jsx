import React, { useState, useEffect } from "react";

const ModalHighlight = ({ places }) => {
  const [currentPlace, setCurrentPlace] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  // Filtrar solo los lugares con status_type: 0
  const premiumPlaces = places?.filter((place) => place.status_type === 0) || [];

  // Función para obtener un lugar aleatorio
  const getRandomPlace = () => {
    if (premiumPlaces.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * premiumPlaces.length);
    return premiumPlaces[randomIndex];
  };

  // Efecto para actualizar el lugar actual
  useEffect(() => {
    if (premiumPlaces.length > 0) {
      // Mostrar un lugar aleatorio al inicio
      setCurrentPlace(getRandomPlace());
    }
  }, [premiumPlaces]);

  const handleCloseModal = () => {
    setIsVisible(false);
    // Después de un pequeño retraso (1 segundo), reabrir el modal con un lugar diferente
    setTimeout(() => {
      setIsVisible(true);
      setCurrentPlace(getRandomPlace());
    }, 8000); // 1000 ms = 1 segundo
  };

  if (!isVisible || !currentPlace) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white shadow-lg rounded-lg overflow-hidden w-64">
      <div className="relative">
        <img
          src={currentPlace.image_url}
          alt={currentPlace.title}
          className="w-full h-40 object-cover transition-all duration-500 ease-in-out"
        />
        <div className="absolute top-0 left-0 w-full bg-black bg-opacity-50 text-white p-2 text-sm">
          <h3 className="font-bold">{currentPlace.title}</h3>
          <p>Nuestros lugares destacados!!</p>
        </div>
        {/* Botón de cerrar */}
        <button
          onClick={handleCloseModal}
          className="absolute top-1 right-1 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full hover:bg-yellow-400"
        >
          ✖️
        </button>
      </div>
    </div>
  );
};

export default ModalHighlight;
