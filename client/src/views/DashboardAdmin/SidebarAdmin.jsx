import React from "react";

function SidebarAdmin({ setSeccion }) {
  const botones = ["Nuevo", "Eventos", "Ofertas", "Banners"];

  return (
    <div className="bg-blue-950 text-white w-64 h-screen p-4">
      {/* Título */}
      <h2 className="text-lg font-bold mb-4">Dashboard</h2>

      {/* Lista de categorías */}
      <ul className="space-y-2">
        {botones.map((boton, index) => (
          <li
            key={index}
            className="bg-blue-800 hover:bg-blue-700 rounded p-2 cursor-pointer"
            onClick={() => setSeccion(boton)} // Cambia la sección al hacer clic
          >
            {boton}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SidebarAdmin;
