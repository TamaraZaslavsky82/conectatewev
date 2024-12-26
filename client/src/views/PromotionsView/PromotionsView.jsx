import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchSection from '../home/SearchSection/SearchSection';
import Card from '../../components/Cards/Cards';
import Pagination from '../../components/Pagination/Pagination';
import { GetCities, GetOffers } from '../../redux/actions';

const PromotionViews = () => {
  const dispatch = useDispatch();

  // Obtener offeros y localidades de la store
  const offers = useSelector((state) => state.offers); // Asegúrate de que `offers` esté definido en el reducer
  const cities = useSelector((state) => state.cities); // Suponiendo que las ciudades están en el reducer

  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    dispatch(GetOffers());
    dispatch(GetCities());
  }, [dispatch]);

  // Filtrar offeros por ciudad seleccionada
  const filteredoffers = selectedCity
    ? offers.filter((offer) => offer.id_places === selectedCity)
    : offers;

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
        <div className="text-lg font-semibold">Ofertas disponibles</div>
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

      {/* Mostrar las tarjetas de offeros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredoffers && filteredoffers.length > 0 ? (
          filteredoffers.map((offer) => (
            <Card
              key={offer.id} // Asegúrate de que cada offero tenga un id único
              title={offer.title}
              description={offer.description_offer}
              date={`${offer.start_time} - ${offer.end_time}`}
              location={cities.find((city) => city.id === offer.id_places)?.city || 'Sin localidad'}
              image={offer.image_url} // Pasa la URL de la imagen
              buttonText="Más Info"
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No hay offeros disponibles.
          </div>
        )}
      </div>

      {/* Paginación */}
      <Pagination />
    </div>
  );
};

export default PromotionViews;
