import React, { useState } from "react";

const NuevoAdmin = () => {
  const [categories, setCategories] = useState(["Alojamientos"]);
  const [newCategory, setNewCategory] = useState("");
  const [localidad, setLocalidad] = useState(["San Francisco"]);
  const [newLocalidad, setNewLocalidad] = useState("");
  const [status, setStatus] = useState("Free");
  const [images, setImages] = useState([]);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory === "new") {
      setNewCategory("");
    }
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };

  const handleLocalidadChange = (e) => {
    const selectedLocalidad = e.target.value;
    if (selectedLocalidad === "new") {
      setNewLocalidad("");
    }
  };

  const handleAddLocalidad = () => {
    if (newLocalidad && !localidad.includes(newLocalidad)) {
      setLocalidad([...localidad, newLocalidad]);
      setNewLocalidad("");
    }
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    if (e.target.value === "Free") {
      setImages([]); // Reset images for free users
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const maxImages = status === "Premium" ? 5 : 1;

    if (files.length + images.length > maxImages) {
      alert(`Los usuarios ${status} pueden subir hasta ${maxImages} imagen(es).`);
      return;
    }

    setImages([...images, ...files]);
  };

  return (
    <div className="p-4 border rounded shadow bg-white h-screen overflow-y-auto">
      <h1 className="text-xl font-bold mb-4">Nuevo Registro</h1>

      <form className="space-y-4">
        {/* Título */}
        <div>
          <label htmlFor="title" className="block font-semibold">Título:</label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full border p-2 rounded"
            placeholder="Ingrese el título"
          />
        </div>

        {/* Descripción */}
        <div>
          <label htmlFor="description" className="block font-semibold">Descripción:</label>
          <textarea
            id="description"
            name="description"
            className="w-full border p-2 rounded"
            placeholder="Ingrese la descripción"
            rows="4"
          ></textarea>
        </div>

        {/* Categoría */}
        <div>
          <label htmlFor="category" className="block font-semibold">Categoría:</label>
          <select
            id="category"
            name="category"
            className="w-full border p-2 rounded"
            onChange={handleCategoryChange}
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
            <option value="new">Agregar nueva categoría</option>
          </select>
          {newCategory !== null && (
            <div className="mt-2">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full border p-2 rounded"
                placeholder="Nueva categoría"
              />
              <button
                type="button"
                onClick={handleAddCategory}
                className="bg-blue-500 text-white mt-2 p-2 rounded hover:bg-blue-600"
              >
                Agregar categoría
              </button>
            </div>
          )}
        </div>

        {/* Localidad */}
        <div>
          <label htmlFor="localidad" className="block font-semibold">Localidad:</label>
          <select
            id="localidad"
            name="localidad"
            className="w-full border p-2 rounded"
            onChange={handleLocalidadChange}
          >
            {localidad.map((localida, index) => (
              <option key={index} value={localida}>{localida}</option>
            ))}
            <option value="new">Agregar nueva localidad</option>
          </select>
          {newLocalidad !== null && (
            <div className="mt-2">
              <input
                type="text"
                value={newLocalidad}
                onChange={(e) => setNewLocalidad(e.target.value)}
                className="w-full border p-2 rounded"
                placeholder="Nueva localidad"
              />
              <button
                type="button"
                onClick={handleAddLocalidad}
                className="bg-blue-500 text-white mt-2 p-2 rounded hover:bg-blue-600"
              >
                Agregar localidad
              </button>
            </div>
          )}
        </div>

        {/* Estado */}
        <div>
          <label htmlFor="status" className="block font-semibold">Estado:</label>
          <select
            id="status"
            name="status"
            className="w-full border p-2 rounded"
            value={status}
            onChange={handleStatusChange}
          >
            <option value="Free">Free</option>
            <option value="Premium">Premium</option>
          </select>
        </div>

        {/* Enlaces */}
        {status === "Premium" && (
          <div>
            <label htmlFor="website" className="block font-semibold">Sitio web:</label>
            <input
              type="url"
              id="website"
              name="website"
              className="w-full border p-2 rounded"
              placeholder="Ingrese el enlace del sitio web"
            />

            <label htmlFor="instagram" className="block font-semibold mt-2">Instagram:</label>
            <input
              type="url"
              id="instagram"
              name="instagram"
              className="w-full border p-2 rounded"
              placeholder="Ingrese el enlace de Instagram"
            />

            <label htmlFor="facebook" className="block font-semibold mt-2">Facebook:</label>
            <input
              type="url"
              id="facebook"
              name="facebook"
              className="w-full border p-2 rounded"
              placeholder="Ingrese el enlace de Facebook"
            />
          </div>
        )}

        {/* Imagen */}
        <div>
          <label htmlFor="image" className="block font-semibold">Subir Imagen:</label>
          <input
            type="file"
            id="image"
            name="image"
            className="w-full border p-2 rounded"
            accept="image/*"
            multiple={status === "Premium"}
            onChange={handleImageUpload}
          />
          <p className="text-sm text-gray-600">{`Puedes subir hasta ${status === "Premium" ? 5 : 1} imagen(es).`}</p>
        </div>

        {/* Ubicación */}
        <div>
          <label htmlFor="location" className="block font-semibold">Ubicación:</label>
          <input
            type="text"
            id="location"
            name="location"
            className="w-full border p-2 rounded"
            placeholder="Ingrese la ubicación"
          />
        </div>

        {/* Botón para enviar */}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Guardar
        </button>
      </form>
    </div>
  );
};

export default NuevoAdmin;