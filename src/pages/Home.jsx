import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Book from "../components/Book";
import { useGetBooksQuery } from "../features/api/apiSlice";
import { filter } from "../features/filter/filterSlice";
import MainLayout from "../layouts/MainLayout";

function Home() {
  const { filterBy } = useSelector((state) => state.filter);
  const { searchTerm } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const { data: books, isLoading, isError, error } = useGetBooksQuery();
  function handleFilter(arg) {
    dispatch(filter(arg));
  }

  let content;
  if (isLoading) {
    content = <div>Loading...</div>;
  }
  if (!isLoading && isError) {
    content = <div>{error}</div>;
  }
  if (!isLoading && !isError && books.length === 0) {
    content = <div>No book found</div>;
  }
  if (!isLoading && !isError && books.length > 0) {
    content = books
      .filter((book) => (filterBy === "featured" ? book.featured : true))
      .filter((book) =>
        book.name.toLowerCase().includes(searchTerm?.toLowerCase())
      )
      .map((book) => <Book book={book} key={book.id} />);
  }

  return (
    <MainLayout>
      <main className="py-12 px-6 2xl:px-6 container">
        <div className="order-2 xl:-order-1">
          <div className="flex items-center justify-between mb-12">
            <h4 className="mt-2 text-xl font-bold">Book List</h4>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleFilter("all")}
                className={`lws-filter-btn ${
                  filterBy === "all" ? " active-filter" : ""
                }`}
              >
                All
              </button>
              <button
                onClick={() => handleFilter("featured")}
                className={`lws-filter-btn ${
                  filterBy === "featured" ? " active-filter" : ""
                }`}
              >
                Featured
              </button>
            </div>
          </div>
          <div className="space-y-6 md:space-y-0 md:grid grid-cols-1 lg:grid-cols-3 gap-6">
            {content}
          </div>
        </div>
      </main>
    </MainLayout>
  );
}

export default Home;
