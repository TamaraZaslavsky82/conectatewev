import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetImageBanner, GetCities, PostImageBanner } from "../../redux/actions";
import { selectSorterCities } from "../../redux/selectors/selectors";
import { imageBannerFormData , uploadImageToCloudinary } from "../../components/utils";

function BannersAdmin() {
  const [formData, setFormData] = useState(imageBannerFormData);
  const dispatch = useDispatch();
  const cities = useSelector(selectSorterCities);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    dispatch(GetCities());
  }, [dispatch]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación para asegurarse de que id_city no esté vacío
    if (!formData.id_city) {
      alert("Por favor, selecciona un lugar.");
      return; // No se envía el formulario si id_city está vacío
    }

    try {
      const formDataToSubmit = { ...formData, image_url: imageUrl };

      // Enviar los datos al backend
      await dispatch(PostImageBanner(formDataToSubmit));
      await dispatch(GetImageBanner());

      // Resetear el formulario
      setFormData(imageBannerFormData);
    } catch (error) {
      console.error("Error al registrar el event: ", error);
    }
  };

  console.log(formData);

  return (
    <div className="p-4 border rounded shadow bg-white h-screen overflow-y-auto">
      <h1 className="text-xl font-bold mb-4">Nuevo Banner</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Título */}
        <div>
          <label htmlFor="signature_author" className="block font-semibold">
            Autor
          </label>
          <input
            type="text"
            id="signature_author"
            name="signature_author"
            className="w-full border p-2 rounded"
            value={formData.signature_author}
            onChange={handleInputChange}
            placeholder="Ingrese el título"
          />
        </div>

        {/* Lugar */}
        <div>
          <label htmlFor="id_city" className="block font-semibold">
            Lugar:
          </label>
          <select
            id="id_city" // Cambié id_cities a id_city
            name="id_city" // Cambié id_cities a id_city
            className="w-full border p-2 rounded"
            value={formData.id_city} // Cambié id_cities a id_city
            onChange={handleInputChange}
          >
            <option value="" disabled>
              {cities.length === 0 ? "Cargando lugares..." : "Seleccione un lugar"}
            </option>
            {cities.map((place) => (
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
            placeholder="Ingrese la URL de la imagen"
            onChange={handleInputChange}
          />
          <p className="text-sm text-gray-600">
            {`Puedes subir hasta ${status === "Premium" ? 5 : 1} imagen(es).`}
          </p>
        </div>
        {imageUrl && (<img src={imageUrl} alt="Vista previa de la imagen" />)}

        {/* Botón de envío */}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Crear Banner
        </button>
      </form>
    </div>
  );
}

export default BannersAdmin;
