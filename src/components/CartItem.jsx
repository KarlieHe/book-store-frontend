import { Link } from "react-router";
import { TrashIcon } from "@heroicons/react/24/outline";
import { getImgUrl } from "../utils/getImgUrl";
import { useDispatch } from "react-redux";
import { addToCart, decreaseCart, removeFromCart } from "../redux/features/cart/cartSlice";
import PropTypes from "prop-types";

const CartItem = ({cartItem}) => {
    const dispatch = useDispatch();
    // console.log("CartItem", cartItem);

    const handleIncrease = () => {
        if (cartItem.cartQuantity < cartItem.stock) {
        dispatch(addToCart(cartItem));
        }
    };

    const handleDecrease = () => {
    dispatch(decreaseCart(cartItem));
    };

    const handleRemove = () => {
        dispatch(removeFromCart(cartItem));
    }

  return (
    <>
        <div className="flex flex-row justify-between md:h-64">
            {/* Image */}
            <div className="flex-shrink-0">
                <Link to={`/books/${cartItem.id}`}>
                    <img 
                        src={`${getImgUrl(cartItem.image_url)}`} 
                        alt={cartItem.title}
                        className='w-[120px] md:w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200'
                    />
                </Link>
            </div>
            {/* Title and details */}
            <div className="flex flex-col md:flex-row grow justify-between pt-4 space-y-2">
                <div className="flex flex-col md:items-start md:flex-1 md:ml-4">
                    <Link to={`/books/${cartItem.id}`}>
                        <h3 className="text-sm md:text-xl font-primary font-bold line-clamp-2">{cartItem.title}</h3>
                        <p className="text-xs md:text-md font-primary font-regular "><span>by </span> 
                            {cartItem.authors.length > 0 ? `${cartItem.authors.map(author => author.name).join(", ")}` : "Unknown author"}
                        </p>
                    </Link>
                    
                </div>
                {/* Qty controller */}
                {/* px-1 h-8 w-16 md:px-2 md:h-12 md:w-28 md:mx-10 */}
                <div className="inline-flex items-center border border-gray-300 rounded-md h-8 w-16 md:px-2 md:h-12 md:w-28 md:mx-10">
                    <button 
                        onClick={handleDecrease}
                        className="px-2 text-sm md:text-lg font-semibold text-gray-700 self-center hover:text-black hover:scale-110 transition">
                        −
                    </button>
                    <span className="px-1 md:px-4 text-sm md:text-md font-medium text-gray-800 self-center">{cartItem.cartQuantity}</span>
                    <button 
                        onClick={handleIncrease}
                        className="px-2 self-center text-sm md:text-lg font-semibold text-gray-700 hover:text-black hover:scale-110 transition disabled:text-gray-400"
                        disabled={cartItem.cartQuantity >= cartItem.stock}
                        >
                        +
                    </button>
                </div>
                {/* Price and remove button */}
                <div className="flex flex-col items-end md:justify-between mt-2">
                    <p className="text-xs md:text-md md:text-lg font-primary font-regular self-start">${cartItem.finalPrice} <span className="text-discount line-through text-xs block">RRP: ${cartItem.original_price}</span></p>
                    <button 
                        onClick={handleRemove}
                        className="text-gray-500 hover:text-red-500"
                    >
                    <TrashIcon className="h-5 w-5 inline-block mr-2" />
                    </button>
                </div>
            </div>
        </div>
        <hr className="border-t-1 border-gray-400 w-full mt-6 mb-4" />
    </>
  )
}
CartItem.propTypes = {
    cartItem: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string.isRequired,
        authors: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired
            })
        ).isRequired,
        image_url: PropTypes.string.isRequired,
        cartQuantity: PropTypes.number.isRequired,
        stock: PropTypes.number.isRequired,
        finalPrice: PropTypes.number.isRequired,
        original_price: PropTypes.number.isRequired
    }).isRequired
};

export default CartItem