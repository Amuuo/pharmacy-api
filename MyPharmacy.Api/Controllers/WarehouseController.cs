using Microsoft.AspNetCore.Mvc;
using MyPharmacy.Core.Helpers;
using MyPharmacy.Data.Entities;
using MyPharmacy.Services.Interfaces;

namespace PharmacyApi.Controllers;

/// <summary>
/// Represents a controller for managing warehouse operations.
/// </summary>
[ApiController]
[Route("warehouse")]
public class WarehouseController(
    ILogger<WarehouseController> logger,
    IWarehouseService warehouseService
) : ControllerBase
{
    private readonly ILogger<WarehouseController> _logger = logger;

    /// <summary>
    /// Retrieves a list of warehouses.
    /// </summary>
    /// <returns>An asynchronous operation that returns an IActionResult.</returns>
    [HttpPost]
    public async Task<IActionResult> GetWarehouseList() =>
        (await warehouseService.GetWarehouseListAsync()).HandleResponse();

    /// <summary>
    /// Retrieves a warehouse by its ID.
    /// </summary>
    /// <param name="id">The ID of the warehouse.</param>
    /// <returns>An asynchronous operation that returns an IActionResult.</returns>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetWarehouseById(int id) =>
        (await warehouseService.GetWarehouseByIdAsync(id)).HandleResponse();

    /// <summary>
    /// Updates a warehouse.
    /// </summary>
    /// <param name="updatedWarehouse">The updated warehouse object.</param>
    /// <returns>An asynchronous operation that returns an IActionResult.</returns>
    [HttpPut("update")]
    public async Task<IActionResult> UpdateWarehouse(Warehouse updatedWarehouse) =>
        (await warehouseService.UpdateWarehouseAsync(updatedWarehouse)).HandleResponse();

    /// <summary>
    /// Adds a new warehouse.
    /// </summary>
    /// <param name="newWarehouse">The new warehouse object.</param>
    /// <returns>An asynchronous operation that returns an IActionResult.</returns>
    [HttpPost("add")]
    public async Task<IActionResult> AddWarehouse(Warehouse newWarehouse) =>
        (await warehouseService.InsertWarehouseAsync(newWarehouse)).HandleResponse();
}