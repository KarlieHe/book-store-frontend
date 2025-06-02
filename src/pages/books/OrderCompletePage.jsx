import { Link, useLocation, useNavigate } from "react-router"
import { useEffect } from "react"

const OrderCompletePage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { orderNum } = location.state || {}

    useEffect(() => {
      if (!location.state?.fromCheckout) {
        navigate("/cart");
      }
    }, [navigate, location]);

    useEffect(() => {
    const handlePopState = () => {
      navigate("/", { replace: true }) 
    }

    window.addEventListener("popstate", handlePopState)

    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [navigate])

  return (
    <div>
      <h1 className="text-4xl font-secondary text-center mt-10">Order Complete <span>#{orderNum}</span></h1>
      <p className="text-lg text-center mt-4">Thank you for your order!</p>
      <p className="text-lg text-center mt-2">Your order has been successfully processed.</p>

      <div className="text-center mt-6">
        <Link to={"/"} className="bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-600">Continue Shopping</Link>
      </div>
      {/* <div className="text-center mt-4">
        <Link to={"/orders"} className="text-blue-600 hover:underline">View Your Orders</Link>  
      </div> */}
    </div>
  )
}

export default OrderCompletePage