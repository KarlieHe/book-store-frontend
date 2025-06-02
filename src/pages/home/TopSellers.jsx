import { useState } from 'react'
import BookCard1 from '../../components/BookCard1';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

import { useFetchBooksQuery } from '../../redux/features/books/booksApi';

import { categories } from '../../utils/constants';


const TopSellers = () => {
    const [category, setCategory] = useState('');
    const { data: books, isLoading, error } = useFetchBooksQuery({ genre: category.toLowerCase() });
    const filteredBooks = Object.values(books?.entities || {})

  
    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory === "All" ? "" : selectedCategory); 
    };


  return (
    <div className='py-8'>
        <div className='font-bold text-3xl md:text-5xl mb-10 text-primary'>
            <h2>Top</h2>
            <h2>Seller</h2>
        </div>
        <div className="mb-8 flex items-center">
            <span className="mr-4 font-secondary">Category:</span>
            <select
            name="category"
            id="category"
            onChange={handleCategoryChange}
            className="rounded-md bg-[#EAEAEA] px-3 py-1 text-md font-normal text-secondary 
                        shadow-sm hover:bg-white hover:ring-1 hover:ring-[#EAEAEA] hover:ring-inset
                        focus:outline-none focus:ring-2 focus:ring-primary">
            {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
            ))}
            </select>
        </div>
        <div className='flex flex-col space-x-0 md:flex-row md:space-x-6'>
            <Swiper
                // onSlideChange={() => console.log('slide change')}
                // onSwiper={(swiper) => console.log(swiper)}
                navigation={true} 
                modules={[Navigation, Pagination]} 
                className="mySwiper"
                slidesPerView={1}
                spaceBetween={10}
                breakpoints={{
                840: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                1280: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                }}
                >
                
                {!isLoading 
                    && !error 
                    && filteredBooks.length > 0 
                    && filteredBooks
                        .filter((book) => book.stock > 0)
                        .map((book, index) => (
                    
                     <SwiperSlide key={index}>
                        <BookCard1 book={book} />
                    </SwiperSlide>
                    ))
                }
               
            </Swiper>
            
        </div>
    </div>

    
  )
}

export default TopSellers