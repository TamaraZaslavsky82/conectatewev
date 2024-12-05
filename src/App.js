import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './Card';
import Tiempo from './Tiempo';


import BotonesFijos from './BotonesFijos';
import SearchComponent from './SearchComponent';

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [lugaresDestacados, setLugaresDestacados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredResults, setFilteredResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://raw.githubusercontent.com/TamaraZaslavsky82/data/main/data.json');
                const data = await response.json();
                setLugaresDestacados(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);
 
    const generateRandomIndexes = (length, count) => {
        const indexes = [];
        while (indexes.length < count) {
            const randomIndex = Math.floor(Math.random() * length);
            if (!indexes.includes(randomIndex)) {
                indexes.push(randomIndex);
            }
        }
        return indexes; // Aquí se cerró correctamente la función
    };

    const botones = [
        { label: 'Inicio', onClick: () => console.log('Inicio') },
        { label: 'Categorias', onClick: () => console.log('Categoria') },
        { label: 'Encuentra en el mapa', onClick: () => console.log('Mapa') },
        { label: 'Eventos', onClick: () => console.log('Eventos') },
        { label: 'Sumate', onClick: () => console.log('Sumate') }
    ];
       

    return (
        <div className="App">
            <header>
                <div className="banner">
                    <Tiempo />
                </div>
                <h1>Conectate</h1>
                <p>Una plataforma desarrollada para encontrar todos lo que necesitas en San Francisco</p>
                <SearchComponent />
                <h2>Acceso rápido para turistas</h2>
                <button>Alojamientos</button>
                <button>Guias</button>
                <button>Comedores</button>
                <button>Lugares que tenes que conocer</button>
            </header>
            <main>
                <BotonesFijos botones={botones}/>
       
                <h2>Conoce nuestra municipalidad</h2>
                <button>Ingresa</button>
                <section id="featured-cards">
                    <h2>Lugares Destacados</h2>
                    {loading ? (
                        <p>Cargando lugares destacados...</p>
                    ) : (
                        <ul className="card-container">
                            {(searchTerm ? filteredResults : lugaresDestacados)
                                .filter(lugar => lugar.status === "Premium")
                                .slice(0, 5)
                                .map(lugar => (
                                    <li key={lugar.id}><Card lugar={lugar} /></li> // Cambiado a li
                                ))}
                        </ul>
                    )}
                </section>
                <h1>Conoce todos los puntos WIFI</h1>
                <button>Ingresa</button>
            </main>
        </div>
    );
};

export default App;