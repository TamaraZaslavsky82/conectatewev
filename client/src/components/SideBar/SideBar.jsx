import React from "react";

const Sidebar = () => {
  // Categorías hardcodeadas
  const categories = ["Category A", "Category B", "Category C", "Category D"];

  return (
    <div className="bg-blue-950 text-white w-64 h-screen p-4">
      {/* Título */}
      <h2 className="text-lg font-bold mb-4">Selecciona una categoría</h2>
      
      {/* Lista de categorías */}
      <ul className="space-y-2">
        {categories.map((category, index) => (
          <li
            key={index}
            className="bg-blue-800 hover:bg-blue-700 rounded p-2 cursor-pointer"
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
