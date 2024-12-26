import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/SideBar/SideBar";
import SearchSection from "../home/SearchSection/SearchSection";
import Cards from "../../components/Cards/Cards";
import ModalFree from "../../components/ModalFree/ModalFree";
import { GetPlaces, GetCategories } from "../../redux/actions";
import Map from "../../components/MapView/Map"; // Importa tu componente Map

function CategoryView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const places = useSelector((state) => state.places);
  const categories = useSelector((state) => state.categories);

  const [showMap, setShowMap] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  useEffect(() => {
    dispatch(GetPlaces());
    dispatch(GetCategories());
  }, [dispatch]);

  useEffect(() => {
    if (places && places.length > 0) {
      if (selectedCategory) {
        const filtered = places.filter((place) => {
          const placeCategory = place.id_category ? String(place.id_category).toLowerCase().trim() : "";
          const selectedCategoryStr = String(selectedCategory).toLowerCase().trim();
          return placeCategory === selectedCategoryStr;
        });
        setFilteredPlaces(filtered);
      } else {
        setFilteredPlaces([...places].sort(() => Math.random() - 0.5));
      }
    }
  }, [selectedCategory, places]);

  const toggleView = () => {
    setShowMap((prev) => !prev);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleCardClick = (place) => {
    if (place.status_type === 0) {
      navigate(`/place/${place.id}`);
    } else if (place.status_type === 1) {
      setSelectedPlace(place);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPlace(null);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="w-full bg-gray-100 p-6">
        <SearchSection />
      </div>

      {/* Vista de escritorio */}
      <div className="hidden md:flex flex-row w-full">
        {/* Sidebar */}
        <div className="w-1/4 bg-blue-950 text-white h-screen">
          <Sidebar onCategorySelect={handleCategoryClick} />
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
          </div>

          {/* Mostrar Cards o Mapa */}
          <div className="flex-1">
            {showMap ? (
              <div style={{ height: "600px", width: "100%" }}>
                {/* Pasar lugares filtrados al mapa si están disponibles */}
                <Map places={filteredPlaces.length > 0 ? filteredPlaces : places} />
              </div>
            ) : places.length === 0 ? (
              <p>Cargando lugares...</p>
            ) : filteredPlaces.length === 0 ? (
              <p>No hay lugares para esta categoría.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredPlaces.map((place) => (
                  <div
                    key={place.id}
                    onClick={() => handleCardClick(place)}
                    className="cursor-pointer"
                  >
                    <Cards
                      image={place.image_url}
                      title={place.title}
                      description={place.description_place}
                      buttonText="Ver Más"
                      isPremium={place.status_type === 0}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedPlace && (
        <ModalFree onClose={closeModal}>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">{selectedPlace.title}</h2>
            <img
              src={selectedPlace.image_url}
              alt={selectedPlace.title}
              className="w-full h-64 object-cover rounded-md mb-4"
            />
            <p>{selectedPlace.description_place}</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Cerrar
            </button>
          </div>
        </ModalFree>
      )}
    </div>
  );
}

export default CategoryView;
