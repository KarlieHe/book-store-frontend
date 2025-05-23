import { useEffect, useState } from 'react';
import { useFetchBooksQuery } from '../../redux/features/books/booksApi';
import { useParams } from 'react-router';
import { categories } from '../../utils/constants';
import { BookCard2 } from '../../components/BookCard2';
import Pagination from '../../components/Pagination';

const Books = () => {
  const { genre } = useParams();
  const [category, setCategory] = useState(genre || '');
  const [page, setPage] = useState(1);


  const { data, isLoading, error } = useFetchBooksQuery({
    genre: category.toLowerCase(),
    page,
  });
  
  useEffect(() => {
    setCategory(genre || '');
    setPage(1); 
  }, [genre]);

  const filteredBooks = Object.values(data?.entities || {});
  const totalPages = data?.pagination.totalPages || 1;

  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setCategory(selected === 'All' ? '' : selected);
    setPage(1); 
  };

  return (
    <div className="flex flex-col p-4">
        <div className='flex-grow mb-6'>
            <div className="px-6 py-6">
                <h1 className="text-3xl font-primary font-semibold">Books</h1>
            </div>

            <div className="flex justify-between items-center mb-6 mt-3">
                <div className="space-x-4">
                <label className="mr-2">Filter by:</label>
                <select className="border px-2 py-1 rounded" onChange={handleCategoryChange}>
                    {categories.map((c, index) => (
                    <option key={index} value={c}>{c}</option>
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

            <div id="book-grid" className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                {!isLoading &&
                !error &&
                filteredBooks.length > 0 &&
                filteredBooks
                    .filter((book) => book.stock > 0)
                    .map((book, index) => <BookCard2 key={index} book={book} />)}
            </div>
        </div>
      {/* 分页控件 */}
      {totalPages > 1 && (
        <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(page) => setPage(page)}
        />
        )}


    </div>
  );
};

export default Books;
