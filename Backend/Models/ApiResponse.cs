namespace LibraryApi.Models
{
    public class ApiResponse<T>
    {
        public bool Success { get; set; }
        public T? Data { get; set; }
        public string? Message { get; set; }
        public List<string>? Errors { get; set; }

        public static ApiResponse<T> SuccessResponse(T data, string message = "Operation successful")
        {
            return new ApiResponse<T>
            {
                Success = true,
                Data = data,
                Message = message
            };
        }

        public static ApiResponse<T> ErrorResponse(string message, List<string>? errors = null)
        {
            return new ApiResponse<T>
            {
                Success = false,
                Data = default,
                Message = message,
                Errors = errors
            };
        }
    }

    public class ApiErrorResponse
    {
        public bool Success { get; set; } = false;
        public string? Message { get; set; }
        public List<string>? Errors { get; set; }
        public string? TraceId { get; set; }

        public static ApiErrorResponse Create(string message, List<string>? errors = null, string? traceId = null)
        {
            return new ApiErrorResponse
            {
                Success = false,
                Message = message,
                Errors = errors,
                TraceId = traceId
            };
        }
    }
}
