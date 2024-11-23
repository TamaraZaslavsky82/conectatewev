import React, { useState, useEffect } from 'react';

// Asegúrate de definir las variables de las imágenes de fondo
const clearSky = './clear.jpg'; // Reemplaza con la URL real
const rain = './rain.jpg'; // Reemplaza con la URL real
const wind = './windy.jpg'; // Reemplaza con la URL real
const clouds = './clouds.jpg'; // Reemplaza con la URL real

const Tiempo = () => {
    const [weatherData, setWeatherData] = useState(null);

    const weatherBackgrounds = {
        'Clear': clearSky,
        'Rain': rain,
        'Wind': wind,
        'Clouds': clouds,
    };

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=San Francisco del Monte de Oro,ar&appid=92cfc5f22160d5a5d90297a265b279de`);
                const data = await response.json();
                setWeatherData(data);
                console.log("Weather data: ", data);
            } catch (error) {
                console.error("Error fetching weather data: ", error);
            }
        };

        fetchWeather();
    }, []);

    // Verifica si weatherData está disponible
    if (!weatherData) {
        return <div>Cargando datos del clima...</div>; // Mensaje de carga
    }

    return (
        <div
            className="weather-background"
            style={{ backgroundImage: `url(${weatherBackgrounds[weatherData.weather[0].main]})` }}
        >
            <div className="overlay">
                <div className="icon-container">
                    <img
                        src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                        alt="Weather Icon"
                        className="weather-icon" // Aumenta estas dimensiones para hacer el icono más grande
                    />
                     <p style={{color: 'black', fontSize: 20, marginTop: 10}}>
        Térmica: {Math.round(weatherData.main.feels_like - 273.15)}°C
      </p>
      <p style={{color: 'black', fontSize: 20, marginTop: 10}}>
        Viento: {(weatherData.wind.speed * 3.6).toFixed(2)} km/h
      </p>
      <p style={{color: 'black', fontSize: 20, marginTop: 10}}>
        Rachas: {(weatherData.wind.gust * 3.6).toFixed(2)} km/h
      </p>
                </div>
            </div>
        </div>
    );
}

export default Tiempo;