import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import Card from "../../components/Cards/Cards";
import { GetCities, GetOffers } from "../../redux/actions";
import ModalOfferts from "../../components/ModalOfferts/ModalOfferts";
import SearchSection from "../Home/SearchSection/SearchSection";

const PromotionView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Capturar el ID desde la URL

  const offers = useSelector((state) => state.offers);
  const cities = useSelector((state) => state.cities);

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedOffer, setSelectedOffer] = useState(null);

  useEffect(() => {
    dispatch(GetOffers());
    dispatch(GetCities());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      const offer = offers.find((o) => o.id === parseInt(id));
      if (offer) {
        const location = cities.find((city) => city.id === offer.id_places)?.city || "Sin localidad";
        setSelectedOffer({ ...offer, location });
      }
    }
  }, [id, offers, cities]);

  // Filtrar ofertas basadas en la ciudad seleccionada y si no han expirado
  const filteredOffers = offers
    .filter((offer) => {
      const now = new Date();
      const offerEndDate = new Date(offer.end_time);
      return offerEndDate >= now; // Solo incluye ofertas válidas
    })
    .filter((offer) => (selectedCity ? offer.id_places === selectedCity : true));

  const handleCardClick = (offer) => {
    navigate(`/ofertas/${offer.id}`);
  };

  const handleCloseModal = () => {
    setSelectedOffer(null);
    navigate("/ofertas");
  };

  return (
    <div className="w-full px-0">
      <div className="w-full mb-6">
        <SearchSection />
      </div>
   <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {filteredOffers.length > 0 ? (
          filteredOffers.map((offer) => (
            <div
              key={offer.id}
              onClick={() => handleCardClick(offer)}
              className="cursor-pointer"
            >
              <Card
                title={offer.title}
                description={offer.description_offer}
                location={
                  cities.find((city) => city.id === offer.id_places)?.city ||
                  "Sin localidad"
                }
                image={offer.image_url}
                buttonText="Más Info"
              />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No hay ofertas disponibles.
          </div>
        )}
      </div>
      {selectedOffer && (
        <ModalOfferts offer={selectedOffer} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default PromotionView;
