import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Home from "./views/Home/Home.jsx";
import DashboardAdmin from "./views/DashboardAdmin/DashboardAdmin.jsx";
import CategoryView from "./views/CategoryView/CategoryView.jsx";
import PromotionView from "./views/PromotionsView/PromotionsView.jsx";
import EventView from "./views/EventsView/EventView.jsx";
import SumateApp from "./views/SumateApp/SumateApp.jsx";
import Card from "./components/Card/Card.jsx";
import ModalEvent from "./components/ModalEvent/ModalEvent.jsx";
import { GetPlaces, GetEvents } from "./redux/actions";
import IntroPage from "./IntroPage.jsx";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const places = useSelector((state) => state.places);
  const events = useSelector((state) => state.events);

  const [showEventModal, setShowEventModal] = useState(true);
  const [deferredPrompt, setDeferredPrompt] = useState(null); // Manejo del prompt de instalación
  const [isInstalled, setIsInstalled] = useState(false); // Estado para verificar si está instalada

  const isIntroPage = location.pathname === "/";

  useEffect(() => {
    if (!places || places.length === 0) {
      dispatch(GetPlaces());
    }
    if (!events || events.length === 0) {
      dispatch(GetEvents());
    }
  }, [dispatch, places, events]);

  // Detectar si la aplicación ya está instalada
  useEffect(() => {
    const checkIfInstalled = () => {
      if (window.matchMedia("(display-mode: standalone)").matches) {
        setIsInstalled(true);
      } else {
        setIsInstalled(false);
      }
    };

    checkIfInstalled();
    window.addEventListener("appinstalled", checkIfInstalled);

    return () => {
      window.removeEventListener("appinstalled", checkIfInstalled);
    };
  }, []);

  // Capturar el evento beforeinstallprompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      console.log("Evento beforeinstallprompt capturado.");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("El usuario aceptó instalar la aplicación.");
        } else {
          console.log("El usuario rechazó instalar la aplicación.");
        }
        setDeferredPrompt(null);
      });
    }
  };

  const closeEventModal = () => {
    setShowEventModal(false);
  };

  const handleIntroPageNavigation = () => {
    navigate("/home");
  };

  return (
    <>
      {!isIntroPage && <Navbar />}
      <div className="w-screen max-w-full overflow-hidden ">
        <Routes>
          <Route
            path="/"
            element={<IntroPage onNavigate={handleIntroPageNavigation} />}
          />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<DashboardAdmin />} />
          <Route path="/categorias" element={<CategoryView />} />
          <Route path="/ofertas" element={<PromotionView />} />
          <Route path="/ofertas/:id" element={<PromotionView />} />
          <Route path="/eventos" element={<EventView />} />
          <Route path="/sumate" element={<SumateApp />} />
          <Route path="/place/:id" element={<Card />} />
        </Routes>
      </div>
      {!isIntroPage && <Footer />}

      {/* Modal para eventos */}
      {location.pathname === "/home" && showEventModal && (
        <ModalEvent events={events} onClose={closeEventModal} />
      )}

      {/* Botón de instalación */}
      {!isInstalled && deferredPrompt && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 1000,
          }}
        >
          <button
            onClick={handleInstallClick}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Añadir a la pantalla de inicio
          </button>
        </div>
      )}
    </>
  );
}

export default App;
