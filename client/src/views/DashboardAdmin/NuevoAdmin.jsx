import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetCategories, GetCities, PostCategory, PostCities } from "../../redux/actions";
import CreatePlaceForm from "./CreatePlaceForm";

const NuevoAdmin = () => {
  const [newCategory, setNewCategory] = useState("");
  const [description, setDescription] = useState("");
  const [newLocalidad, setNewLocalidad] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const categories = useSelector((state) => state.categories); // Categorías desde Redux
  const cities = useSelector((state) => state.cities); // Localidades desde Redux
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetCategories()); // Cargar categorías al montar el componente
    dispatch(GetCities()); // Cargar ciudades al montar el componente
  }, [dispatch]);

  // Manejar creación de nueva categoría
  const handleAddCategory = () => {
    if (
      newCategory.trim() &&
      Array.isArray(categories) && // Verifica que categories sea un arreglo
      !categories.some((cat) => cat.category === newCategory)
    ) {
      const newCategoryObject = {
        id: categories.length + 1,
        category: newCategory,
        description_category: description || "Descripción por defecto",
      };
      dispatch(PostCategory(newCategoryObject));
      setNewCategory("");
      setDescription("");
    } else {
      alert("La categoría ya existe o el campo está vacío.");
    }
  };
  

  // Manejar creación de nueva localidad
  const handleAddLocalidad = () => {
    if (
      newLocalidad.trim() &&
      latitude.trim() &&
      longitude.trim() &&
      !cities.some((loc) => loc.city === newLocalidad)
    ) {
      const newLocalidadObject = {
        id: cities.length + 1, // Generar un id único basado en el tamaño actual
        city: newLocalidad,
        latitude: latitude,
        longitude: longitude,
      };
      dispatch(PostCities(newLocalidadObject)); // Crear localidad en el backend
      setNewLocalidad(""); // Limpiar input
      setLatitude(""); // Limpiar input
      setLongitude(""); // Limpiar input
    } else {
      alert("La localidad ya existe, o algún campo está vacío.");
    }
  };

  return (
    <div className="p-4 border rounded shadow bg-white h-screen overflow-y-auto">
      <h1 className="text-xl font-bold mb-4">Nuevo Registro</h1>

      <form className="space-y-6">
        {/* Sección de Categorías */}
        <div className="mt-4">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Nueva categoría"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded mt-2"
            placeholder="Descripción de la categoría"
          />
          <button
            type="button"
            onClick={handleAddCategory}
            className="bg-blue-500 text-white mt-2 p-2 rounded hover:bg-blue-600"
          >
            Agregar categoría
          </button>
        </div>

        {/* Sección de Localidades */}
        <div className="mt-4">
          <input
            type="text"
            value={newLocalidad}
            onChange={(e) => setNewLocalidad(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Nueva localidad"
          />
          <input
            type="text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className="w-full border p-2 rounded mt-2"
            placeholder="Latitud"
          />
          <input
            type="text"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            className="w-full border p-2 rounded mt-2"
            placeholder="Longitud"
          />
          <button
            type="button"
            onClick={handleAddLocalidad}
            className="bg-green-500 text-white mt-2 p-2 rounded hover:bg-green-600"
          >
            Agregar localidad
          </button>
        </div>
      </form>
          <CreatePlaceForm/>
    </div>
  );
};

export default NuevoAdmin;
