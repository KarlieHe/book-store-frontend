import {getImgUrl} from '../utils/getImgUrl';
import PropTypes from 'prop-types';
import AddToCartBtn from './AddToCartBtn';
import { Link } from 'react-router';

export const BookCard2 = ({ book}) => {
  return (
    <div className="overflow-hidden hover:shadow-lg flex flex-col px-4 lg:px-6 py-4 lg:py-6">
        <Link to={`/book/${book._id}`} className="flex-shrink-0">
            <div className="">
                <img src={`${getImgUrl(book?.image_url)}`}  alt={book?.title} className="w-full object-cover" />
            </div>
            <div className="flex flex-col justify-between flex-grow h-[110px]">
                <div>
                  <h3 className="font-semibold text-sm pt-2 pb-1 line-clamp-2">{book?.title}</h3>
                  <p className="text-xs md:text-sm font-extralight text-gray-500 italic line-clamp-2">
                      {book.authors.length > 0 ? (
                      book.authors.map((author, index) => (
                          <a key={author.name} className="">
                          {author.name}
                          {index < book.authors.length - 1 && ", "}
                          </a>
                      ))
                      ) : (
                      "Unknown author"
                      )}
                  </p>
                </div>
                <div className="text-md font-regular py-2">${book.finalPrice} <span className='line-through text-gray-400 text-sm ml-3'>RRP: ${book.original_price}</span></div>

                {/* <div className="text-yellow-300 text-sm mb-1">★★★★★ (61)</div> */}
                {/* <div className="line-through font-normal text-gray-600 decoration-gray-500">${book.original_price}</div> */}
            </div>
        </Link>

        <AddToCartBtn
            btnClass="w-full !rounded-full !py-1"
            iconClass="size-6 mx-auto"
            textClass="!hidden"
            book={book}
            cartQuantity={1}
        />

    </div>
  )
}

BookCard2.propTypes = {
  book: PropTypes.shape({
    image_url: PropTypes.string,
    title: PropTypes.string,
    original_price: PropTypes.number,
    finalPrice: PropTypes.number,
    authors: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired
      })
    ),
    _id: PropTypes.string.isRequired
  }).isRequired
};
