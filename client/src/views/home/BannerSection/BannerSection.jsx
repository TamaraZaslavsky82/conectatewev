import React from "react";

const BannerSection = () => {
  return (
    <div className="bg-blue-950 flex items-center justify-center h-48 md:h-64 lg:h-72 w-full">
      <img
        src="https://via.placeholder.com/800x100" // URL de la imagen (puedes cambiarlo más adelante)
        alt="Banner"
        className="w-3/4 md:w-2/3 lg:w-1/2 object-contain"
      />
    </div>
  );
};

export default BannerSection;
