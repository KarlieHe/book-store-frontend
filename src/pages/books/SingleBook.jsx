import { useParams } from "react-router-dom";
import { useFetchBookByIdQuery } from "../../redux/features/books/booksApi";
import { getImgUrl } from "../../utils/getImgUrl";
import { useState } from "react";
import AddToCartBtn from "../../components/AddToCartBtn";

// import {capitalizeFirstLetter} from "../../utils/capitalFirstLetter";

const SingleBook = () => {
  const { id } = useParams();
  const { data: book, isLoading, error } = useFetchBookByIdQuery(id); 
  // console.log(capitalizeFirstLetter("shdfcg, sdhbj, jshg"))

  const [qty, setQty] = useState(1);

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }
  if (!book) {
    return <div>No book found</div>
  }

  return (
      <div className="flex gap-10 bg-webBG min-h-screen">
        {/* Left: cover and buttons */}
        <div className="relative flex flex-col pt-48 items-center w-1/2 rounded-r-3xl shadow-[4px_0_8px_-2px_rgba(0,0,0,0.2)] bg-gray-100">
          <img src={`${getImgUrl(book.image_url)}`} alt={book.title} className="w-1/2 h-auto hover:md:w-3/5 hover:md:shadow-lg" />
          {/* <div className="absolute flex flex-col gap-4 mt-4 left-[-5px]">
            <button className="btn-icon">💚</button>
            <button className="btn-icon">💬</button>
            <button className="btn-icon">📤</button>
          </div> */}
          {/* <div className="mt-6 flex gap-4">
            <button className="px-4 py-2 border-2 rounded-full border-primary border-solid text-primary">Pdf Preview</button>
            <button className="px-4 py-2 border-2 rounded-full border-primary border-solid text-primary">Audio Preview</button>
          </div> */}
        </div>

        {/* Right: book details */}
        <div className="flex-1 mt-48">
          <h1 className="text-4xl font-semibold">{book.title}</h1>
          <p className="mt-2 text-gray-600 font-secondary font-semibold text-lg">
            <span>By </span>
            {book.authors.length > 0 ? (
              book.authors.map((author, index) => (
                <a key={author.name} className="underline">
                  {author.name}
                  {index < book.authors.length - 1 && ", "}
                </a>
              ))
            ) : (
              "Unknown author"
            )}
          </p>
          <p className="text-md mb-2 font-thin mt-2"><span>Category: </span>{book.genres.join(", ")}</p>
          <div className="flex items-center gap-1 text-yellow-500">⭐⭐⭐⭐☆</div>

          {/* Rate and Price + Add to cart */}
          <div className="flex items-center gap-6 mt-4">
            
            <div className="flex gap-2 text-sm">
              {/* <button className="bg-gray-100 px-3 py-1 rounded">Hardcover ${book.original_price}</button> */}
              <button className="bg-green-100 px-3 py-3 rounded text-left">Softcover <span className="block">${book.finalPrice}</span></button>
              {/* <button className="bg-gray-100 px-3 py-1 rounded">Audio $7</button> */}
            </div>
            <div className="flex items-center space-x-4 my-4">
              <label htmlFor="stock-select" className="text-md font-thin font-secondary">Stock:</label>
              <select 
                id="stock-select" 
                className="p-2 border border-gray-300 rounded-md text-md font-thin font-secondary focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
              >
                {[...Array(book.stock)].map((_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>

            </div>
            <AddToCartBtn book={book} cartQuantity={qty}/>
            
          </div>
          {/* Tab 内容 */}
          <div className="mt-6">
            <div className="flex gap-6 text-md border-b pb-2">
              <span className="font-semibold border-b-2 border-black">Synopsis</span>
              {/* <span className="text-gray-500">Comments (2k)</span>
              <span className="text-gray-500">Awards (8)</span> */}
            </div>
            <p className="mt-4 text-gray-700 text-md leading-relaxed">
              {book.description} 
              {/* <span className="text-green-600 cursor-pointer">Read More</span> */}
            </p>
          </div>

          {/* Related book */}
          {/* <div className="mt-8">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Related Books</h3>
              <a className="text-sm text-green-600 cursor-pointer">See More</a>
            </div>
            <div className="grid grid-cols-3 gap-4"> */}
              {/* Related book card */}
            {/* </div>
          </div> */}
        </div>
      </div>

      
    
  )
}

export default SingleBook