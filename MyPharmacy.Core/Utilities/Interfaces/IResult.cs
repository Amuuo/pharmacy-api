using System.Net;
using Microsoft.AspNetCore.Mvc;

namespace MyPharmacy.Core.Utilities.Interfaces;

/// <summary>
/// An interface for a result object that contains a response object.
/// </summary>
/// <typeparam name="T">The type of response object</typeparam>
public interface IResult<out T> : IActionResult
{
    /// <summary>
    /// The response object.
    /// </summary>
    T? Response { get; }

    /// <summary>
    /// Whether the result was successful.
    /// </summary>
    bool IsSuccess { get; }
    
    /// <summary>
    /// The error message if the result was not successful.
    /// </summary>
    string? ErrorMessage { get; }

    /// <summary>
    /// The status code of the result.
    /// </summary>
    HttpStatusCode StatusCode { get; }

}