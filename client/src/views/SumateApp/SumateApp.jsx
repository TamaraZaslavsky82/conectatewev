import React, { useState } from 'react';
import SearchSection from '../home/SearchSection/SearchSection';

const SumateApp = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Mensaje enviado: ${message}`);
    setMessage("");
  };

  return (
    <section className="bg-gray-100 py-8">
      <SearchSection />
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4 p-6">Súmate a nuestra plataforma</h2>
        <p className="mb-4">
          Conéctate App es una plataforma diseñada para conectar y apoyar a la comunidad, uniendo la informacion de varias localidades del norte de San Luis. Queremos aclarar que ConectateApp es totalemente gratuito su ingreso y cuenta con una seccion de pago para aquellos que deseen promocionar sus servicios.
        </p>
        <ul className="mb-4 list-disc list-inside">
        <p>Las personas que hicieron posible este proyecto:</p>
          <li>Programadora y creadora de proyecto - Tamara Anabella Zaslavsky</li>
          <li>Programador Backend - Alejandro Villamayor</li>
          <li>Consultor Externo - Juan Cruz Lima Caramico </li>
          <li>Programador junion - Ezequiel Barovero</li>
          <li>Diseñadora UI/UX - María Florencia Girardi</li>
          <li>Fotografia y contenide de imagen - Sofía Yehie Gabras </li>
        </ul>
        <p className="mb-4">Contáctanos: <a href="mailto:conectateapp@gmail.com" className="text-blue-500">appconectate@gmail.com</a></p>
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-md">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Envíanos un mensaje para sumarte:
          </label>
          <textarea
            id="message"
            className="bg-slate-200 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-4"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Enviar
          </button>
        </form>
      </div>
    </section>
  );
};

export default SumateApp;
