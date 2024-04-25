using System.Net;
using Microsoft.AspNetCore.Mvc;
using MyPharmacy.Core.Utilities.Interfaces;

namespace MyPharmacy.Core.Utilities;

public class Result<T> : IResult<T>
{
    public T? Response { get; set; }
    public bool IsSuccess { get; set; }
    public string? ErrorMessage { get; set; }
    public HttpStatusCode StatusCode { get; set; }

    public Result() { }

    public Result(T? response)
    {
        Response = response;
        IsSuccess = true;
        ErrorMessage = string.Empty;
        StatusCode = HttpStatusCode.OK;
    }

    public Result(string? message)
    {
        IsSuccess = false;
        ErrorMessage = message;
        StatusCode = HttpStatusCode.OK;
    }

    public Task ExecuteResultAsync(ActionContext context)
    {
        throw new NotImplementedException();
    }
}