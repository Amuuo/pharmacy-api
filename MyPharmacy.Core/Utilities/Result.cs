using System.Net;
using Microsoft.AspNetCore.Mvc;
using MyPharmacy.Core.Utilities.Interfaces;

namespace MyPharmacy.Core.Utilities;

/// <summary>
/// Represents a result of an operation with a response of type <typeparamref name="T"/>.
/// </summary>
/// <typeparam name="T">The type of the response.</typeparam>
public class Result<T> : IResult<T>
{
    /// <summary>
    /// Gets or sets the response.
    /// </summary>
    public T? Response { get; set; }

    /// <summary>
    /// Gets or sets a value indicating whether the operation was successful.
    /// </summary>
    public bool IsSuccess { get; set; }

    /// <summary>
    /// Gets or sets the error message.
    /// </summary>
    public string? ErrorMessage { get; set; }

    /// <summary>
    /// Gets or sets the HTTP status code.
    /// </summary>
    public HttpStatusCode StatusCode { get; set; }

    /// <summary>
    /// Initializes a new instance of the <see cref="Result{T}"/> class.
    /// </summary>
    public Result() { }

    /// <summary>
    /// Initializes a new instance of the <see cref="Result{T}"/> class with the specified response.
    /// </summary>
    /// <param name="response">The response.</param>
    public Result(T? response)
    {
        Response = response;
        IsSuccess = true;
        ErrorMessage = string.Empty;
        StatusCode = HttpStatusCode.OK;
    }

    /// <summary>
    /// Initializes a new instance of the <see cref="Result{T}"/> class with the specified error message.
    /// </summary>
    /// <param name="message">The error message.</param>
    public Result(string? message)
    {
        IsSuccess = false;
        ErrorMessage = message;
        StatusCode = HttpStatusCode.OK;
    }

    /// <summary>
    /// Executes the result asynchronously.
    /// </summary>
    /// <param name="context">The action context.</param>
    /// <returns>A task representing the asynchronous operation.</returns>
    public Task ExecuteResultAsync(ActionContext context)
    {
        throw new NotImplementedException();
    }
}
