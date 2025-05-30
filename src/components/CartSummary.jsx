import CartItemExcerpt from "./CartItemExcerpt";
import PropTypes from "prop-types";

const CartSummary = ({cartItems, subtotalAmount, shippingRate, discount, totalAmount}) => {


  return (
    <div className="bg-white py-6 px-4 md:px-16 rounded-3xl shadow-lg">
        <h3 className="text-3xl font-secondary font-regular">Review your cart</h3>
        <div className="space-y-4 mt-4">
            {cartItems.map((cartItem, index) => (
            <CartItemExcerpt key={index} cartItem={cartItem} />
            ))}
        </div>

        <div className="grid grid-cols-3 my-4 gap-4 md:gap-6">
            <input 
            placeholder="Discount code" 
            className="col-span-2 border-2 rounded-md font-regular py-2 px-4" />
            <button className="col-span-1 bg-blue-500 hover:bg-blue-600 text-white font-regular py-2 px-4 rounded-md">Apply</button>
        </div>

        <div className="space-y-1 text-md">
            <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotalAmount}</span>
            </div>
            <div className="flex justify-between">
            <span>Shipping</span>
            <span>${shippingRate}</span>
            </div>
            <div className="flex justify-between">
            <span>Discount</span>
            <span className="text-green-600">-${discount}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${totalAmount}</span>
            </div>
        </div>

        <button type="submit" className="w-full bg-primary text-lg py-2 mt-4 rounded-md text-black hover:bg-amber-400">
            Go to payment
        </button>
        <p className="text-sm text-gray-500 mt-4 text-center space-x-2">
            <span className="text-blue-600 font-semibold">Secure Checkout - SSL Encrypted</span>
        </p> 

   
    </div>
  )
}
CartSummary.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  subtotalAmount: PropTypes.number.isRequired,
  shippingRate: PropTypes.number.isRequired,
  discount: PropTypes.number.isRequired,
  totalAmount: PropTypes.number.isRequired,
};

export default CartSummary;


