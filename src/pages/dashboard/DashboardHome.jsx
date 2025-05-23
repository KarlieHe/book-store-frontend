import { Link, useNavigate } from 'react-router-dom';
import { useEffect  } from 'react';
import { getCurrentUserRole } from '../../redux/features/auth/authSlice';
import { useSelector } from 'react-redux';
const DashboardHome = () => {
  const navigate = useNavigate();
 let currentUserRole = useSelector(getCurrentUserRole);
 console.log(currentUserRole)
  useEffect(() => {
    if (currentUserRole !== "admin") {
      navigate("/");
    }
  }, [currentUserRole, navigate]);
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <ul className="space-y-2">
        <li><Link to="/dashboard/orders" className="underline">Manage Orders</Link></li>
        <li><Link to="/dashboard/inventory" className="underline">Manage Inventory</Link></li>
        <li><Link to="/dashboard/users" className="underline">Manage Users</Link></li>
      </ul>
    </div>
  );
};

export default DashboardHome;
