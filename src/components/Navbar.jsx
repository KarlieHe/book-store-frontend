import { Bars3CenterLeftIcon, MagnifyingGlassIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { Link, NavLink, useLocation, useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { useDebounce } from '../hooks/useDebounce';

import { useSelector } from 'react-redux';
import { useFetchBooksQuery } from '../redux/features/books/booksApi';

import ProfileBtn from './ProfileBtn';


const Navbar = () => {
  // State to manage search input and results
    const [searchInput, setSearchInput] = useState('');
    const debouncedSearch = useDebounce(searchInput, 500);
    const { data, isLoading: searchLoading } = useFetchBooksQuery({ search: debouncedSearch }, {
      skip: !debouncedSearch,
    });
    const searchResult = Object.values(data?.entities || {})

  // State to manage dropdown and menu visibility
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    // close menu on route change
    useEffect(() => {
      setIsMenuOpen(false); 
    }, [location.pathname]);
    // Prevent scroll behind the menu
    useEffect(() => {
      document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    }, [isMenuOpen]);
    

    const toggleDrawer = () => {
      setIsMenuOpen((prev) => !prev);
    };

    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    const navigate = useNavigate();

    const handleSelect = (book) => {
      navigate(`/book/${book._id}`);
    }

    // const handleSearchInput = () => {
    //   navigate(`books?search=${encodeURIComponent(searchInput)}`, { state: { searchResult } });
    // }
    


  return (
    <div className="w-full">
        <div className="flex justify-between items-center max-w-screen-2xl mx-auto px-2 py-4 md:px-4 ">
          {/* Left side */}
          <div className='flex justify-start items-center md:space-x-16 space-x-2'>
            <button onClick={toggleDrawer}>
              <Bars3CenterLeftIcon className={`size-6  ${isMenuOpen ? 'text-primary' : 'text-secondary'}`} />
            </button>
            
            {/* Search Bar */}
            <div className='relative'>
              <div className='flex bg-[#EAEAEA] px-2 py-1 rounded-lg gap-1'>
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
            <ProfileBtn />
            <Link to='/cart' className='bg-primary text-textColorForDarkBG w-full flex justify-center px-4 py-1 text-xs items-center gap-2 font-bold border-none rounded-lg'>
              <ShoppingCartIcon className='size-5'/>
              {
                totalQuantity > 0 ? <span className='text-sm font-semibold'>{totalQuantity}</span>: <span className='text-sm font-semibold'>0</span>}
                Basket
            </Link>
          </div>
        </div>

        {isMenuOpen && (
          <div className="fixed top-[159px] left-0 right-0 bottom-0 bg-black bg-opacity-50 z-30"></div>
        )}

        {isMenuOpen && (
          <div className="bg-webBG shadow-md">
            <div className='flex flex-col max-w-screen-2xl mx-auto'>
            <hr className='border-t border-primary' />
              <div className="flex flex-row">
                  {[
                    { to: '/', label: 'Homepage' },
                    { to: '/books', label: 'Books' },
                    { to: '/aboutUs', label: 'About Us' },
                  ].map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className={({ isActive }) =>
                        `text-secondary font-regular text-md p-4 hover:bg-primary hover:text-white ${
                        isActive ? 'bg-primary text-white' : 'bg-webBG'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </div>

            </div>

          </div>
        )}



    </div>
  )
}

export default Navbar
