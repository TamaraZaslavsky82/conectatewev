import React from "react";
import bannerGif from '../../../assets/impuestos.gif'

const BannerSection = () => {
  return (
    <div className="bg-blue-950 flex items-center justify-center h-[280px] w-full">
      <img
        src={bannerGif}
        alt="Banner"
        className="w-[970px] h-[250px] object-cover"
      />
    </div>
  );
};

export default BannerSection;
