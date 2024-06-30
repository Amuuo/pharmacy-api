using FastEndpoints;
using MyPharmacy.Core.Utilities.Interfaces;

public static class EndpointExtensions
{
    public static async Task HandleResponseAsync<T>(this IEndpoint endpoint, IResult<T> result)
    {
        if (result.IsSuccess)
        {
            await endpoint.HttpContext.Response.SendAsync(result.Response);
        }
        else
        {
            await endpoint.HttpContext.Response.SendAsync(new { Error = result.ErrorMessage }, 400); // or appropriate status code
        }
    }

    //public static async Task HandleResponseAsync<T>(this IEndpoint endpoint, IResult<T> result)
    //{
    //    if (result.IsSuccess)
    //    {
    //        await endpoint.HttpContext.Response.SendAsync(result.Response);
    //    }
    //    else
    //    {
    //        await endpoint.HttpContext.Response.SendAsync(new { Error = result.ErrorMessage }, 400); // or appropriate status code
    //    }
    //}
}
