import React, { useState } from "react";

function EventosAdmin() {
  
  const [localidad, setLocalidad] = useState(["San Francisco"]);
  const [newLocalidad, setNewLocalidad] = useState("");
  
  const [images, setImages] = useState([]);

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
       <h1 className="text-xl font-bold mb-4">Nuevo Evento</h1>
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
        </form>
      
    </div>
  )
}

export default EventosAdmin