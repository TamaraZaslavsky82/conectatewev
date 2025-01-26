import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { PostMensaje } from '../../redux/actions'; // Importa la acción que has creado
import SearchSection from '../home/SearchSection/SearchSection';

const SumateApp = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Enviar la información al backend usando la acción Redux
    const atributos = { nombre, apellido, telefono, mensaje };
    dispatch(PostMensaje(atributos))
      .then(() => {
        // Si la respuesta es exitosa, limpiar el formulario y mostrar mensaje
        alert("Mensaje enviado exitosamente.");
        setNombre("");
        setApellido("");
        setTelefono("");
        setMensaje("");
      })
      .catch((error) => {
        alert("Hubo un error al enviar el mensaje.");
        console.error(error);
      });
  };

  return (
    <section className="bg-gray-100 py-8">
      <SearchSection />
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4 p-6">Súmate a nuestra plataforma</h2>
        <p className="mb-4">
          Conéctate App es una plataforma diseñada para conectar y apoyar a la comunidad, uniendo la informacion de varias localidades del norte de San Luis. Queremos aclarar que ConectateApp es totalmente gratuito su ingreso y cuenta con una sección de pago para aquellos que deseen promocionar sus servicios.
        </p>
        <ul className="mb-4 list-disc list-inside">
        <p>Las personas que hicieron posible este proyecto:</p>
          <li>Programadora y creadora de proyecto - Tamara Anabella Zaslavsky</li>
          <li>Programador Backend - Alejandro Villamayor</li>
          <li>Consultor Externo - Juan Cruz Lima Caramico </li>
          <li>Programador junior - Ezequiel Barovero</li>
          <li>Diseñadora UI/UX - María Florencia Girardi</li>
          <li>Fotografía y contenido de imagen - Sofía Yehie Gabras </li>
        </ul>
        <p className="mb-4">Contáctanos: <a href="mailto:conectateapp@gmail.com" className="text-blue-500">contacto@conectatesl.com</a></p>
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-md">
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
          <input
            type="text"
            id="nombre"
            className="bg-slate-200 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-4"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-2">Apellido</label>
          <input
            type="text"
            id="apellido"
            className="bg-slate-200 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-4"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
          <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
          <input
            type="text"
            id="telefono"
            className="bg-slate-200 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-4"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
          <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-2">
            Envíanos un mensaje para sumarte:
          </label>
          <textarea
            id="mensaje"
            className="bg-slate-200 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-4"
            rows="4"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
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
