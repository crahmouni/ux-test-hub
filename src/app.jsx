import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/ui/navbar/navbar";
import Footer from "./components/footer/Footer";
import HomePage from "./pages/home";
import SearchPage from "./pages/search";
import PrototypeDetailPage from "./pages/prototype-detail";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import CreatePrototypePage from "./pages/creat-prototype";
import { PrivateRoute } from "./guards";

// Secciones de la Home Page
import HeroSection from "./components/hero/hero-section";
import FeaturesSection from "./components/features/features-section";
import AnalyticsSection from "./components/analytics/analytics-section";
import TestimonialsSection from "./components/testimonials/testimonials-section";
import CommunitySection from "./components/community/community-section";

function App() {
  return (
    <div className="min-h-screen w-screen bg-[#FDFDFD] font-[Inter]">
      <Navbar />

      <Routes>
        {/* Rutas de la aplicación */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/prototypes/:id" element={<PrototypeDetailPage />} />
        <Route
          path="/create-prototype"
          element={
            <PrivateRoute role="admin">
              <CreatePrototypePage />
            </PrivateRoute>
          }
        />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

      {/* Secciones de la Home Page */}
      <main className="pt-[72px]">
        <HeroSection />
        <FeaturesSection />
        <AnalyticsSection />
        <TestimonialsSection />
        <CommunitySection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
