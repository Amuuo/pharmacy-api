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

public class PharmacyService(
    ILogger<IPharmacyService> logger,
    IPharmacyDbContext pharmacyDbContext,
    IPharmacyRepository pharmacyRepository,
    IMemoryCache cache
) : IPharmacyService
{
    /// <inheritdoc/>
    public async Task<IResult<IPagedResult<Pharmacy>?>> GetPharmacyListPagedAsync(
        PagingInfo pagingInfo
    )
    {
        var cacheKey = $"PharmacyList_{pagingInfo.PageNumber}_{pagingInfo.PageSize}";

        var cachedPharmacyListPaged = await cache.GetOrCreateAsync(
            cacheKey,
            x =>
            {
                x.AbsoluteExpiration = DateTime.Now.AddMinutes(5);
                return pharmacyRepository.GetPharmacyListPagedAsync(pagingInfo);
            }
        );

        return new Result<IPagedResult<Pharmacy>?>(cachedPharmacyListPaged);
    }

    /// <inheritdoc/>
    public async Task<IResult<Pharmacy?>> UpdatePharmacyAsync(Pharmacy updatedPharmacy)
    {
        var existingPharmacy = await pharmacyRepository.UpdatePharmacyAsync(updatedPharmacy);

        return new Result<Pharmacy?>(existingPharmacy);
    }

    /// <inheritdoc/>
    public async Task<IResult<Pharmacy?>> GetPharmacyByIdAsync(int id)
    {
        var cachedPharmacy = await cache.GetOrCreateAsync(
            $"Pharmacy_{id}",
            x =>
            {
                x.AbsoluteExpiration = DateTime.Now.AddMinutes(5);
                return pharmacyRepository.GetByIdAsync(id);
            }
        );

        return cachedPharmacy is not null
            ? new Result<Pharmacy?>(cachedPharmacy)
            : new Result<Pharmacy?>($"No pharmacy found with id {id}");
    }

    /// <inheritdoc/>
    public async Task<IResult<Pharmacy?>> InsertPharmacyAsync(Pharmacy newPharmacy)
    {
        var resultPharmacy = await pharmacyRepository.InsertPharmacyAsync(newPharmacy);

        return new Result<Pharmacy?>(resultPharmacy);
    }

    /// <inheritdoc/>
    public async Task<IResult<IEnumerable<Pharmacy>?>> GetPharmaciesByPharmacistIdAsync(
        int pharmacistId
    )
    {
        var cacheKey = $"PharmacistPharmacyList_{pharmacistId}";

        var pharmacyList = await cache.GetOrCreateAsync(
            cacheKey,
            x =>
            {
                x.AbsoluteExpiration = DateTime.Now.AddMinutes(5);
                return pharmacyRepository.GetPharmaciesByPharmacistIdAsync(pharmacistId);
            }
        );

        return new Result<IEnumerable<Pharmacy>?>(pharmacyList);
    }
}
