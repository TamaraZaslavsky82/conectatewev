import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './Card';
import Tiempo from './Tiempo';
import image from './montaña.jpg';
import SearchComponent from './searcComponent';

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
 
    
        // Filtrar los resultados según el término de búsqueda
       

    return (
        <div className="App">
            <header>
                <div className="banner">
                    <Tiempo />
                </div>
                <h1>Descubre [Nombre del Lugar]</h1>
               
            </header>
            <main>
            <SearchComponent/>
                <section id="featured-cards">
                    <h2>Lugares Destacados</h2>
                    {loading ? (
                        <p>Cargando lugares destacados...</p>
                    ) : (
                        <ul className="card-container">
                           <div className="card-grid">
            {(searchTerm ? filteredResults : lugaresDestacados)
              .filter(lugar => lugar.status === "Premium")
              .slice(0, 5

              )
              .map(lugar => (
                <Card key={lugar.id} lugar={lugar} />
              ))}
          </div>
                        </ul>
                    )}
                </section>
                <main>
    
</main>
            </main>
        </div>
    );
};

export default App;