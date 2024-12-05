// BotonesFijos.js
import React from 'react';
import './BotonesFijos.css'; // Importa el archivo CSS

const BotonesFijos = ({ botones }) => {
  return (
    <div className="botones-fijos-container">
      {botones.map((boton, index) => (
        <button key={index} className="fixed-button" onClick={boton.onClick}>
          {boton.label}
        </button>
      ))}
    </div>
  );
};

export default BotonesFijos;