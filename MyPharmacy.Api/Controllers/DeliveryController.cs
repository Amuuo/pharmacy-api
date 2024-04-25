using Microsoft.AspNetCore.Mvc;
using MyPharmacy.Core.Helpers;
using MyPharmacy.Core.Utilities;
using MyPharmacy.Core.Utilities.Interfaces;
using MyPharmacy.Data.Entities;
using MyPharmacy.Services.Interfaces;

namespace PharmacyApi.Controllers;


[ApiController]
[Route("delivery")]
public class DeliveryController(
    ILogger<DeliveryController> logger,
    IDeliveryService deliveryService
) : ControllerBase
{
    private readonly ILogger<DeliveryController> _logger = logger;

    /// <summary>
    /// Retrieves a paginated list of deliveries.
    /// </summary>
    /// <remarks>
    /// ### This is a test of the remarks feature.
    /// - `IDeliveryService`
    /// - `PagingInfo`
    /// - `Result&lt;PagedResult&lt;Delivery&gt;&gt;`
    /// </remarks>
    /// <param name="pagingInfo">The info needed for pagination.</param>
    /// <returns>A service result containing a paged result of deliveries</returns>
    [ProducesResponseType<IResult<IPagedResult<Delivery>>>(StatusCodes.Status200OK)]
    [Produces("application/json")]
    [HttpGet]
    public async Task<IActionResult> GetDeliveryList([FromQuery] PagingInfo pagingInfo) =>
        (await deliveryService.GetPagedDeliveryList(pagingInfo)).HandleResponse();

    /// <summary>
    /// Retrieves a list of deliveries for a specific pharmacy.
    /// </summary>
    /// <param name="id">The ID of the pharmacy to retrieve deliveries for.</param>
    /// <returns>A service result containing an list of deliveries</returns>
    [ProducesResponseType<IResult<IEnumerable<Delivery>>>(StatusCodes.Status200OK)]
    [HttpGet("by-pharmacy/{id}")]
    public async Task<IActionResult> GetDeliveryListByPharmacyId(int id) =>
        (await deliveryService.GetDeliveryListByPharmacyId(id)).HandleResponse();

    /// <summary>
    /// Retrieves a list of deliveries for a specific pharmacy.
    /// </summary>
    /// <param name="id">The ID of the pharmacy to retrieve deliveries for.</param>
    /// <returns>A service result containing an list of deliveries.</returns>
    [ProducesResponseType<IResult<IEnumerable<Delivery>>>(StatusCodes.Status200OK)]
    [HttpGet("by-warehouse/{id}")]
    public async Task<IActionResult> GetDeliveryListByWarehouseId(int id) =>
        (await deliveryService.GetDeliveryListByWarehouseId(id)).HandleResponse();

    /// <summary>
    /// Inserts a new delivery record.
    /// </summary>
    /// <param name="newDelivery">The delivery object to insert.</param>
    /// <returns>A service result containing the inserted delivery.</returns>
    [ProducesResponseType<IResult<Delivery>>(StatusCodes.Status200OK)]
    [HttpPost("add")]
    public async Task<IActionResult> AddDelivery(Delivery newDelivery) =>
        (await deliveryService.InsertDeliveryAsync(newDelivery)).HandleResponse();
}