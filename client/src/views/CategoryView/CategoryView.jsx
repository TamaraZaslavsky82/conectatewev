import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/SideBar/SideBar";
import SearchSection from "../home/SearchSection/SearchSection";
import Cards from "../../components/Cards/Cards";
import Map from "../../components/Map/Map";
import { GetPlaces, GetCategories } from "../../redux/actions"; // Asegúrate de tener estas acciones

function CategoryView() {
  const dispatch = useDispatch();

  // Obtener lugares y categorías del store
  const places = useSelector((state) => state.places); // Asegúrate de que `places` esté definido en el reducer
  const categories = useSelector((state) => state.categories); // Asegúrate de que `categories` esté definido en el reducer

  const [showMap, setShowMap] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    dispatch(GetPlaces());
    dispatch(GetCategories());
  }, [dispatch]);

  // Filtrar lugares por categoría seleccionada
  const filteredPlaces = selectedCategory
    ? places.filter((place) => place.category === selectedCategory)
    : places;

  const toggleView = () => {
    setShowMap((prev) => !prev);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleBackToCategories = () => {
    setSelectedCategory("");
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
              {filteredPlaces.map((place) => (
                <div key={place.id} className="border-b border-gray-300 pb-2">
                  <h3 className="text-lg font-semibold">{place.name}</h3>
                  <p className="text-sm text-gray-600">{place.description}</p>
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
            {categories.map((category) => (
              <div
                key={category.id}
                className="mb-4 border-b border-gray-300 pb-2 cursor-pointer"
                onClick={() => handleCategoryClick(category.name)}
              >
                {category.name}
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
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Ordenar por
            </button>
          </div>

          {/* Mostrar Cards o Mapa */}
          <div className="flex-1">
            {showMap ? (
              <Map />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredPlaces.map((place) => (
                  <Cards
                  key={place.id}
                  image={place.image_url}
                  title={place.title}
                  description={place.description_place}
                  buttonText="Ver Más"
                  isPremium={place.status_type === 0} // Ejemplo: status_type 0 indica "premium"
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
