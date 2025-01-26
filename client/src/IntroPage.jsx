import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "../src/assets/LUJAN.jpg";
import image1 from "../src/assets/sanfran.jpg";
import "./IntroPage.css"; 
import logo from '../src/assets/logoconectate.png';

const IntroPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSanFranciscoClick = () => {
    navigate("/home"); // Navegar al Home
  };

  const handleLujanClick = () => {
    setIsModalOpen(true); // Abrir el modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Cerrar el modal
  };

  return (
    <div className="intro-page">
      {/* Logo y encabezado */}
      <div className="overlay-content">
        <img className="logo" src={logo} alt="logo" />
        <h1 className="header-text">
          Selecciona la localidad con la que deseas conectar
        </h1>
      </div>

      {/* Contenedor de imágenes lado a lado */}
      <div className="image-container">
        <div className="image-card" onClick={handleSanFranciscoClick}>
          <img src={image1} alt="San Francisco del Monte de Oro" />
          <div className="image-footer">San Francisco del Monte de Oro</div>
        </div>
        <div className="image-card" onClick={handleLujanClick}>
          <img src={image} alt="Luján" />
          <div className="image-footer">Luján</div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold text-black mb-4">Próximamente nos estaremos conectando</h2>
            <button
              onClick={closeModal}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntroPage;
