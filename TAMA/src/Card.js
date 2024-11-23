import React from 'react';
import './Card.css'; // Importa el archivo de estilos

const Card = ({ lugar }) => {
  return (
    <div className="card">
      <h3>{lugar.title}</h3>

      {lugar.image && lugar.image.length > 0 && (
        <img src={lugar.image[0]} alt={lugar.title} />
      )}
    </div>
  );
};

export default Card;