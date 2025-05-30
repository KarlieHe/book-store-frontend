import { Bars3CenterLeftIcon, MagnifyingGlassIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router'
import { useState } from 'react'
import { useDebounce } from '../hooks/useDebounce';
import { UserIcon } from "@heroicons/react/24/outline";

import { useLogoutUserMutation } from '../redux/features/auth/authApi';
import { getCurrentUserAuth } from '../redux/features/auth/authSlice';
import { useSelector } from 'react-redux';
import { clearCart } from '../redux/features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import { useFetchBooksQuery } from '../redux/features/books/booksApi';


import userImg from '../assets/avatar.png'

const navigation = [
  {name: "My Account", href:"/customer/profile"},
  {name: "Orders", href:"/customer/orders"},
  {name: "Cart Page", href:"/cart"},
]

const Navbar = () => {
    const [searchInput, setSearchInput] = useState('');
    const debouncedSearch = useDebounce(searchInput, 500);
    const { data, isLoading: searchLoading } = useFetchBooksQuery({ search: debouncedSearch }, {
      skip: !debouncedSearch,
    });
    const searchResult = Object.values(data?.entities || {})

    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleDrawer = () => {
      setIsMenuOpen((prev) => !prev);
    };

    const [logoutUser] = useLogoutUserMutation();

    let currentUser = useSelector(getCurrentUserAuth);

    const totalQuantity = useSelector((state) => state.cart.totalQuantity);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogOut = async () => {
      await logoutUser().unwrap();
      dispatch(clearCart());
      setIsDropDownOpen(false);
      navigate('/');
    }

    const handleSelect = (book) => {
      navigate(`/book/${book._id}`);
    }

    // const handleSearchInput = () => {
    //   navigate(`books?search=${encodeURIComponent(searchInput)}`, { state: { searchResult } });
    // }


  return (
    <header className="bg-white py-6 z-10 w-full">
        <div className="flex justify-between items-center max-w-screen-2xl mx-auto pb-4 px-4 ">
          {/* Left side */}
          <div className='flex justify-start items-center md:space-x-16 space-x-2'>
            <button onClick={toggleDrawer}>
              <Bars3CenterLeftIcon className={`size-6  ${isMenuOpen ? 'text-primary' : 'text-secondary'}`} />
            </button>
            
            {/* Search Bar */}
            <div className='relative'>
              <div className='flex bg-[#EAEAEA] px-2 py-1 rounded-lg gap-1 items-center'>
                <MagnifyingGlassIcon className='size-5 text-secondary'/>
                <input 
                  name='searchBox' 
                  type='search' 
                  placeholder='What are you looking for?'
                  onChange={(e) => setSearchInput(e.target.value)}
                  value={searchInput} 
                  className='items-center pl-2 pr-3 bg-transparent w-[100px] md:w-[400px] text-xs text-secondary border-none focus:outline-none'/>                
              </div>

              {searchInput && !searchLoading && searchResult.length > 0 && (
                <ul className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {searchResult.map((book) => (
                    <li
                      key={book.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSelect(book)}
                    >
                      <strong>{book.title}</strong>
                    </li>
                  ))}
                </ul>
              )}

            </div>
          </div>
          {/* Right side */}
          <div className='flex justify-end items-center space-x-2'>
            <div className='relative p-1'>
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
                        <div className='absolute mt-2 w-48 bg-white shadow-lg rounded-lg z-30'>
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
              <Link to='/login'>
                  <UserIcon className='size-6 text-secondary' />
              </Link>
              }
            </div>
            {/* <Link to='/' className='hidden sm:block'>
              <HeartIcon className='size-6 text-secondary' />
            </Link> */}
            <Link to='/cart' className='bg-primary text-textColorForDarkBG w-full flex justify-center px-4 py-1 text-xs items-center gap-2 font-bold border-none rounded-lg'>
              <ShoppingCartIcon className='size-5'/>
              {
                totalQuantity > 0 ? <span className='text-sm font-semibold'>{totalQuantity}</span>: <span className='text-sm font-semibold'>0</span>}
                Basket
            </Link>
          </div>
        </div>

        {isMenuOpen && (
          <div className="bg-primary">
            <div className="flex flex-row max-w-screen-2xl mx-auto">
              {[
                { to: '/', label: 'Homepage' },
                { to: '/books', label: 'Books' },
                { to: '/aboutUs', label: 'About Us' },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-white font-regular text-md p-4 hover:bg-secondary hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}



    </header>
  )
}

export default Navbar
