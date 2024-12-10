import React from "react";
import Card from "../../../components/Cards/Cards";
import fondoImage from "../../../assets/fondodestacados.png";

const DestacadosSection = () => {
  const cardsData = [
    {
      image: "https://via.placeholder.com/150",
      title: "Card 1",
      description: "Descripción de la Card 1",
      buttonText: "Ver Más",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 2",
      description: "Descripción de la Card 2",
      buttonText: "Ver Más",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Card 3",
      description: "Descripción de la Card 3",
      buttonText: "Ver Más",
    },
  ];

  return (
    <div
      className="relative bg-cover bg-center py-16 px-4 md:px-8"
      style={{ backgroundImage: `url(${fondoImage})` }}
    >
      {/* Filtro oscuro */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Contenido */}
      <div className="relative z-10 text-white">
        {/* Título */}
        <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center md:text-left">
          Destacados
        </h2>

        {/* Contenedor de cards */}
        <div className="flex md:justify-between overflow-x-scroll md:overflow-x-visible scrollbar-hide space-x-4">
          {cardsData.map((card, index) => (
            <div
              key={index}
              className="min-w-[80%] md:min-w-[30%] flex-shrink-0"
            >
              <Card
                image={card.image}
                title={card.title}
                description={card.description}
                buttonText={card.buttonText}
              />
            </div>
          ))}
        </div>

        {/* Botón "Más info" */}
        <div className="flex justify-end mt-8">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md">
            Más Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestacadosSection;
