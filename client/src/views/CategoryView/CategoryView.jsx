import React, { useState } from "react";
import Sidebar from "../../components/SideBar/SideBar";
import SearchSection from "../home/SearchSection/SearchSection";
import Card from "../../components/Cards/Cards"; // Reutilizando el componente Card
import Map from "../../components/Map/Map"; // Componente del mapa

function CategoryView() {
  const [showMap, setShowMap] = useState(false);

  const toggleView = () => {
    setShowMap((prev) => !prev);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="w-full bg-gray-100 p-6">
        <SearchSection />
      </div>

      {/* Contenido Principal */}
      <div className="flex flex-row w-full">
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
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Ordenar por</button>
          </div>

          {/* Mostrar Cards o Mapa */}
          <div className="flex-1">
            {showMap ? (
              <Map />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Generar tres cards por fila */}
                {Array.from({ length: 9 }).map((_, index) => (
                  <Card key={index} 
                  title={`Card ${index + 1}`} 
                  buttonText= {`Ver Mas`}
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
