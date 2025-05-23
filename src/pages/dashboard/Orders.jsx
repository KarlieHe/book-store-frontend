
const orders = [
  {
    product: "Color Mastery in Web Design",
    image: "https://via.placeholder.com/40",
    customer: "Arlene McCoy",
    email: "mccarlene@gmail.com",
    date: "10 Mar, 4:32 pm",
    status: "Paid",
    price: "$49.00",
  },
  {
    product: "Color Mastery in Web Design",
    image: "https://via.placeholder.com/40",
    customer: "Dianne Russell",
    email: "dianne@russell.com",
    date: "10 Mar, 3:22 pm",
    status: "Paid",
    price: "$39.20",
  },
  {
    product: "Speedy Design Solutions",
    image: "https://via.placeholder.com/40",
    customer: "Esther Howard",
    email: "howard@gmail.com",
    date: "10 Mar, 1:32 pm",
    status: "Paid",
    price: "$59.00",
  },
];

const Orders = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Orders <span className="text-gray-500">217</span></h2>
        <div className="space-x-2">
          <button className="border px-3 py-1 rounded text-sm text-gray-600">All time</button>
          <button className="border px-3 py-1 rounded text-sm text-gray-600">📥</button>
        </div>
      </div>

      <div className="bg-white border rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-2 border rounded-md text-sm"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3"><input type="checkbox" /></th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Purchase Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Price</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3"><input type="checkbox" /></td>
                  <td className="px-4 py-3 flex items-center space-x-2">
                    <img src={order.image} alt="" className="w-10 h-10 rounded" />
                    <span>{order.product}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{order.customer}</div>
                    <div className="text-gray-500 text-xs">{order.email}</div>
                  </td>
                  <td className="px-4 py-3">{order.date}</td>
                  <td className="px-4 py-3">
                    <span className="text-green-600 font-semibold">● {order.status}</span>
                  </td>
                  <td className="px-4 py-3">{order.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
