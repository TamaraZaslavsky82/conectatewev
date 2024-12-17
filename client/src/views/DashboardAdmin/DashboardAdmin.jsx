import React, { useState } from "react";
import SidebarAdmin from "./SidebarAdmin";
import NuevoAdmin from "./NuevoAdmin";
// Importa otros componentes según las secciones
import EventosAdmin from "./EventosAdmin";
import OfertasAdmin from "./OfertasAdmin";
import BannersAdmin from "./BannersAdmin";

function DashboardAdmin() {
  const [seccion, setSeccion] = useState("Nuevo"); // Estado para la sección activa

  // Función para renderizar dinámicamente el contenido
  const renderSeccion = () => {
    switch (seccion) {
      case "Nuevo":
        return <NuevoAdmin />;
      case "Eventos":
        return <EventosAdmin />;
      case "Ofertas":
        return <OfertasAdmin />;
      case "Banners":
        return <BannersAdmin />;
      default:
        return <NuevoAdmin />;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white">
        <SidebarAdmin setSeccion={setSeccion} />
      </div>

      {/* Contenido dinámico */}
      <div className="flex-1 p-4">{renderSeccion()}</div>
    </div>
  );
}

export default DashboardAdmin;
