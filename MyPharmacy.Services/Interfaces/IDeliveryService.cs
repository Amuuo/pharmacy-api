using MyPharmacy.Core.Utilities;
using MyPharmacy.Core.Utilities.Interfaces;
using MyPharmacy.Data.Entities;

namespace MyPharmacy.Services.Interfaces;

public interface IDeliveryService
{
    /// <summary>
    /// Asynchronously retrieves a paginated list of deliveries.
    /// </summary>
    /// <remarks>
    /// This is a test of the remarks feature.
    /// <code>IDeliveryService</code>
    /// </remarks>
    /// <param name="pagingInfo">The paging information.</param>
    /// <returns>A service result containing a paged result of deliveries or an error if an exception occurs.</returns>
    Task<IResult<IPagedResult<Delivery>>> GetPagedDeliveryList(PagingInfo pagingInfo);

    /// <summary>
    /// Asynchronously gets a list of deliveries for a specific pharmacy.
    /// </summary>
    /// <param name="pharmacyId">The ID of the pharmacy to retrieve deliveries for.</param>
    /// <returns>A service result containing an asynchronous enumerable of deliveries or an error if an exception occurs.</returns>
    Task<IResult<IEnumerable<Delivery>>> GetDeliveryListByPharmacyId(int pharmacyId);

    /// <summary>
    /// Asynchronously gets a list of deliveries for a specific warehouse.
    /// </summary>
    /// <param name="warehouseId">The ID of the warehouse to retrieve deliveries for.</param>
    /// <returns>A service result containing an asynchronous enumerable of deliveries or an error if an exception occurs.</returns>
    Task<IResult<IEnumerable<Delivery>>> GetDeliveryListByWarehouseId(int warehouseId);

    /// <summary>
    /// Asynchronously inserts a new delivery record.
    /// </summary>
    /// <param name="delivery">The delivery object to insert.</param>
    /// <returns>A service result containing the inserted delivery or an error if an exception occurs.</returns>
    Task<IResult<Delivery>> InsertDeliveryAsync(Delivery delivery);
}