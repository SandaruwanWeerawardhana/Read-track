using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LibraryApi.Data;
using LibraryApi.Models;
using LibraryApi.Exceptions;

namespace LibraryApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly LibraryDbContext _context;
        private readonly ILogger<BooksController> _logger;

        public BooksController(LibraryDbContext context, ILogger<BooksController> logger)
        {
            _context = context;
            _logger = logger;
        }


        [HttpPost]
        public async Task<IActionResult> CreateBook([FromBody] Book book)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    var errors = ModelState.Values.SelectMany(v => v.Errors)
                        .Select(e => e.ErrorMessage)
                        .ToList();
                    throw new ValidationException("Book validation failed", errors);
                }

                if (string.IsNullOrWhiteSpace(book.Title))
                    throw new ValidationException("Book title cannot be empty");

                if (string.IsNullOrWhiteSpace(book.Author))
                    throw new ValidationException("Book author cannot be empty");

                _context.Books.Add(book);
                await _context.SaveChangesAsync();

                _logger.LogInformation($"Book created successfully: {book.Title} by {book.Author}");
                return CreatedAtAction(nameof(GetBook), new { id = book.Id }, ApiResponse<Book>.SuccessResponse(book, "Book created successfully"));
            }
            catch (ValidationException)
            {
                throw;
            }
            catch (DbUpdateException ex)
            {
                _logger.LogError(ex, "Database error while creating book");
                throw new System.InvalidOperationException("Failed to create book. Please try again.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while creating book");
                throw;
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetBooks()
        {
            try
            {
                var books = await _context.Books.ToListAsync();
                _logger.LogInformation($"Retrieved {books.Count} books");
                return Ok(ApiResponse<List<Book>>.SuccessResponse(books, "Books retrieved successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving books");
                throw;
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBook(int id)
        {
            try
            {
                if (id <= 0)
                    throw new ValidationException("Book ID must be greater than 0");

                var book = await _context.Books.FindAsync(id);

                if (book == null)
                    throw new ResourceNotFoundException($"Book with ID {id} not found");

                _logger.LogInformation($"Book retrieved: {book.Title}");
                return Ok(ApiResponse<Book>.SuccessResponse(book, "Book retrieved successfully"));
            }
            catch (ValidationException)
            {
                throw;
            }
            catch (ResourceNotFoundException)
            {
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving book with ID {id}");
                throw;
            }
        }




        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(int id, [FromBody] Book updatedBook)
        {
            try
            {
                if (id <= 0)
                    throw new ValidationException("Book ID must be greater than 0");

                if (!ModelState.IsValid)
                {
                    var errors = ModelState.Values.SelectMany(v => v.Errors)
                        .Select(e => e.ErrorMessage)
                        .ToList();
                    throw new ValidationException("Book validation failed", errors);
                }

                if (id != updatedBook.Id)
                    throw new ValidationException("Book ID in URL does not match the book ID in the request body");

                if (string.IsNullOrWhiteSpace(updatedBook.Title))
                    throw new ValidationException("Book title cannot be empty");

                if (string.IsNullOrWhiteSpace(updatedBook.Author))
                    throw new ValidationException("Book author cannot be empty");

                var book = await _context.Books.FindAsync(id);

                if (book == null)
                    throw new ResourceNotFoundException($"Book with ID {id} not found");

                book.Title = updatedBook.Title.Trim();
                book.Author = updatedBook.Author.Trim();
                book.Description = updatedBook.Description?.Trim() ?? string.Empty;

                await _context.SaveChangesAsync();

                _logger.LogInformation($"Book updated successfully: {book.Title} by {book.Author}");
                return Ok(ApiResponse<Book>.SuccessResponse(book, "Book updated successfully"));
            }
            catch (ValidationException)
            {
                throw;
            }
            catch (ResourceNotFoundException)
            {
                throw;
            }
            catch (DbUpdateException ex)
            {
                _logger.LogError(ex, $"Database error while updating book with ID {id}");
                throw new System.InvalidOperationException("Failed to update book. Please try again.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Unexpected error while updating book with ID {id}");
                throw;
            }
        }




        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            try
            {
                if (id <= 0)
                    throw new ValidationException("Book ID must be greater than 0");

                var book = await _context.Books.FindAsync(id);

                if (book == null)
                    throw new ResourceNotFoundException($"Book with ID {id} not found");

                _context.Books.Remove(book);
                await _context.SaveChangesAsync();

                _logger.LogInformation($"Book deleted successfully: ID {id}");
                return Ok(ApiResponse<object>.SuccessResponse(new { id }, "Book deleted successfully"));
            }
            catch (ValidationException)
            {
                throw;
            }
            catch (ResourceNotFoundException)
            {
                throw;
            }
            catch (DbUpdateException ex)
            {
                _logger.LogError(ex, $"Database error while deleting book with ID {id}");
                throw new System.InvalidOperationException("Failed to delete book. Please try again.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Unexpected error while deleting book with ID {id}");
                throw;
            }
        }
    }
}
