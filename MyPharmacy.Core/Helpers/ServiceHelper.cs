using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
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

    //public static IActionResult HandlePagedStreamingResponse<T>(
    //    this IResult<IPagedResult<T>> result,
    //    MediaTypeHeaderValue? contentType = null)
    //{
    //    if (!result.IsSuccess)
    //    {
    //        return new ContentResult
    //        {
    //            Content    = result.ErrorMessage,
    //            StatusCode = (int)result.StatusCode
    //        };
    //    }

    //    contentType ??= new MediaTypeHeaderValue("application/stream+json");

    //    return new StreamingWithHeadersResult<T>(result.Response, contentType);
    //}

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

    /// <summary>
    /// Retrieves a paged result asynchronously.
    /// </summary>
    /// <typeparam name="T">The type of the result.</typeparam>
    /// <param name="logger">The logger.</param>
    /// <param name="query">The queryable data.</param>
    /// <param name="pageNumber">The page number.</param>
    /// <param name="pageSize">The page size.</param>
    /// <returns>The paged result.</returns>
    //public static async Task<IResult<IPagedResult<T>>> GetPagedResultAsync<T>(
    //    ILogger logger,
    //    IQueryable<T> query,
    //    PagingInfo pagingInfo) where T : class
    //{
    //    var startRow = pagingInfo.PageNumber * pagingInfo.PageSize;

    //    var entities = query
    //        .AsQueryable()
    //        .AsNoTracking()
    //        .Skip(startRow)
    //        .PageSize(pagingInfo.PageSize)
    //        .AsEnumerable();


    //    return await BuildPagedServiceResultAsync<T>(
    //        entities,
    //        pagingInfo,
    //        await query.CountAsync());
    //}

    /// <summary>
    /// Builds a paged service result asynchronously.
    /// </summary>
    /// <typeparam name="T">The type of the result.</typeparam>
    /// <param name="data">The paged data.</param>
    /// <param name="currentPage">The current page number.</param>
    /// <param name="pageSize">The page size.</param>
    /// <param name="totalCount">The total count of items.</param>
    /// <returns>The paged service result.</returns>
    //public static Task<IResult<IPagedResult<T>>> BuildPagedServiceResultAsync<T>(
    //    IEnumerable<T> data,
    //    PagingInfo pagingInfo,
    //    int totalCount) where T : class
    //{
    //    var pagedResult = new PagedResult<T>
    //    {
    //        PagingInfo = pagingInfo,
    //        Count      = totalCount,
    //        Pages      = (int)Math.Ceiling(totalCount / (double)pagingInfo.PageSize),
    //        Data       = data
    //    };

    //    return Task.FromResult(BuildSuccessServiceResult<IPagedResult<T>>(pagedResult));
    //}
}