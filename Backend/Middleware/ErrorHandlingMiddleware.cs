using System.Net;
using System.Text.Json;
using LibraryApi.Exceptions;
using LibraryApi.Models;

namespace LibraryApi.Middleware
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ErrorHandlingMiddleware> _logger;

        public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unhandled exception occurred");
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";

            var response = new ApiErrorResponse();
            var traceId = context.TraceIdentifier;

            switch (exception)
            {
                case ValidationException validationEx:
                    context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    response = ApiErrorResponse.Create(
                        validationEx.Message,
                        validationEx.Errors.Count > 0 ? validationEx.Errors : null,
                        traceId
                    );
                    break;

                case ResourceNotFoundException notFoundEx:
                    context.Response.StatusCode = (int)HttpStatusCode.NotFound;
                    response = ApiErrorResponse.Create(notFoundEx.Message, null, traceId);
                    break;

                case System.InvalidOperationException invalidOpEx:
                    context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    response = ApiErrorResponse.Create(invalidOpEx.Message, null, traceId);
                    break;

                default:
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    response = ApiErrorResponse.Create(
                        "An unexpected error occurred. Please try again later.",
                        new List<string> { exception.Message },
                        traceId
                    );
                    break;
            }

            var jsonResponse = JsonSerializer.Serialize(response);
            return context.Response.WriteAsync(jsonResponse);
        }
    }
}
