import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserAuth } from '../redux/features/auth/authSlice';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { UserIcon } from '@heroicons/react/24/outline';
import { useLogoutUserMutation } from '../redux/features/auth/authApi';
import { useNavigate } from 'react-router';
import { clearCart } from '../redux/features/cart/cartSlice';

import userImg from '../assets/avatar.png'

const navigation = [
    {name: "My Account", href:"/customer/profile"},
    {name: "Orders", href:"/customer/orders"},
    {name: "Cart Page", href:"/cart"},
  ]

const ProfileBtn = () => {

const navigate = useNavigate();
const dispatch = useDispatch();

const [isDropDownOpen, setIsDropDownOpen] = useState(false);
const dropdownRef = useRef(null);

let currentUser = useSelector(getCurrentUserAuth);
const [logoutUser] = useLogoutUserMutation();

const handleLogOut = async () => {
    await logoutUser().unwrap();
    dispatch(clearCart());
    setIsDropDownOpen(false);
    navigate('/');
}

useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropDownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!currentUser) {
        navigate('/');
    }}, [currentUser, navigate]);

  return (
    <div ref={dropdownRef} className='relative items-center flex'>
        {currentUser ? 
        <>
            <button className='w-12' onClick={() =>setIsDropDownOpen(!isDropDownOpen)}>
            <img 
                src={userImg} 
                alt='user' 
                className={`size-6 rounded-full ${currentUser ? 'ring-2 ring-blue-500' : ''}`} 
            />
            </button>
            {/* dropdowns */}
            {
            isDropDownOpen && (
                <div className='absolute top-full w-48 bg-white shadow-lg rounded-lg z-30'>
                    <ul className='py-2'>
                        {
                        navigation.map((item) => (
                            <li key={item.name} onClick={() => {
                            setIsDropDownOpen(false)}}>
                            <Link to={item.href} className='block text-sm px-4 py-2 hover:bg-gray-100'>
                                {item.name}
                            </Link>
                            </li>
                        ))
                        }
                        <li>
                            <button
                            onClick={handleLogOut}
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Logout</button>
                        </li>
                    </ul>
                </div>
            )
            }
        </> : 
        <Link to='/login' className='mr-4'>
            <UserIcon className='size-6 text-secondary' />
        </Link>
        }
    </div>
  )
}

export default ProfileBtn