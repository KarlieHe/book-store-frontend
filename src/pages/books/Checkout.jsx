import { useSelector } from 'react-redux'
import CartSummary from '../../components/CartSummary'
import ShippingForm from '../../components/ShippingForm'
import { useForm, FormProvider } from 'react-hook-form'
import { useNavigate, useLocation } from 'react-router'
import { useEffect } from 'react'

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.cartItems)
  const subtotalAmount = useSelector((state) => state.cart.subtotalAmount)
  const shippingRate = 0
  const discount = 0
  const totalAmount = parseFloat((subtotalAmount + shippingRate - discount).toFixed(2))

  const methods=useForm({ mode: "onChange" })
  const { handleSubmit, getValues } = methods
  const navigate = useNavigate()

  const location = useLocation();

  useEffect(() => {
    if (!location.state?.fromCart) {
      navigate("/cart");
    }
  }, [navigate, location]);

  const onSubmit = async () => {
    const shippingData = getValues()
    navigate('/payment', {
      state: { fromCheckout: true, amount: totalAmount, cartItems, shippingData }
    })
  }

  return (
    <FormProvider 
      {...methods} 
      className="p-10"
    >
      <h2 className="text-4xl text-center font-primary">Checkout</h2>
      <hr className="border-t-1 border-black w-1/4 mt-4 mx-auto mb-4" />

      <form 
        className="grid grid-cols-1 lg:grid-cols-2 items-start gap-6 lg:gap-10"
         onSubmit={handleSubmit(onSubmit)} 
         noValidate
      >
        <ShippingForm />
        <CartSummary cartItems={cartItems} subtotalAmount={subtotalAmount} shippingRate={shippingRate} discount={discount} totalAmount={totalAmount} />
      </form>
    </FormProvider>
  )
}

export default Checkout
