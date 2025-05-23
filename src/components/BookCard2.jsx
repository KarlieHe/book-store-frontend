import {getImgUrl} from '../utils/getImgUrl';
import PropTypes from 'prop-types';
import AddToCartBtn from './AddToCartBtn';
import { Link } from 'react-router';

export const BookCard2 = ({ book}) => {
  return (
    <div className=" rounded-lg overflow-hidden shadow-sm hover:shadow-lg flex flex-col">
        <Link to={`/book/${book._id}`} className="flex-shrink-0">
            <div className="px-10 mt-8">
                <img src={`${getImgUrl(book?.image_url)}`}  alt="Product" className="w-full object-cover" />
            </div>
            <div className="flex flex-col justify-between px-10 py-2 flex-grow h-[110px]">
                <div>
                <h3 className="font-semibold text-sm mb-1 line-clamp-2">{book?.title}</h3>
                <p className="text-xs font-extralight text-secondary line-clamp-2">
                    {book.authors.length > 0 ? (
                    book.authors.map((author, index) => (
                        <a key={author.name} className="underline">
                        {author.name}
                        {index < book.authors.length - 1 && ", "}
                        </a>
                    ))
                    ) : (
                    "Unknown author"
                    )}
                </p>
                </div>
                <div className="text-lg font-regular">${book.finalPrice}</div>

                {/* <div className="text-yellow-300 text-sm mb-1">★★★★★ (61)</div> */}
                {/* <div className="line-through font-normal text-gray-600 decoration-gray-500">${book.original_price}</div> */}
            </div>
        </Link>
        <div className="px-10 mb-4">
        {/* <hr className="border-t border-gray-200 mb-4" /> */}

            <AddToCartBtn
                btnClass="w-full !rounded-full"
                iconClass="size-5 mx-auto"
                textClass="!hidden"
                book={book}
                cartQuantity={1}
            />
        </div>
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
