import Navbar from "./components/Navbar/Navbar.jsx";
import DashboardAdmin from "./views/DashboardAdmin/DashboardAdmin.jsx";
import Home from "./views/Home/Home.jsx";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
function App() {
  const location = useLocation();
  return (
    <>
      <div className="w-full h-full text-6xl flex justify-center items-center ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<DashboardAdmin />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
