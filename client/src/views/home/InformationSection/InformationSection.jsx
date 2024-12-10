import React from "react";
import { FaWifi, FaTags, FaStar } from "react-icons/fa"; // Importamos los iconos
import fondoImage from "../../../assets/fondoinformacion.png";

const InformacionSection = () => {
  return (
    <div
      className="relative bg-cover bg-center py-16 px-4 md:px-8"
      style={{ backgroundImage: `url(${fondoImage})` }}
    >
      {/* Filtro oscuro */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Contenido */}
      <div className="relative z-10 text-white">
        {/* Texto principal */}
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-bold">TENEMOS UNA INFO QUE NO TE PODES PERDER</h2>
          <p className="mt-4 text-lg md:text-xl">
            Descubre los puntos WIFI gratuitos, ofertas y eventos destacados.
          </p>
        </div>

        {/* Contenedor para las cards */}
        <div className="flex flex-col md:flex-row md:justify-end items-center space-y-6 md:space-y-0 md:space-x-6">
          {/* Card 1 */}
          <div className="bg-white text-black rounded-lg shadow-lg p-6 flex flex-col items-center justify-between w-full md:w-1/4 h-full min-h-[200px]">
            <FaWifi className="text-4xl text-blue-500 mb-4" />
            <h3 className="text-lg font-bold mb-2">Conexión WiFi</h3>
            <p className="text-sm text-center">
              Disfruta de WiFi gratuito en todas nuestras instalaciones.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white text-black rounded-lg shadow-lg p-6 flex flex-col items-center justify-between w-full md:w-1/4 h-full min-h-[200px]">
            <FaTags className="text-4xl text-green-500 mb-4" />
            <h3 className="text-lg font-bold mb-2">Ofertas Exclusivas</h3>
            <p className="text-sm text-center">
              Aprovecha descuentos y promociones únicas para ti.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white text-black rounded-lg shadow-lg p-6 flex flex-col items-center justify-between w-full md:w-1/4 h-full min-h-[200px]">
            <FaStar className="text-4xl text-yellow-500 mb-4" />
            <h3 className="text-lg font-bold mb-2">Eventos Especiales</h3>
            <p className="text-sm text-center">
              Participa en actividades y eventos destacados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformacionSection;
