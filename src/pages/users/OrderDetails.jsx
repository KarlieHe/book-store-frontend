import { ShoppingBagIcon } from "@heroicons/react/24/outline"
import { getImgUrl } from "../../utils/getImgUrl";
import { useFetchOrderByIdQuery } from "../../redux/features/order/ordersApi";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
    const { id } = useParams()
    const { data: orderData, isLoading, isError } = useFetchOrderByIdQuery(id)
    if (isLoading) return <div>Loading...</div>
    if (isError) {
        console.error("Error fetching order:", isError);
        return <div>Error fetching order</div>
    }
    
    const order = Object.values(orderData.entities || {})
    const books = order[0].items
    // console.log("!!!", books)
  return (
   <div className="flex flex-col">
      <div className="flex justify-between">
        <div className="flex items-center h-full gap-6">
            <ShoppingBagIcon className="size-10 text-primary" />
            <h1 className="text-2xl font-primary font-bold">Order</h1>
        </div>
        <button className="text-gray-800 hover:underline rounded px-2  border-gray-600 font-light text-sm" onClick={() => window.history.back()}>
        &lt;&nbsp;&nbsp;&nbsp; Back to order overview</button>
      </div>

    <div className="overflow-x-auto mt-10">
        <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 border-b">
            <tr>
            <th className="px-4 py-3">Cover</th>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Item price</th>
            <th className="px-4 py-3">Quantity</th>
            <th className="px-4 py-3">Total price</th>
            </tr>
        </thead>
        <tbody>
            {books.map((book) => (
                <tr key={book._id}>
                    <td className="px-4 py-3">
                        <img
                        src={`${getImgUrl(book.image_url)}`}
                        alt={book.title}
                        className="h-16 w-12 object-cover rounded"
                        />
                    </td>
                    <td className="px-4 py-3 font-medium">{book.title}</td>
                    <td className="px-4 py-3">${book.finalPrice}</td>
                    <td className="px-4 py-3">{book.cartQuantity}</td>
                    <td className="px-4 py-3">
                        ${ Number(book.finalPrice * book.cartQuantity).toFixed(2) }
                    </td>
                </tr>
        
            ))}
        </tbody>
        </table>
    </div>
    <hr className="my-4" />
    <div className="grid grid-cols-1 md:grid-cols-2 justify-between gap-x-4 gap-y-8 mt-4">
        <div className="flex flex-col gap-2">
            <h1 className="text-lg font-primary font-semibold">Shipping Address</h1>
            <p className="font-md font-secondary text-gray-700">{order[0].shippingInfo.firstName} {order[0].shippingInfo.surname}</p>
            <p className="font-md font-secondary text-gray-700">{order[0].shippingInfo.address.street}, {order[0].shippingInfo.address.suburb}, {order[0].shippingInfo.address.state} {order[0].shippingInfo.address.postCode}, {order[0].shippingInfo.address.country}</p>
            <p className="font-md font-secondary text-gray-700">{order[0].shippingInfo.phone}</p>
            <p className="font-md font-secondary text-gray-700">{order[0].shippingInfo.email}</p>
        </div>
        <div className="flex flex-col gap-2">
            <h1 className="text-lg font-primary font-semibold">Billing Address</h1>
            <p className="font-md font-secondary text-gray-700">{order[0].billingInfo.firstName} {order[0].billingInfo.surname}</p>
            <p className="font-md font-secondary text-gray-700">{order[0].billingInfo.address.street}, {order[0].billingInfo.address.suburb}, {order[0].shippingInfo.address.state} {order[0].shippingInfo.address.postCode}, {order[0].shippingInfo.address.country}</p>
            <p className="font-md font-secondary text-gray-700">{order[0].billingInfo.phone}</p>
            <p className="font-md font-secondary text-gray-700">{order[0].billingInfo.email}</p>
        </div>

        <div className="flex flex-col gap-2">
            <h1 className="text-lg font-primary font-semibold">Delivery Method</h1>
            <p className="text-lg font-secondary text-gray-700">{order[0].shippingInfo.deliveryMethod}</p>   
        </div>
        <div className="flex flex-col gap-2">
            <h1 className="text-lg font-primary font-semibold">Total Amount</h1>
            <p className="text-lg font-secondary">${order[0].totalAmount}</p>   
        </div>
        </div>
    </div>
  )
}

export default OrderDetails