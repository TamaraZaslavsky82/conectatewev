import React, { useState, useEffect } from "react";

const ModalEvent = ({ events }) => {
  const [currentEvent, setCurrentEvent] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (events && events.length > 0) {
      setCurrentEvent(events[0]); // Mostrar el primer evento disponible
    }
  }, [events]);

  if (!currentEvent || !isVisible) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div className="bg-white rounded-md shadow-lg overflow-hidden max-w-2xl w-full">
        <img
          src={currentEvent.image_url}
          alt="Evento"
          className="w-full h-[700px] object-cover" // Altura personalizada para la imagen
        />
        <button
          onClick={() => setIsVisible(false)}
          className="w-full bg-blue-950 text-white py-2 hover:bg-blue-700"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ModalEvent;
