import React from "react";
import image from "../../../assets/fondomuni.png";
import muniImage from "../../../assets/muni.png";

const MunicipalidadSection = () => {
  return (
    <div
      className="relative bg-cover bg-center h-[80vh] flex items-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Filtro oscuro */}
      <div className="absolute inset-0 bg-black bg-opacity-80"></div>

      {/* Contenido */}
      <div className="relative z-10 w-full px-4 md:px-8 flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between h-full md:h-auto space-y-6 md:space-y-0">
        {/* Imagen */}
        <div className="w-full flex justify-center">
          <img
            src={muniImage}
            alt="Municipalidad"
            className="w-full max-w-xs md:max-w-md rounded-lg shadow-lg"
          />
        </div>

        {/* Texto y botón */}
        <div className="text-white w-full md:w-1/2 flex flex-col items-center text-center">
          <h1 className="text-2xl md:text-5xl font-bold mb-4 md:mb-6">
            Te invitamos a conocer un poco más
          </h1>
          <p className="text-base md:text-xl mb-4 md:mb-6">
            Podés acceder de una forma rápida a la website de la Municipalidad
          </p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md">
            Ingresa
          </button>
        </div>
      </div>
    </div>
  );
};

export default MunicipalidadSection;
