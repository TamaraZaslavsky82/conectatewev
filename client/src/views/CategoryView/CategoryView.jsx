import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/SideBar/SideBar";
import SearchSection from "../home/SearchSection/SearchSection";
import Cards from "../../components/Cards/Cards";
import ModalFree from "../../components/ModalFree/ModalFree";
import { GetPlaces, GetCategories } from "../../redux/actions";
import MapView from "../../components/MapView/MapView";

function CategoryView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const places = useSelector((state) => state.places);
  const categories = useSelector((state) => state.categories);

  const [showMap, setShowMap] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(GetPlaces());
    dispatch(GetCategories());
  }, [dispatch]);

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

  const handleCardClick = (place) => {
    if (place.status_type === 0) {
      // Redirigir a la página de detalle para lugares premium
      navigate(`/place/${place.id}`);
    } else if (place.status_type === 1) {
      // Abrir el modal para lugares no premium
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
        <div className="w-1/4 bg-blue-950 text-white h-screen">
          <Sidebar />
        </div>

        <div className="w-3/4 p-4 flex flex-col">
          <div className="flex justify-between mb-4">
            <button
              onClick={toggleView}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              {showMap ? "Volver a Cards" : "Buscar en el mapa"}
            </button>
          </div>

          <div className="flex-1">
            {showMap ? (
              <MapView />
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
