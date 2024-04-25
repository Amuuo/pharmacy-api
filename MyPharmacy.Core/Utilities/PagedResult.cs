using MyPharmacy.Core.Utilities.Interfaces;

namespace MyPharmacy.Core.Utilities;

/// <summary>
/// Represents a paged result of type <typeparamref name="T"/>.
/// </summary>
/// <typeparam name="T">The type of data in the paged result.</typeparam>
public class PagedResult<T> : IPagedResult<T>
{
    /// <summary>
    /// Gets or sets the paging information.
    /// </summary>
    public PagingInfo? PagingInfo { get; init; }

    /// <summary>
    /// Gets or sets the total number of pages.
    /// </summary>
    public int Pages { get; init; }

    /// <summary>
    /// Gets or sets the total count of items.
    /// </summary>
    public int Count { get; init; }

    /// <summary>
    /// Gets or sets the data in the paged result.
    /// </summary>
    public IEnumerable<T>? Data { get; init; }
}