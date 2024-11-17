import React from 'react';
import './carta.css'


const Carta = ({place}) => {
  function close(){
    document.getElementById('car').remove();
    
  }
    if (place == undefined){
        return <div></div>;
    }
    
  return (
    <div className="carta" id='carta'>
      <h2>{place.title}</h2>
      {place.image && place.image.length > 0 && (
        <img className='carta-img' src={place.image[0]} alt={place.title} />
      )}
      <p>Detalles sobre {place.title}...</p>
      <h3>{place.description}</h3>
      <button onClick={close}>Cerrar</button> 
    </div>
  );
};

export default Carta;