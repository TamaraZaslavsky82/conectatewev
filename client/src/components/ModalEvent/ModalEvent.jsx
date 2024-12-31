import React, { useState, useEffect } from "react";

const ModalEvent = ({ events }) => {
  const [currentEvent, setCurrentEvent] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (events && events.length > 0) {
      // Seleccionar un evento aleatorio
      const randomIndex = Math.floor(Math.random() * events.length);
      setCurrentEvent(events[randomIndex]);
    }
  }, [events]);

  if (!currentEvent || !isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="rounded-md shadow-lg overflow-hidden w-auto max-w-4xl md:max-h-[90vh] h-auto flex flex-col">
        {/* Contenedor de la imagen */}
        <div className="relative flex-1 overflow-hidden">
          <img
            src={currentEvent.image_url}
            alt="Evento"
            className="w-full h-auto md:max-h-[70vh] object-contain"
          />
        </div>

        {/* Botón de cerrar */}
        <div className="border-t border-gray-200 w-full">
          <button
            onClick={() => setIsVisible(false)}
            className="w-full bg-blue-950 text-white px-4 py-2 hover:bg-blue-700"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEvent;
