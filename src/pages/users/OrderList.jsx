import { ReceiptPercentIcon } from "@heroicons/react/24/outline"
import { useGetOrdersByUserIdQuery } from "../../redux/features/order/ordersApi"
import { useNavigate } from "react-router";
const OrderList = () => {
  const navigate = useNavigate();
  const { data: ordersData, isLoading, error } = useGetOrdersByUserIdQuery();
  const orderStatusMap = {
  Processing: <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded">Processing</span>,
  Collected: <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">Collected</span>,
  Delivered: <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">Delivered</span>,
  Cancelled: <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded">Cancelled</span>,
};
  if (isLoading) return <div>Loading...</div>
  if (error) {
    console.error("Error fetching orders:", error);
    return <div>Error fetching orders</div>
  }
  const orders = Object.values(ordersData?.entities || {})
  // console.log(orders)
  return (
    <div className="flex flex-col">
      <div className="flex items-center h-full gap-6">
        <ReceiptPercentIcon className="size-10 text-primary" />
        <h1 className="text-2xl font-primary font-bold">My Orders</h1>
      </div>

        <div className="overflow-x-auto mt-10">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3">Order Num.</th>
                <th className="px-4 py-3">Purchase Date</th>
                <th className="px-4 py-3">Shipping Address</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{order.orderNum}</td>
                  <td className="px-4 py-3">{order.createdAt}</td>
                  <td className="px-4 py-3">{order.shippingInfo.address.street}, {order.shippingInfo.address.suburb}, {order.shippingInfo.address.state} {order.shippingInfo.address.postCode}</td>
                  <td className="px-4 py-3">${order.totalAmount}</td>
                  <td className="px-4 py-3">
                    {orderStatusMap[order.orderStatus] || <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">Unknown</span>}
                  </td>
                  <td className="px-4 py-3">
                    <button 
                      className="text-blue-500 hover:underline"
                      onClick={() => navigate(`/customer/orders/${order._id}`)}
                      >View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default OrderList