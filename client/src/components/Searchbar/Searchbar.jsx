import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para navegar
import { GetCategories, GetEvents, GetOffers, GetPlaces } from '../../redux/actions';
import imagen from '../../assets/logoconectate.png'

// ModalFree (componente modal)
const ModalFree = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-md relative">
        {children}
        {/* Botón para cerrar el modal */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-blue-950 text-white px-4 py-2 rounded-md hover:bg-blue-800"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

const Searchbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Obtener los datos de Redux
  const places = useSelector((state) => state.places);
  const categories = useSelector((state) => state.categories);
  const events = useSelector((state) => state.events);
  const offers = useSelector((state) => state.offers);

  // Estado para la búsqueda
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null); // Estado para almacenar el lugar seleccionado

  // Cargar los datos de Redux cuando el componente se monta
  useEffect(() => {
    dispatch(GetPlaces());
    dispatch(GetCategories());
    dispatch(GetEvents());
    dispatch(GetOffers());
  }, [dispatch]);

  // Función para limpiar y convertir el string de tags en un array
  const parseTags = (tagsString) => {
    if (!tagsString) return [];
    const cleanedString = tagsString.replace(/["\[\]]/g, '').trim();
    return cleanedString.split(',').map((tag) => tag.trim());
  };

  // Función para manejar el cambio en el input de búsqueda
  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.length > 0) {
      const filteredResults = [
        ...(places || []).filter((place) => {
          const tags = parseTags(place.tags);
          return (
            tags.some((tag) => tag.toLowerCase().includes(query)) || // Buscar en tags
            (place.title && place.title.toLowerCase().includes(query)) // Verificar que title no sea undefined
          );
        }),
        ...(categories || []).filter((category) => {
          const tags = parseTags(category.tags);
          return (
            tags.some((tag) => tag.toLowerCase().includes(query)) || // Buscar en tags
            (category.title && category.title.toLowerCase().includes(query)) // Verificar que title no sea undefined
          );
        }),
        ...(events || []).filter((event) => {
          const tags = parseTags(event.tags);
          return (
            tags.some((tag) => tag.toLowerCase().includes(query)) || // Buscar en tags
            (event.title && event.title.toLowerCase().includes(query)) // Verificar que title no sea undefined
          );
        }),
        ...(offers || []).filter((offer) => {
          const tags = parseTags(offer.tags);
          return (
            tags.some((tag) => tag.toLowerCase().includes(query)) || // Buscar en tags
            (offer.title && offer.title.toLowerCase().includes(query)) // Verificar que title no sea undefined
          );
        }),
      ];

      setResults(filteredResults); // Actualizamos los resultados
    } else {
      setResults([]); // Limpiar resultados si el campo está vacío
    }
  };

  // Función para manejar la selección de un lugar y redirigir o abrir el modal
  const handleSelectPlace = (id, statusType) => {
    const selectedPlace = places.find((place) => place.id === id); // Buscar el lugar por su ID
    setSelectedPlace(selectedPlace); // Establecer el lugar seleccionado en el estado

    if (statusType === 0) {
      // Si status_type es 0, redirigimos al componente de la card
      navigate(`/place/${id}`); // Redirige a la página correspondiente
    } else if (statusType === 1) {
      // Si status_type es 1, abrimos el modal con la información
      setIsModalOpen(true);
    }
    setResults([]); // Limpiar los resultados de búsqueda
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPlace(null); // Limpiar el lugar seleccionado al cerrar el modal
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Buscar..."
        className="w-full max-w-md px-4 py-2 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Mostrar los resultados filtrados */}
      {results.length > 0 && (
        <ul className="absolute w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto z-10">
          {results.map((item, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 text-black cursor-pointer"
              onClick={() => handleSelectPlace(item.id, item.status_type)} // Llamamos a la función con el id y el status_type
            >
              {item.title || item.name}
            </li>
          ))}
        </ul>
      )}

      {/* Mostrar el ModalFree cuando se haya seleccionado un lugar */}
      {isModalOpen && selectedPlace && (
        <ModalFree onClose={closeModal}>
         <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4 text-black">{selectedPlace.title}</h2>
                    <img
                      src={imagen}
                      alt={selectedPlace.title}
                      className="w-full h-64 object-cover rounded-md mb-4"
                    />
                    <p className="text-gray-700 text-base">{selectedPlace.description_place}</p>
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
};

export default Searchbar;
