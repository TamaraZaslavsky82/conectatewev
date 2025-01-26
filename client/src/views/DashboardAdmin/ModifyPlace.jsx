import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetPlaces, UpdatePlace, PostPremiumPlaceImg, PostSocialMedia } from "../../redux/actions";
import { uploadImageToCloudinary } from "../../components/utils";

const ModifyPlace = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [selectedStatusType, setSelectedStatusType] = useState("");
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [imageUploadModalOpen, setImageUploadModalOpen] = useState(false);
  const [socialMediaModalOpen, setSocialMediaModalOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [newSocialMediaList, setNewSocialMediaList] = useState([
    { social_media_type: 0, link: "" },
  ]);

  const cities = useSelector((state) => state.cities);
  const places = useSelector((state) => state.places);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetPlaces());
  }, [dispatch]);

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

    if (selectedStatusType) {
      filtered = filtered.filter(
        (place) => place.status_type.toString() === selectedStatusType
      );
    }

    setFilteredPlaces(filtered);
  }, [selectedCity, searchTitle, selectedStatusType, places]);

  const openSocialMediaModal = (place) => {
    setSelectedPlace(place);
    setNewSocialMediaList([{ social_media_type: 0, link: "" }]);
    setSocialMediaModalOpen(true);
  };

  const openImageUploadModal = (place) => {
    setSelectedPlace(place);
    setImageUploadModalOpen(true);
    setUploadedImages([]);
  };

  const handleImageUpload = (e) => {
    if (e.target.files.length + uploadedImages.length > 4) {
      alert("Solo puedes cargar hasta 4 imágenes.");
      return;
    }

    const files = Array.from(e.target.files);
    setUploadedImages([...uploadedImages, ...files]);
  };

  const handleSubmitImages = async () => {
    if (uploadedImages.length === 0) {
      alert("Selecciona al menos una imagen.");
      return;
    }

    try {
      for (let image of uploadedImages) {
        const secure_url = await uploadImageToCloudinary(image);
        if (!secure_url) {
          alert("Error al subir la imagen. Intenta nuevamente.");
          return;
        }

        const atributos = {
          url_img: secure_url,
          id_place: String(selectedPlace.id),
        };

        console.log("Datos enviados al backend (imágenes):", atributos);
        await dispatch(PostPremiumPlaceImg(atributos));
      }

      alert("Imágenes cargadas exitosamente.");
      setImageUploadModalOpen(false);
    } catch (error) {
      console.error("Error al cargar las imágenes:", error);
      alert("Ocurrió un error al cargar las imágenes.");
    }
  };

  const handleAddSocialMediaRow = () => {
    setNewSocialMediaList([
      ...newSocialMediaList,
      { social_media_type: 0, link: "" },
    ]);
  };

  const handleRemoveSocialMediaRow = (index) => {
    setNewSocialMediaList(newSocialMediaList.filter((_, i) => i !== index));
  };

  const handleUpdateSocialMedia = (index, field, value) => {
    const updatedList = [...newSocialMediaList];
    updatedList[index][field] = value;
    setNewSocialMediaList(updatedList);
  };

  const handleAddSocialMedia = async () => {
    try {
      for (let socialMedia of newSocialMediaList) {
        if (!socialMedia.link) {
          alert("Por favor, asegúrate de que todos los enlaces sean válidos.");
          return;
        }

        const atributos = {
          ...socialMedia,
          id_place: selectedPlace.id,
        };

        console.log("Datos enviados al backend (redes sociales):", atributos);
        await dispatch(PostSocialMedia(atributos));
      }

      alert("Redes sociales agregadas exitosamente.");
      setSocialMediaModalOpen(false);
    } catch (error) {
      console.error("Error al agregar las redes sociales:", error);
      alert("Ocurrió un error al agregar las redes sociales.");
    }
  };

  return (
    <div>
  <h1>Modificar Lugares</h1>

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

  <div>
    <label>Filtrar por tipo de estado:</label>
    <select
      value={selectedStatusType}
      onChange={(e) => setSelectedStatusType(e.target.value)}
    >
      <option value="">Todos</option>
      <option value="0">Premium</option>
      <option value="1">Free</option>
    </select>
  </div>

  <div>
    <h2>Lugares:</h2>
    <div
      style={{
        maxHeight: "600px", // Altura máxima para la lista
        overflowY: "auto", // Habilita el scroll vertical
        border: "1px solid #ccc", // Opcional: bordes para resaltar el área
        padding: "10px",
        borderRadius: "8px",
      }}
    >
      {filteredPlaces.length > 0 ? (
        <ul>
          {filteredPlaces.map((place) => (
            <li key={place.id}>
              {place.title}{" "}
              <button onClick={() => openModal(place)}>Editar</button>
              {place.status_type === 0 && (
                <>
                  <button
                    onClick={() => openImageUploadModal(place)}
                    className="ml-2 bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Cargar Imágenes
                  </button>
                  <button
                    onClick={() => openSocialMediaModal(place)}
                    className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Agregar Red Social
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron lugares.</p>
      )}
    </div>
  </div>

  {/* Modal para subir imágenes */}
  {imageUploadModalOpen && (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-1/2"
        style={{
          maxHeight: "80vh", // Limita la altura del modal
          overflowY: "auto", // Agrega scroll si el contenido desborda
        }}
      >
        <h2 className="text-xl mb-4">
          Cargar Imágenes para: {selectedPlace.title}
        </h2>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full mb-4"
        />
        <p>Imágenes seleccionadas: {uploadedImages.length}</p>
        <button
          onClick={handleSubmitImages}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Subir
        </button>
        <button
          onClick={() => setImageUploadModalOpen(false)}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancelar
        </button>
      </div>
    </div>
  )}

  {/* Modal para agregar redes sociales */}
  {socialMediaModalOpen && (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-1/3"
        style={{
          maxHeight: "80vh", // Limita la altura del modal
          overflowY: "auto", // Agrega scroll si el contenido desborda
        }}
      >
        <h2 className="text-xl mb-4">
          Agregar Redes Sociales para: {selectedPlace.title}
        </h2>
        {newSocialMediaList.map((socialMedia, index) => (
          <div key={index} className="mb-4">
            <label>Tipo de Red Social:</label>
            <select
              value={socialMedia.social_media_type}
              onChange={(e) =>
                handleUpdateSocialMedia(index, "social_media_type", Number(e.target.value))
              }
              className="block w-full p-2 border rounded"
            >
              <option value={0}>Facebook</option>
              <option value={1}>Instagram</option>
              <option value={2}>Sitio Web</option>
              <option value={3}>Otros</option>
            </select>
            <label>Enlace:</label>
            <input
              type="url"
              value={socialMedia.link}
              onChange={(e) =>
                handleUpdateSocialMedia(index, "link", e.target.value)
              }
              placeholder="https://"
              className="block w-full p-2 border rounded mt-2"
            />
            <button
              onClick={() => handleRemoveSocialMediaRow(index)}
              className="bg-red-500 text-white px-4 py-2 rounded mt-2"
            >
              Eliminar
            </button>
          </div>
        ))}
        <button
          onClick={handleAddSocialMediaRow}
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
        >
          Agregar Otra Red Social
        </button>
        <button
          onClick={handleAddSocialMedia}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Guardar
        </button>
        <button
          onClick={() => setSocialMediaModalOpen(false)}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancelar
        </button>
      </div>
    </div>
  )}
</div>

  );
};

export default ModifyPlace;
