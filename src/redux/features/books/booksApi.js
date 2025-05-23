import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../apiSlice';

export const booksAdapter = createEntityAdapter();
export const initialState = booksAdapter.getInitialState();

const transformBooks = (responseData) => {
  const loadedBooks = responseData.books.map((book) => ({
    ...book,
    finalPrice: parseFloat((book.original_price - 10).toFixed(2)),
    id: book._id
  }));
  return {
    ...booksAdapter.setAll(initialState, loadedBooks),
    pagination: {
      total: responseData.total,
      page: responseData.page,
      totalPages: responseData.totalPages
    }
  };
};

export const booksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch books with optional query parameters
    fetchBooks: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return `/books?${queryString}`;
      },
      transformResponse: transformBooks,
      providesTags: (result) =>
        result?.ids
          ? [...result.ids.map((id) => ({ type: 'Books', id })), 'Books']
          : ['Books']
    }),

    // Fetch a single book by ID
    fetchBookById: builder.query({
      query: (id) => `/books/${id}`,
      transformResponse: (book) => ({
        ...book,
        id: book._id,
        finalPrice: parseFloat((book.original_price - 10).toFixed(2))
      }),
      providesTags: (result, error, id) => [{ type: 'Books', id }]
    }),

    // Create a new book
    addABook: builder.mutation({
      query: (newBook) => ({
        url: '/books/create-book',
        method: 'POST',
        body: newBook
      }),
      invalidatesTags: ['Books']
    }),

    // Update an existing book
    updateABook: builder.mutation({
      query: (book) => ({
        url: `/books/${book._id}`,
        method: 'PATCH',
        body: book
      }),
      invalidatesTags: (result, error, { _id }) => [{ type: 'Books', id: _id }]
    }),
    
    // Delete a book
    deleteABook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Books', id }]
    })
  })
});

export const {
  useFetchBooksQuery,
  useFetchBookByIdQuery,
  useAddABookMutation,
  useUpdateABookMutation,
  useDeleteABookMutation
} = booksApi;

// Select normalized data
export const selectBooksResult = booksApi.endpoints.fetchBooks.select();

export const selectBooksData = createSelector(
  selectBooksResult,
  (booksResult) => booksResult?.data ?? initialState
);

export const {
  selectAll: selectAllBooks,
  selectById: selectBookById,
  selectIds: selectBookIds
} = booksAdapter.getSelectors((state) => selectBooksData(state));

// 获取分页信息
export const selectBooksPagination = createSelector(
  selectBooksResult,
  (result) => result?.data?.pagination ?? { total: 0, page: 1, totalPages: 1 }
);
