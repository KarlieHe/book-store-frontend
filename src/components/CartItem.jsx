import { Link } from "react-router";
import { TrashIcon } from "@heroicons/react/24/outline";
import { getImgUrl } from "../utils/getImgUrl";
import { useDispatch } from "react-redux";
import { addToCart, decreaseCart, removeFromCart } from "../redux/features/cart/cartSlice";
import PropTypes from "prop-types";

const CartItem = ({cartItem}) => {
    const dispatch = useDispatch();

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
        <div className="flex flex-col md:flex-row md:justify-between md:h-64 md:w-full">
            {/* Image */}
            <div className="flex-shrink-0">
                <Link to={`/books/${cartItem.id}`}>
                    <img 
                        src={`${getImgUrl(cartItem.image_url)}`} 
                        alt={cartItem.title}
                        className='w-1/2 md:w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200'
                    />
                </Link>
            </div>
            {/* Title and details */}
            <div className="flex flex-col md:items-start md:flex-1 md:ml-4 mt-4 w-1/2 md:w-2/3">
                <Link to={`/books/${cartItem.id}`}>
                    <h3 className="text-xl font-primary font-bold">{cartItem.title}</h3>
                    <p className="text-md font-primary font-regular "><span>by </span> 
                        {cartItem.authors.length > 0 ? `${cartItem.authors.map(author => author.name).join(", ")}` : "Unknown author"}
                    </p>
                </Link>
                
            </div>
            {/* Qty controller */}
            <div className="flex items-center border border-gray-300 rounded-md px-2 h-12 w-28 md:mx-10 md:items-start mt-4">
                <button 
                    onClick={handleDecrease}
                    className="px-2 text-lg font-semibold text-gray-700 self-center hover:text-black hover:scale-110 transition">
                    −
                </button>
                <span className="px-4 text-md font-medium text-gray-800 self-center">{cartItem.cartQuantity}</span>
                <button 
                    onClick={handleIncrease}
                    className="px-2 self-center text-lg font-semibold text-gray-700 hover:text-black hover:scale-110 transition disabled:text-gray-400"
                    disabled={cartItem.cartQuantity >= cartItem.stock}
                    >
                    +
                </button>
            </div>
            {/* Price and remove button */}
            <div className="flex flex-col md:justify-between mt-4">
                <p className="text-lg font-primary font-regular">${cartItem.finalPrice}</p>
                <button 
                    onClick={handleRemove}
                    className="text-gray-500 hover:text-red-500"
                >
                <TrashIcon className="h-5 w-5 inline-block mr-2" />
                </button>
            </div>
        </div>
        <hr className="border-t-1 border-gray-400 w-full my-10" />
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
        finalPrice: PropTypes.number.isRequired
    }).isRequired
};

export default CartItem