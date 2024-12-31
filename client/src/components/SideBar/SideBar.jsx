import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetCategories } from "../../redux/actions";

const Sidebar = ({ onCategorySelect }) => {
  const categories = useSelector((state) => state.categories); // Verifica si `categories` está bien definido
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetCategories())
      .then((response) => {
        console.log("Datos recibidos:", response); // Verifica la respuesta aquí
      })
      .catch((error) => {
        console.error("Error al obtener las categorías:", error);
      });
  }, [dispatch]);

  // Ordenar categorías alfabéticamente
  const sortedCategories = categories
    ? [...categories].sort((a, b) => {
        const nameA = (a.name || a.category || "").toLowerCase();
        const nameB = (b.name || b.category || "").toLowerCase();
        return nameA.localeCompare(nameB);
      })
    : [];

  return (
    <div className="bg-blue-950 text-white w-64 h-screen md:h-screen p-4 overflow-y-auto">

      {/* Título */}
      <h2 className="text-lg font-bold mb-4">Selecciona una categoría</h2>

      {/* Lista de categorías */}
      <ul className="space-y-2">
        {/* Opción para todas las categorías */}
        <li
          onClick={() => onCategorySelect("")} // Selecciona todas las categorías
          className="bg-blue-800 hover:bg-blue-700 rounded p-2 cursor-pointer break-words"
        >
          Todas las categorías
        </li>

        {sortedCategories.length > 0 ? (
          sortedCategories.map((category) => (
            <li
              key={category.id} // Usa `id` como clave única
              onClick={() => onCategorySelect(category.id)} // Selecciona categoría específica
              className="bg-blue-800 hover:bg-blue-700 rounded p-2 cursor-pointer break-words"
              style={{
                whiteSpace: "normal", // Permite saltos de línea
                wordWrap: "break-word", // Rompe palabras largas
                wordBreak: "break-word", // Maneja desbordamientos
              }}
            >
              {category.name || category.category || "Sin categoría"}
            </li>
          ))
        ) : (
          <p>Cargando categorías...</p>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
