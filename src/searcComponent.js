import React, { useState, useEffect } from 'react';

function SearchComponent() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/TamaraZaslavsky82/data/main/data.json')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredData = data.filter(item => {
    if (!searchQuery) return false; // Si no hay consulta, no filtrar

    const searchTerms = searchQuery.split(' ');
    const itemText = `${item.title?.toLowerCase()} ${item.description?.toLowerCase()} ${item.tags?.join(' ').toLowerCase()}`;

    // Comprueba si TODOS los términos de búsqueda están presentes en el elemento
    return searchTerms.every(term => itemText.includes(term));
  });

  return (
    <div>
      {isLoading ? (
        <p>Cargando datos...</p>
      ) : error ? (
        <p>Error al cargar datos: {error.message}</p>
      ) : (
        <>
          <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Buscar..." />
          {filteredData.length > 0 ? (
            <ul>
              {filteredData.map(item => (
                <li key={item.id}>{item.title || item.name}</li>
              ))}
            </ul>
          ) : !searchQuery ? (
            <p>Ingresa una palabra clave para buscar.</p>
          ) : (
            <p>No se encontraron resultados.</p>
          )}
        </>
      )}
    </div>
  );
}

export default SearchComponent;