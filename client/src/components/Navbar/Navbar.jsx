import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaTags,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaShoppingCart,
  FaUserPlus,
  FaPhoneAlt,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiFog } from "react-icons/wi";
import PharmacyOnDutyList from "../../views/home/PharmacyOnDutyList";

const Navbar = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
  const navigate = useNavigate();
  const location = useLocation();

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
    <nav className="font-inter text-primary fixed w-screen top-0 z-50 shadow-md bg-blue-950 text-white">
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
          <NavButton icon={<FaHome />} label="Inicio" onClick={() => handleNavigate("/home")} />
          <NavButton icon={<FaTags />} label="Categorías" onClick={() => handleNavigate("/categorias")} />
          <NavButton icon={<FaPhoneAlt />} label="Teléfonos Útiles" onClick={() => setIsModalOpen(true)} />
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
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold text-black mb-4">Números de Emergencia</h2>
            <ul className="text-black space-y-2">
              <li><strong>Emergencias Generales:</strong> 911</li>
              <li><strong>Bomberos:</strong> 100</li>
              <li><strong>Policía:</strong> 101</li>
              <li><strong>Emergencias Médicas:</strong> 107</li>
              <li><strong>Hospital San Francisco:</strong> (2664) 443010</li>
            </ul>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-yellow-600  hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
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
