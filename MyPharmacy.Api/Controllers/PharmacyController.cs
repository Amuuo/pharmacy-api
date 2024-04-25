using Microsoft.AspNetCore.Mvc;
using MyPharmacy.Core.Utilities;
using MyPharmacy.Data.Entities;
using MyPharmacy.Services.Interfaces;
using MyPharmacy.Core.Helpers;

namespace PharmacyApi.Controllers;

/// <summary>
/// Represents the controller for managing pharmacy-related operations.
/// </summary>
[ApiController]
[Route("pharmacy")]
public class PharmacyController : ControllerBase
{
    private ILogger<PharmacyController> _logger { get; }
    private IPharmacyService _pharmacyService { get; }

    /// <summary>
    /// Initializes a new instance of the <see cref="PharmacyController"/> class.
    /// </summary>
    /// <param name="logger">The logger instance.</param>
    /// <param name="pharmacyService">The pharmacy service instance.</param>
    public PharmacyController(
        ILogger<PharmacyController> logger,
        IPharmacyService pharmacyService
    )
    {
        _logger = logger;
        _pharmacyService = pharmacyService;
    }

    /// <summary>
    /// Retrieves a paged list of pharmacies.
    /// </summary>
    /// <param name="pagingInfo">The paging information.</param>
    /// <returns>An <see cref="IActionResult"/> representing the response of the operation.</returns>
    [HttpGet]
    public async Task<IActionResult> GetPagedPharmacyList([FromQuery] PagingInfo pagingInfo) =>
        (await _pharmacyService.GetPharmacyListPagedAsync(pagingInfo)).HandleResponse();

    /// <summary>
    /// Retrieves a pharmacy by its ID.
    /// </summary>
    /// <param name="id">The ID of the pharmacy.</param>
    /// <returns>An <see cref="IActionResult"/> representing the response of the operation.</returns>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetPharmacyById(int id) =>
        (await _pharmacyService.GetPharmacyByIdAsync(id)).HandleResponse();

    /// <summary>
    /// Retrieves pharmacies by pharmacist ID.
    /// </summary>
    /// <param name="id">The ID of the pharmacist.</param>
    /// <returns>An <see cref="IActionResult"/> representing the response of the operation.</returns>
    [HttpGet("by-pharmacist/{id}")]
    public async Task<IActionResult> GetPharmaciesByPharmacistId(int id) =>
        (await _pharmacyService.GetPharmaciesByPharmacistIdAsync(id)).HandleResponse();

    /// <summary>
    /// Updates a pharmacy.
    /// </summary>
    /// <param name="updatedPharmacy">The updated pharmacy object.</param>
    /// <returns>An <see cref="IActionResult"/> representing the response of the operation.</returns>
    [HttpPut("update")]
    public async Task<IActionResult> UpdatePharmacy(Pharmacy updatedPharmacy) =>
        (await _pharmacyService.UpdatePharmacyAsync(updatedPharmacy)).HandleResponse();

    /// <summary>
    /// Adds a new pharmacy.
    /// </summary>
    /// <param name="newPharmacy">The new pharmacy object.</param>
    /// <returns>An <see cref="IActionResult"/> representing the response of the operation.</returns>
    [HttpPost("add")]
    public async Task<IActionResult> AddPharmacy(Pharmacy newPharmacy) =>
        (await _pharmacyService.InsertPharmacyAsync(newPharmacy)).HandleResponse();
}