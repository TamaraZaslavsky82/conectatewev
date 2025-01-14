import React from "react";
import bannerGif from '../../../assets/Logoconexion.png';

const BannerSection = () => {
  return (
    <div className="bg-blue-950 flex items-center justify-center h-[280px] w-full">
      <img
        src={bannerGif}
        alt="Banner"
        className="w-full h-auto max-w-[970px] sm:h-[200px] md:h-[250px] lg:h-[280px] object-cover"
      />
    </div>
  );
};

export default BannerSection;
