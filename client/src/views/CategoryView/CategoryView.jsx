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
  const [selectedCategory, setSelectedCategory] = useState(""); // Categoría seleccionada
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    dispatch(GetPlaces());
    dispatch(GetCategories());
  }, [dispatch]);

  useEffect(() => {
    // Filtrar lugares por categoría seleccionada
    if (selectedCategory) {
      const filtered = places.filter(
        (place) => String(place.id_category) === String(selectedCategory)
      );
      setFilteredPlaces(filtered);
    } else {
      setFilteredPlaces([...places]);
    }
  }, [selectedCategory, places]);

  const toggleView = () => {
    setShowMap((prev) => !prev);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // Establecer categoría seleccionada
    setCurrentPage(1); // Reiniciar la paginación
  };

  const currentData = filteredPlaces.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="w-full bg-gray-100 p-6">
        <SearchSection onIconSelect={handleCategoryClick} />
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
              <Map places={filteredPlaces.length > 0 ? filteredPlaces : places} />
            ) : filteredPlaces.length === 0 ? (
              <p>No hay lugares para esta categoría.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentData.map((place) => (
                  <div key={place.id}>
                    <Cards
                      image={place.status_type === 0 ? place.image_url : imagen}
                      title={place.title}
                      description={place.description_place}
                      buttonText="Ver Más"
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
        <Sidebar onCategorySelect={handleCategoryClick} />
      </div>
    </div>
  );
}

export default CategoryView;
