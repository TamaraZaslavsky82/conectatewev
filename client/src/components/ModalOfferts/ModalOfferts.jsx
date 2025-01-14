import React from 'react';

const ModalOfferts = ({ offer, onClose }) => {
  if (!offer) return null;

  const shareLink = `${window.location.origin}/ofertas/${offer.id}`;
  const whatsappLink = `https://wa.me/?text=¡Mira esta oferta! ${shareLink}`;
  const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${shareLink}`;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg overflow-hidden w-full md:w-2/3 lg:w-1/2 shadow-xl relative">
        <div className="h-80 w-full">
          <img
            src={offer.image_url}
            alt={offer.title}
            className="w-full h-full object-contain"
            style={{ objectFit: 'contain' }}
          />
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{offer.title}</h2>
          <p className="text-gray-700 mb-4">{offer.description_offer}</p>
          <div className="mt-4 flex space-x-4">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400"
            >
              Compartir en WhatsApp
            </a>
            <a
              href={facebookLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400"
            >
              Compartir en Facebook
            </a>
            <button
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalOfferts;
