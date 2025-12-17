namespace LibraryApi.Exceptions
{
    public class ValidationException : Exception
    {
        public List<string> Errors { get; set; }

        public ValidationException(string message, List<string>? errors = null) : base(message)
        {
            Errors = errors ?? new List<string>();
        }

        public ValidationException(List<string> errors) : base("Validation errors occurred.")
        {
            Errors = errors;
        }
    }

    public class ResourceNotFoundException : Exception
    {
        public ResourceNotFoundException(string message) : base(message) { }
    }

    public class InvalidOperationException : Exception
    {
        public InvalidOperationException(string message) : base(message) { }
    }
}
