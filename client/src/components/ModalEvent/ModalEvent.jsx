import React, { useState, useEffect } from "react";

const ModalEvent = ({ events }) => {
  const [currentEvent, setCurrentEvent] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (events && events.length > 0) {
      // Filtrar eventos que no hayan caducado
      const validEvents = events.filter(
        (event) => new Date(event.end_time) > new Date()
      );

      if (validEvents.length > 0) {
        // Seleccionar un evento aleatorio de los vigentes
        const randomIndex = Math.floor(Math.random() * validEvents.length);
        setCurrentEvent(validEvents[randomIndex]);
        setIsVisible(true); // Mostrar el modal si hay eventos válidos
      } else {
        setIsVisible(false); // No mostrar el modal si no hay eventos válidos
      }
    } else {
      setIsVisible(false); // No mostrar el modal si no hay eventos
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
