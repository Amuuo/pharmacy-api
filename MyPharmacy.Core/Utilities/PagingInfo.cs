using MyPharmacy.Core.Utilities.Interfaces;

namespace MyPharmacy.Core.Utilities;

/// <summary>
/// Represents the paging information for a request.
/// </summary>
public class PagingInfo : IPagedRequest
{
    /// <summary>
    /// The page number being requested
    /// </summary>
    public int PageNumber { get; set; }

    /// <summary>
    /// The page size being requested
    /// </summary>
    public int PageSize { get; set; } = 10;
}