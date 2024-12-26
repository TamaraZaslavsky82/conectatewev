import React from "react";
import { useNavigate } from "react-router-dom";  // Importar el hook useNavigate

const Cards = ({ image, title, description, buttonText, isPremium, place }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (place?.id) {
      navigate(`/place/${place.id}`);
    } else {
      console.error("Place is undefined or does not have an id.");
    }
  };
  

  return (
    <div className="relative bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transform transition-transform duration-300 hover:scale-105">
      {isPremium && (
        <div className="absolute top-2 right-2 bg-white text-white p-1 rounded-full shadow-md">
          ⭐
        </div>
      )}
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold mb-2 text-black">{title}</h3>
          <p className="text-gray-600 text-sm mb-4 truncate">{description}</p>
        </div>

        <button
          className="bg-yellow-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleClick}  // Redirigir al hacer clic
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Cards;
