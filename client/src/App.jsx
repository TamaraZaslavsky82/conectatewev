import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import CategoryView from "./views/CategoryView/CategoryView.jsx";
import DashboardAdmin from "./views/DashboardAdmin/DashboardAdmin.jsx";
import Home from "./views/Home/Home.jsx";
import PromotionView from "./views/PromotionsView/PromotionsView.jsx";
import EventView from "./views/EventsView/EventView.jsx";
import SumateApp from "./views/SumateApp/SumateApp.jsx";
import Card from "./components/Card/Card.jsx";
import ModalFree from "./components/ModalFree/ModalFree.jsx";
import ModalHighlight from "./components/ModalHighlight/ModalHighlight.jsx";
import ModalEvent from "./components/ModalEvent/ModalEvent.jsx";
import { GetPlaces, GetEvents } from "./redux/actions";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const places = useSelector((state) => state.places);
  const events = useSelector((state) => state.events);

  // Mostrar el Navbar y Footer en todas las rutas excepto en "/dashboard"
  const showNavbar = location.pathname !== "/dashboard";
  const showFooter = location.pathname !== "/dashboard";

  useEffect(() => {
    // Llamadas a Redux solo si los datos no están cargados
    if (!places || places.length === 0) {
      dispatch(GetPlaces());
    }
    if (!events || events.length === 0) {
      dispatch(GetEvents());
    }
  }, [dispatch, places, events]);

  return (
    <>
      {showNavbar && <Navbar />}
      <div className="w-screen max-w-full overflow-hidden pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<DashboardAdmin />} />
          <Route path="/categorias" element={<CategoryView />} />
          <Route path="/ofertas" element={<PromotionView />} />
          <Route path="/eventos" element={<EventView />} />
          <Route path="/sumate" element={<SumateApp />} />
          <Route path="/place/:id" element={<Card />} />
          <Route path="/modalfree/:id" element={<ModalFree />} />
        </Routes>
      </div>
      {/* Modales globales */}
      <ModalHighlight places={places} />
      {location.pathname === "/" && <ModalEvent events={events} />}
      {showFooter && <Footer />}
    </>
  );
}

export default App;
