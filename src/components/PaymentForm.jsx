import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router"
import { useAddAnOrderMutation } from "../redux/features/order/ordersApi"
import { useSelector, useDispatch } from "react-redux"
import { clearCart } from "../redux/features/cart/cartSlice"

const PaymentForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {amount, cartItems, shippingData} = location.state
  const user = useSelector((state) => state.auth.user);
  const [addAnOrder] = useAddAnOrderMutation()


  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);


  const shippingInfo ={
    firstName: shippingData.firstName,
    surname: shippingData.surname,
    email: shippingData.email,
    phone: shippingData.mobile,
    address: {
      country: "Australia",
      street: shippingData.street,
      suburb: shippingData.suburb,
      state: shippingData.state,
      postCode: shippingData.postCode},
    deliveryMethod: shippingData.shippingMethod
  }
  const billingInfo ={
    firstName: shippingData.firstName,
    surname: shippingData.surname,
    email: shippingData.email,
    phone: shippingData.mobile,
    address: {
      country: "Australia",
      street: shippingData.street,
      suburb: shippingData.suburb,
      state: shippingData.state,
      postCode: shippingData.postCode}
  }

  const cart = cartItems.map((item) => ({
    _id: item._id,
    title: item.title,
    finalPrice: item.finalPrice,
    cartQuantity: item.cartQuantity,
    image_url: item.image_url,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);


    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {},
      redirect: "if_required",
    });

    if (error) {
      console.log("❌ Payment failed:", error.message);
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      const orderData = {
        user: user.id,
        items: cart,
        shippingInfo: shippingInfo,
        billingInfo: billingInfo,
        paymentResult: {
          id: paymentIntent.id,
          // enum: ["Pending", "Paid", "Failed"]
          paymentStatus: "Paid",
        },
        orderStatus: "Processing",
        totalAmount: paymentIntent.amount / 100,
      }
      console.log("Order data:", orderData)

      await addAnOrder(orderData)
        .unwrap()
        .then((res) => {
          console.log("Order added successfully:", res);
          console.log("order number", res.order.orderNum)
          setMessage("Payment succeeded! Order has been placed.");
          dispatch(clearCart());
          navigate("/order-success", {
            state: {
              fromCheckout: true,
              orderNum: res.order.orderNum,
              // orderStatus: res.order.orderStatus,
            },
          });
        })
        .catch((err) => {
          console.error("Failed to add order:", err);
          setMessage("Payment succeeded! But failed to place the order.");
        });

    }

    setIsProcessing(false)
    
  }

    const paymentElementOptions = {
    layout: "accordion",
  }

  return (
<form id="payment-form" onSubmit={handleSubmit} className="flex-col w-full max-w-lg mx-auto p-6 bg-white shadow-md rounded-3xl">
      <h3 className="w-full text-center text-4xl font-secondary mb-4">Amount: ${amount}</h3>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button 
        disabled={isProcessing || !stripe || !elements} 
        id="submit"
        className="w-full bg-primary text-lg py-2 mt-4 rounded-md text-black hover:bg-amber-400">
          {isProcessing ? "Processing ... " : "Pay now"}
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  )
}

export default PaymentForm
