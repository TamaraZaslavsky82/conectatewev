import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { PostSocialMedia } from "../../redux/actions"; 

const SocialMediaForm = ({ socialMediaLinks, setSocialMediaLinks }) => {
  return (
    <div>
      <label>Redes Sociales (URL):</label>
      {socialMediaLinks.map((link, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <input
            type="url"
            placeholder={`Enlace ${index + 1}`}
            value={link}
            onChange={(e) => {
              const updatedLinks = [...socialMediaLinks];
              updatedLinks[index] = e.target.value;
              setSocialMediaLinks(updatedLinks);
            }}
            required
          />
          {socialMediaLinks.length > 1 && (
            <button type="button" onClick={() => {
              const updatedLinks = socialMediaLinks.filter((_, i) => i !== index);
              setSocialMediaLinks(updatedLinks);
            }}>
              Eliminar
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={() => setSocialMediaLinks([...socialMediaLinks, ""])}>
        Agregar otro enlace
      </button>
    </div>
  );
};

export default SocialMediaForm;
