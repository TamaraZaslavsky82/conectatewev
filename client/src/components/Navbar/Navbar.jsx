import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaTags,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaShoppingCart,
  FaUserPlus,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";
import { WiDaySunny } from "react-icons/wi";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Detectar desplazamiento
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Funciones de navegación
  const handleNavigate = (route) => {
    if (location.pathname !== route) {
      navigate(route);
    }
  };

  return (
    <nav
      className={`font-inter text-primary fixed w-screen top-0 z-50 shadow-md transition-all duration-300 ${
        isScrolled ? "bg-blue-950 text-white" : "bg-transparent text-primary"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center space-x-1 py-4 px-1">
        {/* Clima */}
        <div className="flex flex-col items-center space-x-2">
          <WiDaySunny size={28} className="text-yellow-400" />
          <span className="text-sm">25°C - San Francisco</span>
        </div>

        {/* Botones principales */}
        <div className="flex space-x-4">
          <NavButton
            icon={<FaHome />}
            label="Inicio"
            onClick={() => handleNavigate("/")}
          />
          <NavButton
            icon={<FaTags />}
            label="Categorías"
            onClick={() => handleNavigate("/categorias")}
          />
          <NavButton icon={<FaMapMarkerAlt />} label="Mapa" />
          <NavButton icon={<FaCalendarAlt />} 
          label="Eventos" 
          onClick={() => handleNavigate("/eventos")} 
          />
          <NavButton icon={<FaShoppingCart />} 
          label="Ofertas" 
          onClick={() => handleNavigate("/ofertas")} />
          <NavButton icon={<FaUserPlus />} label="Sumate" 
          onClick={() => handleNavigate("/sumate")}/>
        </div>

        {/* Redes Sociales */}
        <div className="flex flex-col space-y-2">
          <SocialButton icon={<FaFacebook />} link="https://facebook.com" />
          <SocialButton icon={<FaInstagram />} link="https://instagram.com" />
        </div>
      </div>
    </nav>
  );
};

const NavButton = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center hover:text-yellow-400"
  >
    {icon}
    <span className="text-xs mt-1 hidden tablet:block">{label}</span>
  </button>
);

const SocialButton = ({ icon, link }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-yellow-400"
  >
    {icon}
  </a>
);

export default Navbar;
