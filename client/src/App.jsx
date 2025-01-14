import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Home from "./views/Home/Home.jsx"; // Importa Home
import DashboardAdmin from "./views/DashboardAdmin/DashboardAdmin.jsx";
import CategoryView from "./views/CategoryView/CategoryView.jsx";
import PromotionView from "./views/PromotionsView/PromotionsView.jsx";
import EventView from "./views/EventsView/EventView.jsx";
import SumateApp from "./views/SumateApp/SumateApp.jsx";
import Card from "./components/Card/Card.jsx";
import ModalFree from "./components/ModalFree/ModalFree.jsx";
import ModalHighlight from "./components/ModalHighlight/ModalHighlight.jsx";
import ModalEvent from "./components/ModalEvent/ModalEvent.jsx"; // Importa ModalEvent
import { GetPlaces, GetEvents } from "./redux/actions";
import ModalOfferts from "./components/ModalOfferts/ModalOfferts.jsx";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const places = useSelector((state) => state.places);
  const events = useSelector((state) => state.events);

  const [showEventModal, setShowEventModal] = useState(true); // Estado para mostrar el modal

  const showNavbar = location.pathname !== "/dashboard";
  const showFooter = location.pathname !== "/dashboard";

  useEffect(() => {
    if (!places || places.length === 0) {
      dispatch(GetPlaces());
    }
    if (!events || events.length === 0) {
      dispatch(GetEvents());
    }
  }, [dispatch, places, events]);

  const closeEventModal = () => {
    setShowEventModal(false);
  };

  return (
    <>
      {showNavbar && <Navbar />}
      <div className="w-screen max-w-full overflow-hidden pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<DashboardAdmin />} />
          <Route path="/categorias" element={<CategoryView />} />
          <Route path="/ofertas" element={<PromotionView />} />
          <Route path="/ofertas/:id" element={<PromotionView />} />
          <Route path="/eventos" element={<EventView />} />
          <Route path="/sumate" element={<SumateApp />} />
          <Route path="/place/:id" element={<Card />} />
        </Routes>
      </div>
      {showFooter && <Footer />}
      
      {/* Modal para eventos */}
      {location.pathname === "/" && showEventModal && (
        <ModalEvent events={events} onClose={closeEventModal} />
      )}
    </>
  );
}

export default App;
