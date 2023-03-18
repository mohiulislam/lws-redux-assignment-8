import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEditBookMutation, useGetBookQuery } from "../features/api/apiSlice";
import MainLayout from "../layouts/MainLayout";

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: book, isLoading, isError, error } = useGetBookQuery(id);

  const [
    editBook,
    {
      isLoading: isEditLoading,
      isSuccess: isEditSuccess,
      isError: isEditError,
      error: editError,
    },
  ] = useEditBookMutation();
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [featured, setFeatured] = useState(false);

  useEffect(() => {
    if (book) {
      setName(book.name);
      setAuthor(book.author);
      setThumbnail(book.thumbnail);
      setPrice(book.price);
      setRating(book.rating);
      setFeatured(book.featured);
    }
  }, [book]);

  function handleEdit(e) {
    e.preventDefault();
    editBook({
      id,
      data: {
        name,
        author,
        thumbnail,
        price,
        rating,
        featured,
      },
    }).then(() => {
      navigate("/");
    });
  }
  return (
    <MainLayout>
      <main className="py-6 2xl:px-6">
        <div className="container">
          <div className="p-8 overflow-hidden bg-white shadow-cardShadow rounded-md max-w-xl mx-auto">
            <h4 className="mb-8 text-xl font-bold text-center">Edit Book</h4>
            <form onSubmit={handleEdit} className="book-form">
              <div className="space-y-2">
                <label htmlFor="lws-bookName">Book Name</label>
                <input
                  value={name}
                  required
                  className="text-input"
                  type="text"
                  id="lws-bookName"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="lws-author">Author</label>
                <input
                  value={author}
                  required
                  className="text-input"
                  type="text"
                  id="lws-author"
                  name="author"
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="lws-thumbnail">Image Url</label>
                <input
                  value={thumbnail}
                  required
                  className="text-input"
                  type="text"
                  id="lws-thumbnail"
                  name="thumbnail"
                  onChange={(e) => setThumbnail(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-8 pb-4">
                <div className="space-y-2">
                  <label htmlFor="lws-price">Price</label>
                  <input
                    value={price}
                    required
                    className="text-input"
                    type="number"
                    id="lws-price"
                    name="price"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lws-rating">Rating</label>
                  <input
                    value={rating}
                    required
                    className="text-input"
                    type="number"
                    id="lws-rating"
                    name="rating"
                    min="1"
                    max="5"
                    onChange={(e) => setRating(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <input
                  checked={featured}
                  id="lws-featured"
                  type="checkbox"
                  name="featured"
                  className="w-4 h-4"
                  onChange={(e) => setFeatured(e.target.checked)}
                />
                <label htmlFor="lws-featured" className="ml-2 text-sm">
                  This is a featured book
                </label>
              </div>
              <button type="submit" className="submit" id="lws-submit">
                Edit Book
              </button>
            </form>
            {isEditError ? (
              <div className={"text-center text-red-500"}>{editError}</div>
            ) : null}
          </div>
        </div>
      </main>
    </MainLayout>
  );
}

export default EditBook;
