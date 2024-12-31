import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/SideBar/SideBar";
import SearchSection from "../home/SearchSection/SearchSection";
import Cards from "../../components/Cards/Cards";
import ModalFree from "../../components/ModalFree/ModalFree";
import { GetPlaces, GetCategories } from "../../redux/actions";
import Map from "../../components/MapView/Map";
import Pagination from "../../components/Pagination/Pagination";
import imagen from "../../assets/logoconectate.png";

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    dispatch(GetPlaces());
    dispatch(GetCategories());
  }, [dispatch]);

  useEffect(() => {
    if (places && places.length > 0) {
      if (selectedCategory) {
        const filtered = places.filter((place) => {
          const placeCategory = place.id_category
            ? String(place.id_category).toLowerCase().trim()
            : "";
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
    setCurrentPage(1);
  };

  const handleBackToCategories = () => {
    setSelectedCategory("");
    setCurrentPage(1);
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

  const currentData = filteredPlaces.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="w-full bg-gray-100 p-6">
        <SearchSection />
      </div>

      {/* Vista de escritorio */}
      <div className="hidden md:flex flex-row w-full">
        <div className="w-1/4 bg-blue-950 text-white h-screen fixed md:relative">
          <Sidebar onCategorySelect={handleCategoryClick} />
        </div>
        <div className="w-full md:w-3/4 md:ml-1/4 p-4 flex flex-col">
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
              <div style={{ height: "600px", width: "100%" }}>
                <Map places={filteredPlaces.length > 0 ? filteredPlaces : places} />
              </div>
            ) : places.length === 0 ? (
              <p>Cargando lugares...</p>
            ) : filteredPlaces.length === 0 ? (
              <p>No hay lugares para esta categoría.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentData.map((place) => (
                  <div
                    key={place.id}
                    onClick={() => handleCardClick(place)}
                    className="cursor-pointer"
                  >
                    <Cards
                      image={place.status_type === 0 ? place.image_url : imagen}
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
          <Pagination
            totalItems={filteredPlaces.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* Vista móvil */}
      <div className="block md:hidden w-full h-screen flex flex-col p-4 overflow-hidden">
        {selectedCategory ? (
          <div className="w-full flex-1 overflow-y-auto">
            <div className="space-y-4">
              {currentData.length > 0 ? (
                currentData.map((place) => (
                  <div
                    key={place.id}
                    className="border-b border-gray-300 pb-2 cursor-pointer"
                    onClick={() => handleCardClick(place)}
                  >
                    <h3 className="text-lg font-semibold flex items-center">
                      {place.title}
                      {place.status_type === 0 && (
                        <span className="ml-2 text-yellow-400">⭐</span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-600 truncate">
                      {place.description_place.length > 100
                        ? `${place.description_place.substring(0, 100)}...`
                        : place.description_place}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center">No hay lugares disponibles para esta categoría.</p>
              )}
            </div>
            <button
              onClick={handleBackToCategories}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mt-4 w-full"
            >
              Volver a las categorías
            </button>
          </div>
        ) : (
          <div className="w-full flex-1 flex flex-col justify-center items-center overflow-hidden">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Selecciona una Categoría
            </h2>
            <div className="flex justify-center w-full">
              <Sidebar onCategorySelect={handleCategoryClick} />
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedPlace && (
        <ModalFree onClose={closeModal}>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">{selectedPlace.title}</h2>
            <img
              src={imagen}
              alt={selectedPlace.title}
              className="w-full h-64 object-cover rounded-md mb-4"
            />
            <p>{selectedPlace.description_place}</p>
            <p className="text-gray-700 text-base">
              Teléfono de contacto: {selectedPlace.phone}
            </p>
            <div className="flex space-x-4">
              <a
                href={`tel:${selectedPlace.phone}`}
                className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-md"
              >
                Llamar
              </a>
              <a
                href={`https://wa.me/${selectedPlace.phone}`}
                className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded-md shadow-md"
              >
                Enviar WhatsApp
              </a>
            </div>
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
