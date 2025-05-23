
import { useFetchBooksQuery } from '../../redux/features/books/booksApi';
import { getImgUrl } from '../../utils/getImgUrl';

const Inventory = () => {
  const { data: booksData, isLoading, isError } = useFetchBooksQuery();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading books</div>;
  }
  if (!booksData) {
    return <div>No books found</div>;
  }
  const books = Object.values(booksData?.entities || {})
  // console.log(booksData)
  console.log(books)
  return (
    <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Books <span className="text-gray-500">{books.length}</span></h2>
          <div className="space-x-2">
            <button className="border px-3 py-1 rounded text-sm text-gray-600">All time</button>
            <button className="border px-3 py-1 rounded text-sm text-gray-600">📥</button>
          </div>
        </div>
        {/* Search bar for books */}
        <div className="bg-white border rounded-lg shadow-sm">
          <div className="p-4 border-b">
            <input
                type="text"
                placeholder="Search..."
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
          </div>
        </div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3"><input type="checkbox" /></th>
                <th className="px-4 py-3">Cover</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Author</th>
                <th className="px-4 py-3">Genres</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Discount</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
          <tbody className="text-sm divide-y">
            {books.map((book) => {
              const discount = book.discounts?.[0];
              const finalPrice = discount
                ? (book.original_price * (1 - discount.discount_value / 100)).toFixed(2)
                : book.original_price.toFixed(2);

              return (
                <tr key={book._id}>
                  <td className="px-4 py-3"><input type="checkbox" /></td>
                  <td className="px-4 py-3">
                    <img
                      src={`${getImgUrl(book.image_url)}`}
                      alt={book.title}
                      className="h-16 w-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium">{book.title}</td>
                  <td className="px-4 py-3">{book.authors.map(a => a.name).join(", ")}</td>
                  <td className="px-4 py-3 capitalize">{book.genres.join(", ")}</td>
                  <td className="px-4 py-3">{book.stock}</td>
                  <td className="px-4 py-3">${finalPrice}</td>
                  <td className="px-4 py-3">
                    {discount ? (
                      <span className="text-green-600">
                        {discount.discount_value}% Off
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {book.trending ? (
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
                        Trending
                      </span>
                    ) : (
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded">
                        Normal
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
            </tbody>
          </table>
          </div>
    </div>
  )
}

export default Inventory;