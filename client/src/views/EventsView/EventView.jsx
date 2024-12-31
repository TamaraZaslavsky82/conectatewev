import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchSection from '../home/SearchSection/SearchSection';
import CardEvent from '../../views/EventsView/CardEvent/CardEvent'
import Pagination from '../../components/Pagination/Pagination';
import { GetCities, GetEvents } from '../../redux/actions';

// Modal Component to display event details
const EventModal = ({ event, onClose }) => {
  if (!event) return null;

  const formattedStartTime = new Date(event.start_time).toLocaleString();
  const formattedEndTime = new Date(event.end_time).toLocaleString();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-md shadow-lg p-6 w-4/5 md:w-3/5 lg:w-2/3 xl:w-1/2 relative">
        {/* Botón de cierre dentro del modal */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-yellow-500 text-white p-2 rounded-full"
        >
          X
        </button>
        <h2 className="text-2xl font-bold mb-4">{event.title}</h2>
        
        {/* Imagen ajustada para que sea más grande pero sin ocultar el contenido */}
        <img
          src={event.image_url}
          alt={event.title}
          className="w-full h-72 object-contain mb-4 rounded" // Cambié a h-72 para no ser tan grande, ocupando más espacio sin ocultar contenido
        />
        
        <p className="text-lg mb-4">{event.description_event}</p>
        <p className="font-semibold">Fecha de inicio: {formattedStartTime}</p>
        <p className="font-semibold">Fecha de fin: {formattedEndTime}</p>
      </div>
    </div>
  );
};

const EventView = () => {
  const dispatch = useDispatch();

  // Obtener eventos y localidades de la store
  const events = useSelector((state) => state.events); // Asegúrate de que `events` esté definido en el reducer
  const cities = useSelector((state) => state.cities); // Suponiendo que las ciudades están en el reducer

  const [selectedCity, setSelectedCity] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null); // Estado para el evento seleccionado
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para abrir/cerrar el modal

  useEffect(() => {
    dispatch(GetEvents());
    dispatch(GetCities());
  }, [dispatch]);

  // Filtrar eventos por ciudad seleccionada
  const filteredEvents = selectedCity
    ? events.filter((event) => event.id_places === selectedCity)
    : events;

  // Obtener la fecha actual
  const currentDate = new Date();

  // Filtrar eventos que están activos
  const upcomingEvents = filteredEvents.filter((event) => new Date(event.end_time) > currentDate);

  // Filtrar eventos que ya han pasado
  const pastEvents = filteredEvents.filter((event) => new Date(event.end_time) <= currentDate);

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  // Abrir el modal y establecer el evento seleccionado
  const handleShowMoreInfo = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  // Cerrar el modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="w-full px-0">
      {/* Sección de búsqueda */}
      <div className="w-full mb-6">
        <SearchSection />
      </div>

      {/* Selector de localidades */}
      <div className="flex justify-between items-center mb-6 bg-blue-950 text-gray-200 p-4 rounded-md">
        <div className="text-lg font-semibold">Eventos disponibles</div>
        <div className="flex items-center space-x-4">
          <div className="text-lg font-semibold">Localidades</div>
          <select
            value={selectedCity}
            onChange={handleCityChange}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todas las localidades</option>
            {cities &&
              cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.city}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Sección de eventos actuales */}
      {upcomingEvents.length > 0 && (
        <div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-120">
            {upcomingEvents.map((event) => (
              <CardEvent
                key={event.id} // Asegúrate de que cada evento tenga un id único
                title={event.title}
                image={event.image_url} // Pasa la URL de la imagen
                buttonText="Más Info"
                onButtonClick={() => handleShowMoreInfo(event)} // Manejador del botón
              />
            ))}
          </div>
        </div>
      )}

      {/* Sección de eventos pasados */}
      {pastEvents.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Eventos Pasados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <CardEvent
                key={event.id} // Asegúrate de que cada evento tenga un id único
                title={event.title}
                image={event.image_url} // Pasa la URL de la imagen
                buttonText="Más Info"
                onButtonClick={() => handleShowMoreInfo(event)} // Manejador del botón
              />
            ))}
          </div>
        </div>
      )}

      {/* Paginación */}
      <Pagination />

      {/* Modal */}
      {isModalOpen && <EventModal event={selectedEvent} onClose={handleCloseModal} />}
    </div>
  );
};

export default EventView;
