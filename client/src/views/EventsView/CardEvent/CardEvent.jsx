import React from 'react';

const CardEvent = ({ title, description, image, buttonText, onButtonClick }) => {
  return (
    <div
      className="relative group overflow-hidden rounded-lg shadow-lg bg-white cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
    >
      {/* Imagen de la tarjeta */}
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-110"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
        <button
          onClick={onButtonClick}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default CardEvent;
