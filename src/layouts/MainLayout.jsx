// src/layouts/MainLayout.jsx
import { Outlet } from "react-router-dom";
import "../App.css"; // Assuming you have a global CSS file for styles
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TopBanner from "../components/TopBanner";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <header className="sticky top-0 bg-white z-50">
          <TopBanner />
          <Navbar />
        </header>
        <main className="flex-grow px-2 md:px-4 max-w-screen-2xl mx-auto w-full">
          <Outlet />
        </main>
        <Footer />
        <ToastContainer position="top" />
      </div>
    </>
  );
};

export default MainLayout;
