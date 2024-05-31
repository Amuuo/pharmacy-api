using System.Net;
using Microsoft.AspNetCore.Mvc;
using MyPharmacy.Core.Utilities;
using MyPharmacy.Core.Utilities.Interfaces;

namespace MyPharmacy.Core.Helpers;

public static class ServiceHelper
{
    /// <summary>
    /// Builds a service result with no content.
    /// </summary>
    /// <typeparam name="T">The type of the result.</typeparam>
    /// <param name="message">The error message.</param>
    /// <returns>The service result with no content.</returns>
    public static Result<T?> BuildNoContentResult<T>(string message)
    {
        return new Result<T?>
        {
            IsSuccess = false,
            ErrorMessage = message,
            StatusCode = HttpStatusCode.NotFound
        };
    }

    /// <summary>
    /// Builds a success service result.
    /// </summary>
    /// <typeparam name="T">The type of the result.</typeparam>
    /// <param name="result">The result.</param>
    /// <returns>The success service result.</returns>
    public static Result<T?> BuildSuccessServiceResult<T>(T? result)
    {
        return new Result<T?>
        {
            IsSuccess = true,
            Response = result,
            StatusCode = HttpStatusCode.OK
        };
    }

    /// <summary>
    /// Handles the service response and returns an appropriate action result.
    /// </summary>
    /// <typeparam name="T">The type of the result.</typeparam>
    /// <param name="response">The service response.</param>
    /// <returns>The action result.</returns>
    public static IActionResult HandleResponse<T>(this IResult<T> response)
    {
        return response.IsSuccess
            ? new ObjectResult(response.Response) { StatusCode = (int)response.StatusCode }
            : new ContentResult
            {
                Content = response.ErrorMessage,
                StatusCode = (int)response.StatusCode
            };
    }
}