import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../../../components/Cards/Cards";
import { GetPlaces } from "../../../redux/actions";

const DestacadosSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [premiumCards, setPremiumCards] = useState([]);
  const places = useSelector((state) => state.places);

  useEffect(() => {
    dispatch(GetPlaces());
  }, [dispatch]);

  useEffect(() => {
    if (places && Array.isArray(places) && places.length > 0) {
      const premiumPlaces = places.filter((place) => place.status_type === 0);
      const shuffled = premiumPlaces.sort(() => 0.5 - Math.random());
      setPremiumCards(shuffled.slice(0, 3));
    } else {
      console.error("places no es un array o está vacío:", places);
    }
  }, [places]);
  

  const handleViewMore = (id) => {
    navigate(`/place/${id}`);
  };

  return (
    <div className="relative bg-cover bg-center py-16 px-4 md:px-8 bg-gradient-to-r from-blue-950 to-blue-900">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 text-white flex flex-col items-start space-y-8">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Destacados</h2>
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {premiumCards.map((place) => (
              <div
                key={place.id}
                className="flex flex-col items-center bg-white rounded-xl shadow-2xl w-80 h-96 relative transform transition-transform hover:scale-105 p-4"
              >
                <div className="w-full flex justify-end">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-6 h-6 text-yellow-500"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </div>
                </div>
                <Card
                  image={place.image_url}
                  title={place.title}
                  description={place.description}
                  buttonText="Ver más"
                  isPremium={place.isPremium}
                  place={place}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestacadosSection;
