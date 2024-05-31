using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using MyPharmacy.Core.Helpers;
using MyPharmacy.Core.Utilities;
using MyPharmacy.Core.Utilities.Interfaces;
using MyPharmacy.Data;
using MyPharmacy.Data.Entities;
using MyPharmacy.Data.Repository.Interfaces;
using MyPharmacy.Services.Interfaces;

namespace MyPharmacy.Services;

/// <inheritdoc/>
public class DeliveryService(
    ILogger<DeliveryService> logger,
    IPharmacyDbContext dbContext,
    IMemoryCache cache,
    IDeliveryRepository deliveryRepository
) : IDeliveryService
{
    /// <inheritdoc/>
    public async Task<IResult<IPagedResult<Delivery>>> GetPagedDeliveryList(PagingInfo pagingInfo)
    {
        var cachedResult = await cache.GetOrCreateAsync(
            key: $"PagedDeliveryList_{pagingInfo.PageNumber}_{pagingInfo.PageSize}",
            value =>
            {
                value.AbsoluteExpiration = DateTime.Now.AddMinutes(5);
                return deliveryRepository.GetPagedDeliveryListAsync(pagingInfo);
            }
        );

        return new Result<IPagedResult<Delivery>>(cachedResult);
    }

    /// <inheritdoc/>
    public async Task<IResult<IEnumerable<Delivery>>> GetDeliveryListByPharmacyId(int pharmacyId)
    {
        var cachedResult = await cache.GetOrCreateAsync(
            key: $"DeliveryListByPharmacy_{pharmacyId}",
            value =>
            {
                value.AbsoluteExpiration = DateTime.Now.AddMinutes(5);
                return deliveryRepository.GetDeliveryListByPharmacyIdAsync(pharmacyId);
            }
        );

        return new Result<IEnumerable<Delivery>>(cachedResult);
    }

    /// <inheritdoc/>
    public Task<IResult<IEnumerable<Delivery>>> GetDeliveryListByWarehouseId(int warehouseId)
    {
        var deliveryListByWarehouse = dbContext.DeliveryList.Where(d =>
            d.Warehouse.Id == warehouseId
        );

        return Task.FromResult<IResult<IEnumerable<Delivery>>>(
            new Result<IEnumerable<Delivery>>(deliveryListByWarehouse)
        );
    }

    /// <inheritdoc/>
    public async Task<IResult<Delivery>> InsertDeliveryAsync(Delivery delivery)    
    {
        var warehouseExists = await dbContext.WarehouseList.AnyAsync(w =>
            w.Id == delivery.WarehouseId
        );
        var pharmacyExists = await dbContext.PharmacyList.AnyAsync(p =>
            p.Id == delivery.PharmacyId
        );

        if (!warehouseExists || !pharmacyExists)
        {
            return new Result<Delivery>("Error inserting delivery");
        }

        dbContext.DeliveryList.Add(delivery);
        await dbContext.SaveChangesAsync();

        return new Result<Delivery>(delivery);
    }
}
