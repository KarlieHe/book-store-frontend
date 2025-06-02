import { Link, useParams } from "react-router";
import { useFetchBookByIdQuery } from "../../redux/features/books/booksApi";
import { getImgUrl } from "../../utils/getImgUrl";
import { useState } from "react";
import AddToCartBtn from "../../components/AddToCartBtn";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";



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
    <div className="container mx-auto">
      <nav className="text-sm text-gray-600 space-x-1 pb-8">
        <ol className="list-reset flex md:text-lg">
          <li>
            <Link to={"/"} className="hover:underline text-black">Home</Link>
            <span className="mx-2">{'>'}</span>
          </li>
          <li>
            <Link a={"/books"} className="hover:underline text-black">Books</Link>
            <span className="mx-2">{'>'}</span>
          </li>
          <li className="text-gray-500">{book.title}</li>
        </ol>
      </nav>

      <div className="flex flex-col md:flex-row gap-10 bg-webBG">

        {/* Left: cover and buttons */}
        <div className="flex-1 flex items-center justify-center">
          <img src={`${getImgUrl(book.image_url)}`} alt={book.title} className="object-cover w-3/4 py-10" />
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
        <div className="flex-1 md:mt-12">
          <h1 className="text-2xl md:text-4xl font-semibold">{book.title}</h1>
          <p className="mt-2 text-gray-600 font-secondary font-semibold text-md md:text-lg">
            <span>By </span>
            {book.authors.length > 0 ? (
              book.authors.map((author, index) => (
                <Link key={author.name} className="underline">
                  {author.name}
                  {index < book.authors.length - 1 && ", "}
                </Link>
              ))
            ) : (
              "Unknown author"
            )}
          </p>
          <p className="text-sm md:text-md mb-2 font-thin mt-2"><span>Genres: </span>{book.genres.join(", ")}</p>
          <div className="flex flex-row items-center gap-1 text-yellow-500">
            <StarSolid className="w-5 h-5 text-yellow-500" />
            <StarSolid className="w-5 h-5 text-yellow-500" />
            <StarSolid className="w-5 h-5 text-yellow-500" />
            <StarSolid className="w-5 h-5 text-yellow-500" />
            <StarOutline className="w-5 h-5 text-yellow-500" />
          </div>

          {/* Rate and Price + Add to cart */}
          <div className="flex flex-col">
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <button className="bg-gray-100 px-3 py-1 rounded">PDF <span className="block">${book.original_price}</span></button>
              <button className="bg-green-100 px-3 py-3 rounded">Softcover <span className="block">${book.finalPrice}</span></button>
              {/* <button className="bg-gray-100 px-3 py-1 rounded">Audio $7</button> */}
            </div>
            <div className="flex flex-row mt-4 w-full justify-between">
              <div className="flex items-center space-x-4">
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
              <div className="shrink">
                <AddToCartBtn 
                  btnClass="!px-8 !py-2 !text-white !rounded-md hover:!bg-secondary transition-colors duration-300"
                  book={book} 
                  cartQuantity={qty}/>
                </div>
              
            </div>
            
          </div>
          {/* Tab 内容 */}
          <div className="my-6">
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
              <Link className="text-sm text-green-600 cursor-pointer">See More</Link>
            </div>
            <div className="grid grid-cols-3 gap-4"> */}
              {/* Related book card */}
            {/* </div>
          </div> */}
        </div>
      </div>

    </div>
  )
}

export default SingleBook