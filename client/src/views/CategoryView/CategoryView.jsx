import React from 'react';
import Sidebar from '../../components/SideBar/SideBar';
import SearchSection from '../home/SearchSection/SearchSection';
import Card from '../../components/Cards/Cards'

function CategoryView() {
  // Datos para las tarjetas
  const cards = Array(9).fill({
    title: "Card Title",
    description: "This is a sample description for the card.",
    image: "https://via.placeholder.com/150",
    buttonText: 'Mas info'
  });

  return (
    <div className="flex flex-col">
      {/* Hero - SearchSection */}
      <div className="w-full">
        <SearchSection />
      </div>

      {/* Contenido principal */}
      <div className="flex flex-col md:flex-row mt-4 p-4">
        {/* Categorías (Sidebar) */}
        <div className="w-full md:w-1/4">
          <Sidebar />
        </div>

        {/* Contenido derecho */}
        <div className="w-full md:w-3/4 flex flex-col">
          {/* Botones */}
          <div className="flex justify-between mb-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
              Buscar en el mapa
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
              Ordenar por
            </button>
          </div>

          {/* Grid de Tarjetas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards.map((card, index) => (
              <Card
                key={index}
                title={card.title}
                description={card.description}
                image={card.image}
                buttonText={card.buttonText}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryView;
