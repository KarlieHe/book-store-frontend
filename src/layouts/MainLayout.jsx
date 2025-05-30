// src/layouts/MainLayout.jsx
import { Outlet } from "react-router-dom";
import "../App.css"; // Assuming you have a global CSS file for styles
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow px-4 py-8 max-w-screen-2xl mx-auto w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
