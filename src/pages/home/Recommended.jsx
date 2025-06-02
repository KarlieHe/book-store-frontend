
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import BookCard1 from '../../components/BookCard1';
import 'swiper/css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

import { useFetchBooksQuery } from '../../redux/features/books/booksApi'

const Recommended = () => {

    const { data: allBooks, isLoading, error } = useFetchBooksQuery();
    const books = Object.values(allBooks?.entities || {})


  return (
    <div className='py-8'>
        <h2 className='font-bold text-primary text-3xl md:text-5xl mb-10'>Recommended</h2>

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
                
                {!isLoading && !error && books.length > 0 && books.slice(4, 10).map((book, index) => (
                    
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

export default Recommended