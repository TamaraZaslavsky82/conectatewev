import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PostPlace,
  GetCities,
  GetCategories,
 
} from "../../redux/actions"; // Asegúrate de que estas acciones estén correctamente implementadas
import { selectSorterPlaces } from "../../redux/selectors/selectors";
import { placesFormData, uploadImageToCloudinary } from "../../components/utils";

const CreatePlaceForm = () => {
  const [formData, setFormData] = useState(placesFormData);
  const dispatch = useDispatch();

  // Obtén las ciudades y categorías del estado global
  const cities = useSelector((state) => state.cities || []); // Usa un array vacío si es undefined
  const categories = useSelector((state) => state.categories || []); // Usa un array vacío si es undefined
  
  const places = useSelector(selectSorterPlaces);

  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    dispatch(GetCities());
    dispatch(GetCategories());
  }, [dispatch]);

  const handleInputChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === "image_url") {
      const file = files[0];
      setFormData({ ...formData, image_url: file });

      try {
        const uploadedUrl = await uploadImageToCloudinary(file);
        setImageUrl(uploadedUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formulario enviado");
  
    try {
      console.log(formData);
      
      const formDataToSubmit = { ...formData, image_url: imageUrl };
      console.log("Datos enviados al backend:", formDataToSubmit);
  await dispatch (PostPlace(formDataToSubmit));
     
    
  
      alert("Lugar creado con éxito");
    } catch (error) {
      console.error("Error en handleSubmit:", error);
      alert("Error al registrar el lugar: " + error.message);
    }
  };
  
  return (
    <div className="p-4 bg-gray-100">
      <h2 className="text-lg font-bold mb-4">Crear un nuevo lugar</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Título:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Descripción:</label>
          <textarea
            name="description_place"
            value={formData.description_place}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="image_url" className="block font-semibold">
            URL de la imagen:
          </label>
          <input
            type="file"
            id="image_url"
            name="image_url"
            className="w-full border p-2 rounded"
            onChange={handleInputChange}
          />
          {imageUrl && <img src={imageUrl} alt="Preview" />}
        </div>
        <div>
          <label className="block font-medium">Categoría:</label>
          <select
            name="id_category"
            value={formData.id_category}
            onChange={handleInputChange}
            className="w-full border rounded p-2 bg-white text-black"
            required
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((category, index) => (
  <option key={category.id || index} value={category.id}>
    {category.category}
  </option>
))}

            
          </select>
        </div>
        <div>
          <label className="block font-medium">Propietario:</label>
          <input
            type="text"
            name="owner_place"
            value={formData.owner_place}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium">Teléfono:</label>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium">Tipo de Estado:</label>
          <select
            name="status_type"
            value={formData.status_type}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
          >
            <option value={0}>Premium</option>
            <option value={1}>Free</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Latitud:</label>
          <input
            type="number"
            step="0.000001"
            name="latitude"
            value={formData.latitude}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium">Longitud:</label>
          <input
            type="number"
            step="0.000001"
            name="longitude"
            value={formData.longitude}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium">Etiquetas:</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium">Ciudad:</label>
          <select
            name="id_city"
            value={formData.id_city}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
            required
          >
            <option value="">Selecciona una ciudad</option>
            {cities.length > 0 ? (
              cities.map((city, index ) => (
                <option key={index} value={city.id}>
                  {city.city}
                </option>
              ))
            ) : (
              <option>Cargando ciudades...</option>
            )}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Crear Lugar
        </button>
      </form>
    </div>
  );
};

export default CreatePlaceForm;
