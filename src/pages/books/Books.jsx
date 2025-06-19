import { useEffect, useState } from 'react';
import { useFetchBooksQuery } from '../../redux/features/books/booksApi';
import { useParams, useNavigate, Link } from 'react-router';
import { categories } from '../../utils/constants';
import { BookCard2 } from '../../components/BookCard2';
import Pagination from '../../components/Pagination';

const Books = () => {
  const { genre } = useParams();
  const CapitalizedGenre = genre ? genre.charAt(0).toUpperCase() + genre.slice(1) : 'All';
  const [selectedGenre, setSelectedGenre] = useState(CapitalizedGenre); // Default to 'All' if genre is not provided
  const [page, setPage] = useState(1);
  const navigate = useNavigate();


  const { data, isLoading, error } = useFetchBooksQuery({
    genre: selectedGenre === 'All' ? '' : selectedGenre.toLowerCase(),
    page,
  });
  
  useEffect(() => {
    setSelectedGenre(CapitalizedGenre);
    setPage(1); 
  }, [CapitalizedGenre]);

  const filteredBooks = Object.values(data?.entities || {});
  const totalPages = data?.pagination.totalPages || 1;

  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    const finalCategory = selected === 'All' ? '' : selected.toLowerCase();
    navigate(`/books/${finalCategory}`); 
  };

  return (
    <div className="flex flex-col pb-8">
      <nav className="text-sm text-gray-600 space-x-1 py-8">
          <ol className="list-reset flex md:text-lg">
            <li>
              <Link to={"/"} className="hover:underline text-black">Home</Link>
              <span className="mx-2">{'>'}</span>
            </li>
            <li className="text-gray-500">Books</li>
          </ol>
        </nav>
        <div className='grow mb-6'>
            <div className="pl-4 pb-4">
                <h1 className="text-3xl font-primary font-semibold">Books</h1>
            </div>

            <div className="flex justify-between items-center mb-6 mt-3 pl-4">
                <div className="space-x-4">
                <label className="mr-2">Filter by:</label>
                <select
                  value={selectedGenre} // this makes the selected option match the state
                  onChange={handleCategoryChange}
                  className="border px-2 py-1 rounded"
                >
                  {categories.map((c, index) => (
                    <option key={index} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {/* <select className="border px-2 py-1 rounded">
                    <option>Price</option>
                    <option>Under $50</option>
                    <option>Under $100</option>
                </select>
                </div>
                <div>
                <label className="mr-2">Sort by:</label>
                <select className="border px-2 py-1 rounded">
                    <option>Featured</option>
                    <option>Newest</option>
                </select> */}
                </div>
            </div>

            <div id="book-grid" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-4 gap-x-2 md:gap-x-4">
                {!isLoading &&
                !error &&
                filteredBooks.length > 0 &&
                filteredBooks
                    .filter((book) => book.stock > 0)
                    .map((book, index) => <BookCard2 key={index} book={book} />)}
            </div>
        </div>
        {/* 分页控件 */}
        <div className='mt-auto'>
          {totalPages > 1 && (
            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(page) => setPage(page)}
            />
            )}
        </div>


    </div>
  );
};

export default Books;
