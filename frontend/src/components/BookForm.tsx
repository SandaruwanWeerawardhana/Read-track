import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { BookFormData } from '../types/book';
import { useNavigate } from 'react-router-dom';

const bookSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title must be less than 200 characters'),
  author: z
    .string()
    .min(1, 'Author is required')
    .max(100, 'Author must be less than 100 characters'),
  description: z
    .string()
    .max(2000, 'Description must be less than 2000 characters')
    .optional()
    .or(z.literal('')),
});

interface BookFormProps {
  initialData?: BookFormData;
  onSubmit: (data: BookFormData) => void;
  isLoading?: boolean;
  submitLabel?: string;
}

const BookForm = ({ 
  initialData, 
  onSubmit, 
  isLoading = false,
  submitLabel = 'Save Book'
}: BookFormProps) => {
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: initialData || {
      title: '',
      author: '',
      description: '',
    },
  });

  const handleFormSubmit = (data: BookFormData) => {
    // Clean up empty description
    const cleanedData = {
      ...data,
      description: data.description?.trim() || undefined,
    };
    onSubmit(cleanedData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <div className="mb-6">
        <label htmlFor="title" className="block mb-2 text-sm font-medium text-text-secondary">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          className={`form-input ${errors.title ? 'error' : ''}`}
          placeholder="Enter book title"
          {...register('title')}
          autoFocus
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
            <span>⚠️</span>
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="author" className="block mb-2 text-sm font-medium text-text-secondary">
          Author <span className="text-red-500">*</span>
        </label>
        <input
          id="author"
          type="text"
          className={`form-input ${errors.author ? 'error' : ''}`}
          placeholder="Enter author name"
          {...register('author')}
        />
        {errors.author && (
          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
            <span>⚠️</span>
            {errors.author.message}
          </p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="description" className="block mb-2 text-sm font-medium text-text-secondary">
          Description
        </label>
        <textarea
          id="description"
          className={`form-textarea ${errors.description ? 'error' : ''}`}
          placeholder="Enter book description (optional)"
          rows={5}
          {...register('description')}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
            <span>⚠️</span>
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="flex gap-4 mt-8">
        <button 
          type="button" 
          className="btn btn-secondary btn-lg flex-1"
          onClick={() => navigate(-1)}
          disabled={isLoading}
        >
          Cancel
        </button>
        <button 
          type="submit" 
          className="btn btn-primary btn-lg flex-1"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default BookForm;
