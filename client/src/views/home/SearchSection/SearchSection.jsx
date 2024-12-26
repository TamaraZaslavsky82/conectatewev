import React, { useState, useEffect } from 'react';
import image from '../../../assets/banner.webp';
import { FaUtensils, FaHotel, FaMapMarkedAlt } from "react-icons/fa";
import Searchbar from "../../../components/Searchbar/Searchbar";
import { useDispatch, useSelector } from 'react-redux';
import { GetImageBanner } from '../../../redux/actions';

const SearchSection = () => {
  const dispatch = useDispatch();
  const imageBanner = useSelector((state) => state.imageBanner);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    dispatch(GetImageBanner());
  }, [dispatch]);

  useEffect(() => {
    console.log(imageBanner);
  }, [imageBanner]);

  // Configurar el cambio automático de imágenes
  useEffect(() => {
    if (imageBanner && imageBanner.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          (prevIndex + 1) % imageBanner.length
        );
      }, 8000); // Cambiar cada 5 segundos
      return () => clearInterval(interval); // Limpiar intervalo al desmontar
    }
  }, [imageBanner]);

  // Obtener la imagen y el autor actuales
  const currentImage =
    imageBanner && imageBanner.length > 0
      ? imageBanner[currentImageIndex]
      : null;

  const backgroundImageUrl = currentImage
    ? currentImage.image_url
    : image; // Imagen predeterminada si no hay imágenes.

  const signatureAuthor = currentImage
    ? currentImage.signature_author
    : '';

  return (
    <div
      className="relative bg-cover bg-center h-screen transition-all duration-1000"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
      }}
    >
      {/* Filtro oscuro */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
        {/* Texto principal */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
          ¡Descubrí San Francisco del Monte de Oro!
        </h1>
        {/* Campo de búsqueda */}
        <Searchbar />
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
      {/* Pie de foto con el autor */}
      {signatureAuthor && (
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white text-sm px-3 py-1 rounded">
          Autor: {signatureAuthor}
        </div>
      )}
    </div>
  );
};

export default SearchSection;
