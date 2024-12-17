import React from "react";
import { useNavigate } from "react-router-dom";

const Card = () => {
  const navigate = useNavigate(); // Hook para navegar programáticamente

  const handleBackClick = () => {
    navigate('/categorias'); // Redirigir a la ruta "categorias"
  };

  const mainImage = "https://via.placeholder.com/600x400";
  const thumbnails = [
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
  ];
  const title = "San Francisco, California";
  const description =
    "San Francisco es una ciudad en el norte de California, conocida por sus colinas empinadas, el Golden Gate Bridge y su vibrante cultura. Descubre lugares increíbles, restaurantes y eventos en esta maravillosa ciudad.";

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Botón fijo en la esquina superior izquierda */}
      <div className="fixed top-24 left-4 z-50">
        <button
          onClick={handleBackClick}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md shadow-md"
        >
          Volver a Categorías
        </button>
      </div>

      {/* Contenedor principal con scroll en el lado derecho */}
      <div className="w-full flex justify-center overflow-y-auto">
        <div className="max-w-4xl w-full h-screen overflow-y-auto border rounded-lg shadow-lg p-6 bg-white space-y-6">
          {/* Título */}
          <h1 className="text-3xl font-bold text-center text-gray-800">{title}</h1>

          {/* Imagen Principal */}
          <div className="w-full h-80 bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden">
            <img src={mainImage} alt="Principal" className="object-cover h-full w-full" />
          </div>

          {/* Imágenes en Miniatura */}
          <div className="flex space-x-4 justify-center">
            {thumbnails.map((thumb, index) => (
              <img
                key={index}
                src={thumb}
                alt={`Thumbnail ${index + 1}`}
                className="w-20 h-20 object-cover rounded-lg cursor-pointer border-2 hover:border-blue-500"
              />
            ))}
          </div>

          {/* Descripción */}
          <div className="text-gray-700 text-base p-2">
            <p>{description}</p>
          </div>

          {/* Mapa */}
          <div className="w-full h-80 bg-gray-100 rounded-lg overflow-hidden">
            <iframe
              title="Mapa San Francisco"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345090673!2d-122.42127808468126!3d37.77492927975926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c7a4f5e3d%3A0x4e3c7197d6c2d7e0!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1679940473417!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Botones */}
          <div className="flex space-x-6 justify-center mt-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg">
              Llamar
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg">
              Compartir
            </button>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg">
              ¿Cómo llego?
            </button>
          </div>

          {/* Redes Sociales */}
          <div className="flex space-x-6 justify-center mt-6 text-gray-500">
            <a href="#" className="hover:text-blue-500">
              <i className="fab fa-facebook fa-2x"></i>
            </a>
            <a href="#" className="hover:text-blue-400">
              <i className="fab fa-twitter fa-2x"></i>
            </a>
            <a href="#" className="hover:text-pink-500">
              <i className="fab fa-instagram fa-2x"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
