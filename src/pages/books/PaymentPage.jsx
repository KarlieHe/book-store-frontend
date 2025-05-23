import PaymentForm from "../../components/PaymentForm"  
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"

const PaymentPage = () => {
      const [stripePromise, setStripePromise] = useState(null)
      const [clientSecret, setClientSecret] = useState("")
      const location = useLocation()
      const navigate = useNavigate()
      const { amount } = location.state || {}     

      useEffect(() => {
        if (!location.state?.fromCheckout) {
          navigate("/cart");
        }
      }, [navigate, location]);


      useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/config`, { credentials: 'include' })
          .then(res => res.json())
          .then(async ({ publishableKey }) => {
            const stripe = await loadStripe(publishableKey)
            setStripePromise(stripe)
          })
      }, [amount])
    
      useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/v1/payment_intents`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            amount: Math.round(amount * 100), 
            currency: "aud" })
        })
          .then(res => res.json())
          .then(({ clientSecret }) => {
            setClientSecret(clientSecret)
          })
      }, [amount])
    

  return (
    <>
      <h2 className="text-4xl text-center font-primary">Payment</h2>
      <hr className="border-t-1 border-black w-1/4 mt-4 mx-auto mb-4" />
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm />
        </Elements>
      )}
    </>
  )
}

export default PaymentPage