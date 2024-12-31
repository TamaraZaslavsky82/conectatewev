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
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiFog } from "react-icons/wi";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=San Francisco del Monte de Oro,ar&appid=92cfc5f22160d5a5d90297a265b279de&units=metric`
        );
        const data = await response.json();
        setWeatherData(data);
        console.log("Weather data: ", data);
      } catch (error) {
        console.error("Error fetching weather data: ", error);
      }
    };

    fetchWeather();
  }, []);

  const handleNavigate = (route) => {
    if (location.pathname !== route) {
      navigate(route);
    }
  };

  const getWeatherIcon = () => {
    if (!weatherData) return <WiDaySunny size={28} className="text-yellow-400" />;

    const weatherCondition = weatherData.weather[0].main;

    switch (weatherCondition) {
      case "Clear":
        return <WiDaySunny size={28} className="text-yellow-400" />;
      case "Clouds":
        return <WiCloud size={28} className="text-gray-400" />;
      case "Rain":
        return <WiRain size={28} className="text-blue-400" />;
      case "Snow":
        return <WiSnow size={28} className="text-white" />;
      case "Fog":
      case "Mist":
        return <WiFog size={28} className="text-gray-300" />;
      default:
        return <WiDaySunny size={28} className="text-yellow-400" />;
    }
  };

  return (
    <nav
      className={`font-inter text-primary fixed w-screen top-0 z-50 shadow-md transition-all duration-300 ${
        isScrolled ? "bg-blue-950 text-white" : "bg-transparent text-primary"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center space-x-1 py-4 px-1">
        <div className="flex items-center space-x-2">
          {getWeatherIcon()}
          {weatherData ? (
            <span className="text-sm">
              {Math.round(weatherData.main.temp)}°C - {weatherData.name}
            </span>
          ) : (
            <span className="text-sm">Cargando...</span>
          )}
        </div>

        <div className="flex space-x-4">
          <NavButton icon={<FaHome />} label="Inicio" onClick={() => handleNavigate("/")} />
          <NavButton icon={<FaTags />} label="Categorías" onClick={() => handleNavigate("/categorias")} />
          <NavButton icon={<FaMapMarkerAlt />} label="Mapa" onClick={() => setIsModalOpen(true)} /> {/* Abre el modal */}
          <NavButton icon={<FaCalendarAlt />} label="Eventos" onClick={() => handleNavigate("/eventos")} />
          <NavButton icon={<FaShoppingCart />} label="Ofertas" onClick={() => handleNavigate("/ofertas")} />
          <NavButton icon={<FaUserPlus />} label="Sumate" onClick={() => handleNavigate("/sumate")} />
        </div>

        <div className="flex flex-col space-y-2">
          <SocialButton icon={<FaFacebook />} link="https://facebook.com" />
          <SocialButton icon={<FaInstagram />} link="https://instagram.com" />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg  text-black font-semibold mb-4">Descargar Mapas</h2>
            <p className="mb-4 text-black">Desde este lugar tenemos disponible por el momento el mapa de rutas de todo San Luis.</p>
            <a
              href="/mapaSL.pdf" // Ruta del PDF en la carpeta public
              download="mapaSL.pdf"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block text-center"
            >
              Descargar Mapa
            </a>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
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
