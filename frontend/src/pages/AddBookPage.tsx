import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBookStore } from "../store/bookStore";
import BookForm from "../components/BookForm";
import type { BookFormData } from "../types/book";

const AddBookPage = () => {
  const navigate = useNavigate();
  const addBook = useBookStore((state) => state.addBook);
  const clearError = useBookStore((state) => state.clearError);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (data: BookFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    clearError();
    try {
      await addBook(data);
      navigate("/home");
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Failed to add book. Please try again.");
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
          
          {/* Error Alert */}
          {submitError && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <div className="flex items-start gap-3">
                <span className="text-red-400 text-xl">⚠️</span>
                <div className="flex-1">
                  <p className="text-red-400 font-medium">Failed to add book</p>
                  <p className="text-red-400/80 text-sm mt-1">{submitError}</p>
                </div>
                <button 
                  onClick={() => setSubmitError(null)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
          
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
