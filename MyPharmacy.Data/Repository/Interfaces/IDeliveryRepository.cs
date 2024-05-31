using MyPharmacy.Core.Utilities;
using MyPharmacy.Core.Utilities.Interfaces;
using MyPharmacy.Data.Entities;

namespace MyPharmacy.Data.Repository.Interfaces;


public interface IDeliveryRepository
{
    /// <summary>
    /// Retrieves a paged list of deliveries.
    /// </summary>
    /// <param name="pagingInfo">The paging information.</param>
    /// <returns>A paged result of deliveries.</returns>
    Task<IPagedResult<Delivery>> GetPagedDeliveryListAsync(PagingInfo pagingInfo);

    /// <summary>
    /// Retrieves a list of deliveries by pharmacy ID.
    /// </summary>
    /// <param name="pharmacyId">The ID of the pharmacy.</param>
    /// <returns>A list of deliveries associated with the specified pharmacy ID.</returns>
    Task<IEnumerable<Delivery>> GetDeliveryListByPharmacyIdAsync(int pharmacyId);

    /// <summary>
    /// Adds a new delivery.
    /// </summary>
    /// <param name="delivery">The delivery to add.</param>
    /// <returns>The inserted delivery.</returns>
    Task<Delivery?> AddDeliveryAsync(Delivery delivery);

    /// <summary>
    /// Retrieves a delivery by its ID.
    /// </summary>
    /// <param name="id">The ID of the delivery.</param>
    /// <returns>The delivery with the specified ID.</returns>
    Task<Delivery?> GetDeliveryByIdAsync(int id);

    /// <summary>
    /// Updates an existing delivery.
    /// </summary>
    /// <param name="delivery">The delivery to update.</param>
    /// <returns>The updated delivery.</returns>
    Task<Delivery?> UpdateDeliveryAsync(Delivery delivery);
}