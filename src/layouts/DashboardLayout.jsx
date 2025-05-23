// src/layouts/DashboardLayout.jsx
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-white border-r w-64 p-4 flex-shrink-0 transition-transform duration-300 z-20 fixed md:static top-0 h-full md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h1 className="text-xl font-bold mb-6">📚 BookStore</h1>
        <nav className="space-y-4 pl-3 text-lg font-secondary font-thin">
          <Link to="/dashboard/inventory" className="block">Inventory</Link>
            <Link to="/dashboard/add-new-book" className="block">Add a book</Link>
          <Link to="/dashboard/orders" className="block">Orders</Link>
          <Link to="/dashboard/customers" className="block">Customers</Link>
          {/* <Link to="/dashboard/discounts" className="block">Discounts</Link> */}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between p-4 border-b bg-white shadow-sm">
          <button className="md:hidden" onClick={toggleSidebar}>
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <input
            type="text"
            placeholder="Search..."
            className="border rounded px-3 py-1 w-1/2 text-sm"
          />
          <div className="flex items-center space-x-2">
            <span className="text-sm">🔔</span>
            <span className="text-sm">👤</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
