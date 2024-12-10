import React from "react";
import image from '../../../assets/banner.webp'
import { FaUtensils, FaHotel, FaMapMarkedAlt } from "react-icons/fa";

const SearchSection = () => {
  return (
    <div
    className="relative bg-cover bg-center h-screen"
    style={{ backgroundImage: `url(${image})` }}
  >
    {/* Filtro oscuro */}
    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    {/* Contenido */}
    <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
      {/* Texto principal */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        ¡Descubri San Francisco del Monte de Oro!
      </h1>
      {/* Campo de búsqueda */}
      <input
        type="text"
        placeholder="Buscar..."
        className="w-full max-w-md px-4 py-2 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {/* Íconos */}
      <div className="flex justify-center space-x-6 mt-6">
        {/* Ícono de comida */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 flex items-center justify-center bg-gray-800 rounded-full">
            <FaUtensils className="text-white w-8 h-8" />
          </div>
          <span className="mt-2 text-sm">Comida</span>
        </div>
        {/* Ícono de alojamiento */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 flex items-center justify-center bg-gray-800 rounded-full">
            <FaHotel className="text-white w-8 h-8" />
          </div>
          <span className="mt-2 text-sm">Alojamiento</span>
        </div>
        {/* Ícono de mapa */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 flex items-center justify-center bg-gray-800 rounded-full">
            <FaMapMarkedAlt className="text-white w-8 h-8" />
          </div>
          <span className="mt-2 text-sm">Mapa</span>
        </div>
      </div>
    </div>
  </div>
  );
};

export default SearchSection