import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBookStore } from "../store/bookStore";
import BookForm from "../components/BookForm";
import type { BookFormData } from "../types/book";

const AddBookPage = () => {
  const navigate = useNavigate();
  const addBook = useBookStore((state) => state.addBook);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: BookFormData) => {
    setIsSubmitting(true);
    try {
      await addBook(data);
      navigate("/home");
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Link
        to="/home"
        className="inline-flex items-center gap-2 text-text-secondary font-medium mb-6 hover:text-accent-primary transition-colors duration-150"
      >
        ← Back to Books
      </Link>
      <div className="max-w-xl mx-auto">
        <div className="bg-bg-secondary/80 border border-white/10 rounded-xl p-8">
          <h1 className="text-2xl font-semibold text-text-primary mb-8">
            Add New Book
          </h1>
          <BookForm
            onSubmit={handleSubmit}
            submitLabel="Add Book"
            isLoading={isSubmitting}
          />
        </div>
      </div>
    </>
  );
};

export default AddBookPage;
