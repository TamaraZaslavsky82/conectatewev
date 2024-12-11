import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx"; // Importa el componente Footer
import CategoryView from "./views/CategoryView/CategoryView.jsx";
import DashboardAdmin from "./views/DashboardAdmin/DashboardAdmin.jsx";
import Home from "./views/Home/Home.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import PromotionView from "./views/PromotionsView/PromotionsView.jsx";
import EventView from "./views/EventsView/EventView.jsx";
import SumateApp from "./views/SumateApp/SumateApp.jsx";

function App() {
  const location = useLocation();

  // Mostrar el Navbar en todas las rutas excepto en "/dashboard"
  const showNavbar = location.pathname !== "/dashboard";

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
        </Routes>
      </div>
      <Footer /> {/* Incluye el Footer aquí */}
    </>
  );
}

export default App;
