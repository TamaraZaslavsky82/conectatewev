import React from "react";
import {
  FaHome,
  FaTags,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaShoppingCart,
  FaUserPlus,
} from "react-icons/fa";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { WiDaySunny } from "react-icons/wi";

const Navbar = () => {
  return (
    <nav className="font-inter text-primary fixed w-screen top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center space-x-1 py-4 px-1">
        {/* Clima */}
        <div className="flex flex-col items-center space-x-2">
          <WiDaySunny size={28} className="text-yellow-400" />
          <span className="text-sm">25°C - San Fransisco</span>
        </div>

        {/* Botones principales */}
        <div className="flex space-x-4 ">
          <NavButton icon={<FaHome />} label="Inicio" />
          <NavButton icon={<FaTags />} label="Categorias" />
          <NavButton icon={<FaMapMarkerAlt />} label="Mapa" />
          <NavButton icon={<FaCalendarAlt />} label="Eventos" />
          <NavButton icon={<FaShoppingCart />} label="Ofertas" />
          <NavButton icon={<FaUserPlus />} label="Sumate" />
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

const NavButton = ({ icon, label }) => (
  <button className="flex flex-col items-center hover:text-yellow-400">
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
