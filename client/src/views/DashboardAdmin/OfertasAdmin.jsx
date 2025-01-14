import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetOffers, GetPlaces, PostOffers } from "../../redux/actions";
import { selectSorterPlaces } from "../../redux/selectors/selectors";
import { offersFormData, uploadImageToCloudinary } from "../../components/utils";

function OffersAdmin() {
  const [formData, setFormData] = useState(offersFormData);
  const dispatch = useDispatch();
  const places = useSelector(selectSorterPlaces);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    dispatch(GetPlaces());
  }, [dispatch]);

  // Función para manejar los cambios en los campos del formulario
   const handleInputChange = async (e) => {
      const { name, value, files } = e.target;
      if (name === "image_url") {
        const file = files[0];
        console.log("Selected file:", file);
        setFormData({ ...formData, image_url: file });
  
        try {
          const uploadedUrl = await uploadImageToCloudinary(file);
          setImageUrl(uploadedUrl);
          console.log("Uploaded URL:", uploadedUrl);
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      } else {
        setFormData({ ...formData, [name]: value });
      }
    };

  // Función para manejar el submit del formulario
  const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       const formDataToSubmit = { ...formData, image_url: imageUrl };
 
       await dispatch(PostOffers(formDataToSubmit));
       await dispatch(GetOffers());
       setFormData(offersFormData);
     } catch (error) {
       console.error("Error al registrar oferta: ", error);
     }
   };

  return (
    <div className="p-4 border rounded shadow bg-white h-screen overflow-y-auto">
      <h1 className="text-xl font-bold mb-4">Nuevo Evento</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Título */}
        <div>
          <label htmlFor="title" className="block font-semibold">
            Título:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full border p-2 rounded"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Ingrese el título"
          />
        </div>

        {/* Descripción */}
        <div>
          <label htmlFor="description_offer" className="block font-semibold">
            Descripción:
          </label>
          <textarea
  id="description_offer"
  name="description_offer"
  value={formData.description_offer}
  onChange={handleInputChange}
  placeholder="Ingrese la descripción"
></textarea>

        </div>

        {/* Lugar */}
        <div>
          <label htmlFor="id_places" className="block font-semibold">
            Lugar:
          </label>
          <select
            id="id_places"
            name="id_places"
            className="w-full border p-2 rounded"
            value={formData.id_places}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              {places.length === 0 ? "Cargando lugares..." : "Seleccione un lugar"}
            </option>
            {places.map((place) => (
              <option key={place.id} value={place.id}>
                {place.title}
              </option>
            ))}
          </select>
        </div>

        {/* Subir imagen */}
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
          <p className="text-sm text-gray-600">
            {`Puedes subir hasta ${status === "Premium" ? 5 : 1} imagen(es).`}
          </p>
        </div>
        {imageUrl && (<img src={imageUrl} alt="Imagen subida" className="mt-4 w-32 h-32 object-cover" />)}

        {/* Hora de inicio */}
        <div>
          <label htmlFor="start_time" className="block font-semibold">
            Hora de inicio:
          </label>
          <input
            type="datetime-local"
            id="start_time"
            name="start_time"
            className="w-full border p-2 rounded"
            value={formData.start_time}
            onChange={handleInputChange}
          />
        </div>

        {/* Hora de fin */}
        <div>
          <label htmlFor="end_time" className="block font-semibold">
            Hora de fin:
          </label>
          <input
            type="datetime-local"
            id="end_time"
            name="end_time"
            className="w-full border p-2 rounded"
            value={formData.end_time}
            onChange={handleInputChange}
          />
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Crear oferta
        </button>
      </form>
    </div>
  );
}

export default OffersAdmin;
