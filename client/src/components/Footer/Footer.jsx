import React from 'react';
import conexion from '../../assets/Logoconexion.png'
import conectate from '../../assets/Logoconectate.png'

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-4">
          Conéctate App es una plataforma no gubernamental, pero contamos con el apoyo de Conexión San Luis.
        </p>
        <div className="flex justify-center items-center space-x-4">
          <img src={conexion} alt="Logo Conexión San Luis" className="h-12" />
          <img src={conectate} alt="Logo Conéctate App" className="h-12" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;