import Navbar from "./components/Navbar/Navbar.jsx";
import CategoryView from "./views/CategoryView/CategoryView.jsx";
import DashboardAdmin from "./views/DashboardAdmin/DashboardAdmin.jsx";
import Home from "./views/Home/Home.jsx";
import { Routes, Route, useLocation } from "react-router-dom";

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
        </Routes>
      </div>
    </>
  );
}

export default App;
