import React, { useState } from 'react';
import SearchSection from '../home/SearchSection/SearchSection'; 
import Card from '../../components/Cards/Cards'; 
import Pagination from '../../components/Pagination/Pagination';

const EventView = () => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const locations = ['Localidad 1', 'Localidad 2', 'Localidad 3']; // Ejemplo de localidades

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  return (
    <div className="w-full px-0">
      {/* Search Section */}
      <div className="w-full mb-6">
        <SearchSection />
      </div>

      {/* Texts and Selector for Upcoming Events */}
      <div className="flex justify-between items-center mb-6 bg-blue-950 text-gray-200 p-4 rounded-md">
        {/* Left Text */}
        <div className="text-lg font-semibold">Nuevos eventos</div>

        {/* Right Text and Selector */}
        <div className="flex items-center space-x-4">
          <div className="text-lg font-semibold">Localidades</div>
          <select
            value={selectedLocation}
            onChange={handleLocationChange}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Selecciona una localidad
            </option>
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Cards Section for Upcoming Events */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <Card
            key={index}
            title={`Evento ${index + 1}`}
            buttonText={`Mas Info`}
          />
        ))}
      </div>
      <Pagination/>
<div className="flex justify-between items-center mb-6 bg-blue-950 text-gray-200 p-4 rounded-md">
      {/* Text for Past Events */}
      <div className="text-lg font-semibold mt-6">Eventos que ya pasaron</div>
      </div>

      {/* Cards Section for Past Events */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <Card
            key={index}
            title={`Evento ${index + 10}`} // Cambié el índice para diferenciar
            buttonText={`Mas Info`}
          />
        ))}
      </div>
    </div>
  );
};

export default EventView;