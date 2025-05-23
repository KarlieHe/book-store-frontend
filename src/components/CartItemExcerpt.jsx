import { getImgUrl } from "../utils/getImgUrl";
import PropTypes from "prop-types";
const CartItemExcerpt = ({cartItem}) => {
    const totalPrice = parseFloat((cartItem.cartQuantity * cartItem.finalPrice).toFixed(2));
  return (
    <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
            <img 
                src={`${getImgUrl(cartItem.image_url)}`} 
                alt={cartItem.title} 
                className="w-16 h-20 rounded" 
            />
            <div>
            <p>{cartItem.title}</p>
            <p className="text-sm text-gray-500">{cartItem.cartQuantity}x</p>
            </div>
        </div>
        <p>${totalPrice}</p>
    </div>
  )
}

CartItemExcerpt.propTypes = {
  cartItem: PropTypes.shape({
    image_url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    cartQuantity: PropTypes.number.isRequired,
    finalPrice: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartItemExcerpt