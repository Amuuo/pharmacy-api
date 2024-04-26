using Microsoft.AspNetCore.Mvc;
using MyPharmacy.Core.Helpers;
using MyPharmacy.Core.Utilities;
using MyPharmacy.Data.Entities;
using MyPharmacy.Services.Interfaces;

namespace PharmacyApi.Controllers;

/// <summary>
/// Represents a controller for managing pharmacists.
/// </summary>
[ApiController]
[Route("pharmacist")]
public class PharmacistController(
    ILogger<PharmacistController> logger,
    IPharmacistService pharmacistService
) : ControllerBase
{
    private readonly ILogger<PharmacistController> _logger = logger;

    /// <summary>
    /// Retrieves a paged list of pharmacists.
    /// </summary>
    /// <param name="pagingInfo">The paging information.</param>
    /// <returns>An asynchronous operation that returns an IActionResult.</returns>
    [HttpGet]
    public async Task<IActionResult> GetPagedPharmacistList([FromQuery] PagingInfo pagingInfo) =>
        (await pharmacistService.GetPagedPharmacistListAsync(pagingInfo)).HandleResponse();

    /// <summary>
    /// Retrieves a list of pharmacists by pharmacy ID.
    /// </summary>
    /// <param name="id">The pharmacy ID.</param>
    /// <returns>An asynchronous operation that returns an IActionResult.</returns>
    [HttpGet("by-pharmacy/{id}")]
    public async Task<IActionResult> GetPharmacistListByPharmacyId(int id) =>
        (await pharmacistService.GetPharmacistListByPharmacyIdAsync(id)).HandleResponse();

    /// <summary>
    /// Retrieves a pharmacist by ID.
    /// </summary>
    /// <param name="id">The pharmacist ID.</param>
    /// <returns>An asynchronous operation that returns an IActionResult.</returns>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetPharmacistById(int id) =>
        (await pharmacistService.GetPharmacistByIdAsync(id)).HandleResponse();

    /// <summary>
    /// Updates a pharmacist.
    /// </summary>
    /// <param name="pharmacist">The pharmacist to update.</param>
    /// <returns>An asynchronous operation that returns an IActionResult.</returns>
    [HttpPut("update")]
    public async Task<IActionResult> UpdatePharmacist(Pharmacist pharmacist) =>
        (await pharmacistService.UpdatePharmacistAsync(pharmacist)).HandleResponse();

    /// <summary>
    /// Adds a new pharmacist.
    /// </summary>
    /// <param name="pharmacist">The pharmacist to add.</param>
    /// <returns>An asynchronous operation that returns an IActionResult.</returns>
    [HttpPost("add")]
    public async Task<IActionResult> AddPharmacist(Pharmacist pharmacist) =>
        (await pharmacistService.AddPharmacistAsync(pharmacist)).HandleResponse();
}