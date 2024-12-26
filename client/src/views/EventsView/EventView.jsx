import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchSection from '../home/SearchSection/SearchSection';
import Card from '../../components/Cards/Cards';
import Pagination from '../../components/Pagination/Pagination';
import { GetCities, GetEvents } from '../../redux/actions';

const EventView = () => {
  const dispatch = useDispatch();

  // Obtener eventos y localidades de la store
  const events = useSelector((state) => state.events); // Asegúrate de que `events` esté definido en el reducer
  const cities = useSelector((state) => state.cities); // Suponiendo que las ciudades están en el reducer

  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    dispatch(GetEvents());
    dispatch(GetCities());
  }, [dispatch]);

  // Filtrar eventos por ciudad seleccionada
  const filteredEvents = selectedCity
    ? events.filter((event) => event.id_places === selectedCity)
    : events;

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
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

      {/* Mostrar las tarjetas de eventos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredEvents && filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <Card
              key={event.id} // Asegúrate de que cada evento tenga un id único
              title={event.title}
              description={event.description_event}
              date={`${event.start_time} - ${event.end_time}`}
              location={cities.find((city) => city.id === event.id_places)?.city || 'Sin localidad'}
              image={event.image_url} // Pasa la URL de la imagen
              buttonText="Más Info"
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No hay eventos disponibles.
          </div>
        )}
      </div>

      {/* Paginación */}
      <Pagination />
    </div>
  );
};

export default EventView;
