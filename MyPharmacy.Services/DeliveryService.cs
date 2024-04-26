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
    public async Task<IResult<IPagedResult<Delivery>>> GetPagedDeliveryList(PagingInfo pagingInfo)
    {
        var cacheKey = $"PagedDeliveryList_{pagingInfo.PageNumber}_{pagingInfo.PageSize}";

        var cachedResult = await cache.GetOrCreateAsync(
            cacheKey,
            x =>
            {
                x.AbsoluteExpiration = DateTime.Now.AddMinutes(5);
                return deliveryRepository.GetPagedDeliveryListAsync(pagingInfo);
            }
        );

        return new Result<IPagedResult<Delivery>>(cachedResult);
    }

    public async Task<IResult<IEnumerable<Delivery>>> GetDeliveryListByPharmacyId(int pharmacyId)
    {
        var cacheKey = $"DeliveryListByPharmacy_{pharmacyId}";

        var cachedResult = await cache.GetOrCreateAsync(
            cacheKey,
            x =>
            {
                x.AbsoluteExpiration = DateTime.Now.AddMinutes(5);
                return deliveryRepository.GetDeliveryListByPharmacyIdAsync(pharmacyId);
            }
        );

        return new Result<IEnumerable<Delivery>>(cachedResult);
    }

    public Task<IResult<IEnumerable<Delivery>>> GetDeliveryListByWarehouseId(int warehouseId)
    {
        var deliveryListByWarehouse = dbContext.DeliveryList.Where(d =>
            d.Warehouse.Id == warehouseId
        );

        return Task.FromResult<IResult<IEnumerable<Delivery>>>(
            new Result<IEnumerable<Delivery>>(deliveryListByWarehouse)
        );
    }

    public async Task<IResult<Delivery>> InsertDeliveryAsync(Delivery delivery)
    /// <inheritdoc/>
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
