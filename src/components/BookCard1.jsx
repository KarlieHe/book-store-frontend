/* eslint-disable react/prop-types */
import { getImgUrl } from '../utils/getImgUrl'
import { Link } from 'react-router'

// const calculateDiscountedPrice = (originalPrice, discounts) => {

// }

import AddToCartBtn from './AddToCartBtn'


const BookCard1 = ({book}) => {

    // Calculate the discount price
    // console.log("book", book)
    
  return (
    <div className="flex items-center w-auto px-3 rounded-md bg-white gap-3">
        <Link to={`/book/${book._id}`} className="flex-shrink-0">
            <img
            src={getImgUrl(book?.image_url)}
            alt={book?.title || "book cover"}
            className="w-28 h-40 object-cover rounded-md p-2 cursor-pointer hover:scale-105 transition-transform duration-200"
            />
        </Link>

        <div className="flex flex-col justify-between w-40">
            <Link to={`/book/${book._id}`}>
                <h3 className="text-secondary font-medium text-md font-primary line-clamp-1">{book?.title}</h3>
            </Link>

            <p className="text-small font-light text-gray-600 italic line-clamp-2 mt-2">
            {book.authors?.length > 0
                ? book.authors.map((author, i) => (
                    <span key={author.name}>
                    <span>{author.name}</span>
                    {i < book.authors.length - 1 && ', '}
                    </span>
                ))
                : 'Unknown author'}
            </p>

            <p className="text-xs font-regular text-secondary line-clamp-3 my-2 mt-2 text-justify">{book?.description}</p>

            <p className="text-md font-semibold text-primary mt-6">
                ${book.finalPrice}{' '}
                <span className="line-through text-gray-500 text-sm ml-2">${book?.original_price}</span>
            </p>
            <div className="mt-4">
                <AddToCartBtn
                btnClass="w-fit !px-3 !bg-transparent !border-2 !border-secondary text-secondary !hover:bg-secondary"
                iconClass="size-5"
                textClass="hidden"
                book={book}
                />
            </div>
            
        </div>
    </div>

  );
}

export default BookCard1