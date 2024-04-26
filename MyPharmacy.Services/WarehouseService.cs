using Microsoft.Extensions.Logging;
using MyPharmacy.Core.Helpers;
using MyPharmacy.Core.Utilities;
using MyPharmacy.Core.Utilities.Interfaces;
using MyPharmacy.Data;
using MyPharmacy.Data.Entities;
using MyPharmacy.Services.Interfaces;

namespace MyPharmacy.Services;

/// <summary>
/// Represents a service for managing warehouses.
/// </summary>
public class WarehouseService(ILogger<WarehouseService> logger, IPharmacyDbContext dbContext)
    : IWarehouseService
{
    ///<inheritdoc/>
    public async Task<IResult<IAsyncEnumerable<Warehouse>>> GetWarehouseListAsync()
    {
        var warehouseList = dbContext.WarehouseList.AsAsyncEnumerable();
        return ServiceHelper.BuildSuccessServiceResult(warehouseList);
    }

    ///<inheritdoc/>
    public async Task<IResult<Warehouse>> InsertWarehouseAsync(Warehouse newWarehouse)
    {
        if (await dbContext.WarehouseList.FindAsync(newWarehouse.Id) is not null)
        {
            return new Result<Warehouse>(
                @$"Warehouse with id {newWarehouse.Id} already exists. Use update endpoint to modify an existing record"
            );
        }

        await dbContext.WarehouseList.AddAsync(newWarehouse);
        await dbContext.SaveChangesAsync();

        return new Result<Warehouse>(newWarehouse);
    }

    ///<inheritdoc/>
    public async Task<IResult<Warehouse>> UpdateWarehouseAsync(Warehouse updatedWarehouse)
    {
        var searchResult = await GetWarehouseByIdAsync(updatedWarehouse.Id);

        if (searchResult.IsSuccess is false)
        {
            return searchResult;
        }

        var existingWarehouse = searchResult.Response;
        UpdateExistingWarehouse(existingWarehouse, updatedWarehouse);

        await dbContext.SaveChangesAsync();

        return new Result<Warehouse>(existingWarehouse);
    }

    ///<inheritdoc/>
    public async Task<IResult<Warehouse>> GetWarehouseByIdAsync(int id)
    {
        var warehouse = await dbContext.WarehouseList.FindAsync(id);

        return warehouse is null
            ? new Result<Warehouse>($"No warehouse found with id {id}")
            : new Result<Warehouse>(warehouse);
    }

    private static void UpdateExistingWarehouse(
        Warehouse existingWarehouse,
        Warehouse updatedWarehouse
    )
    {
        existingWarehouse.Name = updatedWarehouse.Name ?? existingWarehouse.Name;
        existingWarehouse.Address = updatedWarehouse.Address ?? existingWarehouse.Address;
        existingWarehouse.City = updatedWarehouse.City ?? existingWarehouse.City;
        existingWarehouse.State = updatedWarehouse.State ?? existingWarehouse.State;
        existingWarehouse.Zip = updatedWarehouse.Zip ?? existingWarehouse.Zip;
    }
}
