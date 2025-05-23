// src/layouts/MainLayout.jsx
import { Outlet } from "react-router-dom";
import "../App.css"; // Assuming you have a global CSS file for styles
import Navbar from "../components/Navbar";
import Footer from "../pages/home/Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen max-w-screen-2xl mx-auto px-4 py-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
