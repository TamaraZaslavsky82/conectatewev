import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetPlaces, UpdatePlace } from "../../redux/actions";

const ModifyPlace = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [searchTitle, setSearchTitle] = useState(""); // Nuevo estado para búsqueda por título
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [updatedFields, setUpdatedFields] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const cities = useSelector((state) => state.cities);
  const places = useSelector((state) => state.places);
  const dispatch = useDispatch();

  // Obtener lugares al montar el componente
  useEffect(() => {
    dispatch(GetPlaces());
  }, [dispatch]);

  // Filtrar lugares según la ciudad seleccionada y el título
  useEffect(() => {
    let filtered = places;

    if (selectedCity) {
      filtered = filtered.filter((place) => {
        const cityId = place?.id_city?.toString().toLowerCase().trim();
        const selected = selectedCity.toLowerCase().trim();
        return cityId === selected;
      });
    }

    if (searchTitle) {
      filtered = filtered.filter((place) =>
        place.title.toLowerCase().includes(searchTitle.toLowerCase().trim())
      );
    }

    setFilteredPlaces(filtered);
  }, [selectedCity, searchTitle, places]);

  // Manejar la actualización del lugar
  const handleUpdatePlace = () => {
    if (!selectedPlace || !updatedFields.title) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    dispatch(UpdatePlace(selectedPlace.id, updatedFields));
    alert("Lugar actualizado");
    setModalIsOpen(false);
    setSelectedPlace(null);
    setUpdatedFields({});
  };

  // Abrir el modal y cargar los datos del lugar seleccionado
  const openModal = (place) => {
    setSelectedPlace(place);
    setUpdatedFields({
      title: place.title || "",
      description_place: place.description_place || "",
      image_url: place.image_url || "",
      id_category: place.id_category || "",
      owner_place: place.owner_place || "",
      phone: place.phone || "",
      status_type: place.status_type || "",
      latitude: place.latitude || "",
      longitude: place.longitude || "",
      tags: place.tags || "",
      id_city: place.id_city || "",
    });
    setModalIsOpen(true);
  };

  return (
    <div>
      <h1>Modificar Lugares</h1>

      {/* Selección de Localidad */}
      <div>
        <label>Selecciona una Localidad:</label>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="">Todas las localidades</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id.toString()}>
              {city.city}
            </option>
          ))}
        </select>
      </div>

      {/* Búsqueda por título */}
      <div>
        <label>Buscar por título:</label>
        <input
          type="text"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          placeholder="Ingrese el título"
          className="block w-full mb-2 p-2 border rounded"
        />
      </div>

      {/* Lista de Lugares */}
      <div>
        <h2>Lugares:</h2>
        {filteredPlaces.length > 0 ? (
          <ul>
            {filteredPlaces.map((place) => (
              <li key={place.id}>
                {place.title}{" "}
                <button onClick={() => openModal(place)}>Editar</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No se encontraron lugares.</p>
        )}
      </div>

      {/* Modal para editar lugar */}
      {modalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-xl mb-4">Editando: {selectedPlace.title}</h2>
            <form>
              {[
                { name: "title", placeholder: "Título" },
                { name: "description_place", placeholder: "Descripción" },
                { name: "image_url", placeholder: "URL de la imagen" },
                { name: "id_category", placeholder: "ID de Categoría" },
                { name: "owner_place", placeholder: "Propietario" },
                { name: "phone", placeholder: "Teléfono" },
                { name: "status_type", placeholder: "Estado" },
                { name: "latitude", placeholder: "Latitud" },
                { name: "longitude", placeholder: "Longitud" },
                { name: "tags", placeholder: "Tags" },
                { name: "id_city", placeholder: "ID de Ciudad" },
              ].map((field) => (
                <input
                  key={field.name}
                  type="text"
                  value={updatedFields[field.name] || ""}
                  onChange={(e) =>
                    setUpdatedFields({
                      ...updatedFields,
                      [field.name]: e.target.value,
                    })
                  }
                  placeholder={field.placeholder}
                  className="block w-full mb-2 p-2 border rounded"
                />
              ))}
              <button
                type="button"
                onClick={handleUpdatePlace}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Guardar
              </button>
              <button
                type="button"
                onClick={() => setModalIsOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModifyPlace;
