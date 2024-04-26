using Microsoft.AspNetCore.Mvc;
using MyPharmacy.Core.Helpers;
using MyPharmacy.Services.Interfaces;

namespace PharmacyApi.Controllers;

/// <summary>
/// Controller for handling reporting related endpoints.
/// </summary>
[ApiController]
[Route("reporting")]
public class ReportingController(
    IReportingService reportingService,
    ILogger<ReportingController> logger
) : ControllerBase
{
    private readonly ILogger<ReportingController> _logger = logger;

    /// <summary>
    /// Retrieves warehouse profits.
    /// </summary>
    /// <returns>An asynchronous operation that returns an IActionResult.</returns>
    [HttpGet("warehouse-profits")]
    public async Task<IActionResult> GetWarehouseProfits() =>
        (reportingService.GetWarehouseProfitAsync()).HandleResponse();

    /// <summary>
    /// Retrieves delivery details.
    /// </summary>
    /// <returns>An asynchronous operation that returns an IActionResult.</returns>
    [HttpGet("delivery-detail")]
    public async Task<IActionResult> GetDeliveryDetail() =>
        (reportingService.GetDeliveryDetailAsync()).HandleResponse();

    /// <summary>
    /// Retrieves pharmacist sales summary.
    /// </summary>
    /// <returns>An asynchronous operation that returns an IActionResult.</returns>
    [HttpGet("sales-summary")]
    public async Task<IActionResult> GetPharmacistSalesSummary() =>
        (reportingService.GetPharmacistSalesSummaryAsync()).HandleResponse();
}