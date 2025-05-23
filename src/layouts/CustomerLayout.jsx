// CustomerLayout.jsx
import { NavLink, Outlet } from "react-router-dom";
import { SquaresPlusIcon, UserCircleIcon, ReceiptPercentIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";

export default function CustomerLayout() {
  return (
    <div className="grid grid-cols-3 gap-8">
      {/* Sidebar */}
      <aside className=" bg-white p-6 rounded-3xl shadow-lg">
        <div className="space-y-6">
          {/* <SidebarItem to="dashboard" icon="SquaresPlusIcon" label="Dashboard" /> */}
          <SidebarItem to="profile" icon="UserCircleIcon" label="My Account" />
          <SidebarItem to="orders" icon="ReceiptPercentIcon" label="Orders" />
        </div>
      </aside>

      {/* Main content */}
      <main className="bg-white rounded-3xl p-8 shadow-lg col-span-2">
        <Outlet />
      </main>
    </div>
  );
}


function SidebarItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 text-black px-4 py-2 rounded transition 
         ${isActive ? "border-l-4 border-yellow-400 bg-yellow-50 font-bold" : "hover:bg-gray-100"}`
      }
    >
        {icon === "SquaresPlusIcon" && <SquaresPlusIcon className="h-6 w-6" />}
        {icon === "ReceiptPercentIcon" && <ReceiptPercentIcon className="h-6 w-6" />}
        {icon === "UserCircleIcon" && <UserCircleIcon className="h-6 w-6" />}
      <span>{label}</span>
    </NavLink>
  );
}

SidebarItem.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
