import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import SearchSection from "./SearchSection/SearchSection";
import MunicipalidadSection from "./MunicipalidadSection/MunicipalidadSection";
import DestacadosSection from "./DestacadosSection/DestacadosSection";
import InformationSection from "./InformationSection/InformationSection";

const Home = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <SearchSection/>
      <MunicipalidadSection/>
      <DestacadosSection/>
      <InformationSection/>
    </div>
  );
};

export default Home;
