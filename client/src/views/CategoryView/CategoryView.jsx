import React, { useState } from "react";
import Sidebar from "../../components/SideBar/SideBar";
import SearchSection from "../home/SearchSection/SearchSection";
import Card from "../../components/Cards/Cards"; // Reutilizando el componente Card
import Map from "../../components/Map/Map"; // Componente del mapa

function CategoryView() {
  const [showMap, setShowMap] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const toggleView = () => {
    setShowMap((prev) => !prev);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="w-full bg-gray-100 p-6">
        <SearchSection />
      </div>

      {/* Vista móvil */}
      <div className="block md:hidden w-full p-4">
        {selectedCategory ? (
          <div>
            <h2 className="text-xl font-bold mb-4">{selectedCategory}</h2>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="border-b border-gray-300 pb-2">
                  <h3 className="text-lg font-semibold">Título {index + 1}</h3>
                  <p className="text-sm text-gray-600">Breve descripción del elemento {index + 1}.</p>
                </div>
              ))}
            </div>
            <button
              onClick={handleBackToCategories}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mt-4"
            >
              Volver a las categorías
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-semibold mb-4">Categorías</h2>
            {Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className="mb-4 border-b border-gray-300 pb-2 cursor-pointer"
                onClick={() => handleCategoryClick(`Categoría ${index + 1}`)}
              >
                Categoría {index + 1}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Vista de escritorio */}
      <div className="hidden md:flex flex-row w-full">
        {/* Sidebar */}
        <div className="w-1/4 bg-blue-950 text-white h-screen">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="w-3/4 p-4 flex flex-col">
          {/* Botón de alternar vista */}
          <div className="flex justify-between mb-4">
            <button
              onClick={toggleView}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              {showMap ? "Volver a Cards" : "Buscar en el mapa"}
            </button>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Ordenar por
            </button>
          </div>

          {/* Mostrar Cards o Mapa */}
          <div className="flex-1">
            {showMap ? (
              <Map />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Generar tres cards por fila */}
                {Array.from({ length: 9 }).map((_, index) => (
                  <Card
                    key={index}
                    title={`Card ${index + 1}`}
                    buttonText={`Ver Más`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryView;