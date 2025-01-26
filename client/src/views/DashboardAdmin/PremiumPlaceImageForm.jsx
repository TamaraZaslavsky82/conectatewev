import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { PostPremiumPlaceImg } from "../../redux/actions"; 

const PremiumPlaceImageForm = ({ premiumImages, setPremiumImages }) => {
  // Usar los estados y funciones pasados como props desde el componente principal
  return (
    <div>
      <label>Imágenes Premium (URL):</label>
      {premiumImages.map((image, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <input
            type="url"
            placeholder={`Imagen ${index + 1}`}
            value={image}
            onChange={(e) => {
              const updatedImages = [...premiumImages];
              updatedImages[index] = e.target.value;
              setPremiumImages(updatedImages);
            }}
            required
          />
          {premiumImages.length > 1 && (
            <button type="button" onClick={() => {
              const updatedImages = premiumImages.filter((_, i) => i !== index);
              setPremiumImages(updatedImages);
            }}>
              Eliminar
            </button>
          )}
        </div>
      ))}
      {premiumImages.length < 5 && (
        <button type="button" onClick={() => setPremiumImages([...premiumImages, ""])}>
          Agregar otra imagen
        </button>
      )}
    </div>
  );
};

export default PremiumPlaceImageForm;
