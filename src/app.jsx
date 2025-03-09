import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/ui/navbar/navbar";
import Footer from "./components/footer/Footer";
import HomePage from "./pages/home";
import SearchPage from "./pages/search";
import PrototypeDetailPage from "./pages/prototype-detail";
import LoginPage from "./pages/login";
import RegisterPage from "../src/pages/register";
import CreatePrototypePage from "./pages/creat-prototype";
import ConfirmEmailPage from "../src/pages/confirm-email";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';


function App() {
  return (
    <div className="min-h-screen w-screen bg-[#FDFDFD] font-[Inter]">
      <Navbar />

      <Routes>
        {/* Ruta principal */}
        <Route path="/" element={<HomePage />} />

        {/* Otras rutas */}
        <Route path="/prototypes/:id" element={<PrototypeDetailPage />} />
        <Route path="/create-prototype" element={<CreatePrototypePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/confirm-email" element={<ConfirmEmailPage />} /> {/* Ruta de confirmación */}
      </Routes>

      <Footer />
    </div>
  );
}

export default App;