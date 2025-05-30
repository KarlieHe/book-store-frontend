import CartItem from "../../components/CartItem";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router";
import { clearCart } from "../../redux/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserAuth } from "../../redux/features/auth/authSlice";

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const subtotalAmount = useSelector((state) => state.cart.subtotalAmount);
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    let currentUser = useSelector(getCurrentUserAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleCheckout = () => {
        if (!currentUser) {
            navigate('/login');
        } else {
            navigate('/checkout', { state: { fromCart: true } });
        }
    }
    const handleClearCart = () => {
        dispatch(clearCart());
    }
  return (
    <div>
        <h2 className="text-4xl font-primary font-regular text-center">
            Shopping Cart &#40;{totalQuantity} items&#41;
        </h2>
        <hr className="border-t-1 border-black w-1/2 md:w-1/4 mt-4 mx-auto" />
        <div className="grid lg:grid-cols-3 items-start gap-10 p-4">
            <div className="lg:col-span-2 flex flex-col items-center md:items-start rounded-3xl shadow-lg p-4 md:p-6">
                {cartItems.length === 0 && (
                    <div className="flex flex-col items-start justify-center">
                        <h3 className="text-2xl font-secondary font-regular text-center">Your cart is empty</h3>
                        <p className="text-lg font-secondary font-regular text-center">Add some&nbsp;
                            <Link to="/"><span className="text-blue-600 font-bold underline">books</span></Link>
                            &nbsp;to your cart!
                        </p>
                    </div>
                )}
                {cartItems.length > 0 && (
                <>
                    {cartItems.map((cartItem, index) => (
                    <CartItem key={index} cartItem={cartItem} />
                    ))}
                    <p className="text-lg md:text-3xl font-secondary font-regular">
                        Subtotal &#40;{totalQuantity} items&#41;&#58;&nbsp;
                        <span className="font-bold">&#36;{subtotalAmount}</span>
                    </p>
                </>
                )}
            </div>


            <div className="p-6 rounded-3xl shadow-lg">
                <h3 className="text-2xl font-secondary font-bold">Summary</h3>
                <hr className="border-t-1 border-black w-full mt-4 mb-6" />
                <div className="flex justify-between items-center mb-4">
                    <p className="text-xl font-secondary font-regular">
                        {totalQuantity === 0
                            ? 'No items'
                            : `${totalQuantity} ${totalQuantity === 1 ? 'Item' : 'Items'}`}</p>
                    <p className="text-xl font-secondary font-regular">${subtotalAmount}</p>
                </div>
                <div className="flex justify-between items-center mb-4">
                    <p className="text-xl font-secondary font-regular">Shipping</p>
                    <p className="text-xl font-secondary font-regular">To be calculated</p>
                </div>
                <hr className="border-t-1 border-black w-full mt-4 mb-6" />
                <div className="flex justify-between items-center mb-4">
                    <p className="text-2xl font-secondary font-bold">Order Total:</p>
                    <p className="text-2xl font-secondary font-bold">${subtotalAmount}</p>
                </div>
                {cartItems.length > 0 && (
                    <>
                    <button 
                        onClick={handleCheckout}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-regular py-2 px-4 rounded-3xl w-full mt-4">
                        Proceed to Checkout
                    </button>
                    <Link to="/">
                        <button className="bg-primary hover:bg-amber-400 text-white font-regular py-2 px-4 rounded-3xl w-full mt-4">
                            Continue Shopping
                        </button>
                    </Link>
                    <button 
                        className="border-red-500 border-2 text-red-500 hover:bg-red-500 hover:text-white font-regular py-2 px-4 rounded-3xl w-full mt-4"
                        onClick={handleClearCart}>
                        Clear Cart
                    </button>
                    </>
                )}
            </div>
        </div>
    </div>
  )
}

export default Cart