using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using MyPharmacy.Core.Helpers;
using MyPharmacy.Core.Utilities;
using MyPharmacy.Core.Utilities.Interfaces;
using MyPharmacy.Data;
using MyPharmacy.Data.Entities;
using MyPharmacy.Data.Repository;
using MyPharmacy.Data.Repository.Interfaces;
using MyPharmacy.Services.Interfaces;

namespace MyPharmacy.Services;

///<inheritdoc/>
public class PharmacistService(
    ILogger<IPharmacistService> logger,
    IPharmacyDbContext dbContext,
    IPharmacistRepository pharmacistRepository,
    IMemoryCache cache
) : IPharmacistService
{
    ///<inheritdoc/>
    public async Task<IResult<IPagedResult<Pharmacist>?>> GetPagedPharmacistListAsync(
        PagingInfo pagingInfo
    )
    {
        var cachedList = await cache.GetOrCreateAsync(
            key: $"PagedPharmacistList_{pagingInfo.PageNumber}_{pagingInfo.PageSize}",
            value =>
            {
                value.AbsoluteExpiration = DateTime.Now.AddMinutes(5);
                return pharmacistRepository.GetPagedPharmacistListAsync(pagingInfo);
            }
        );

        return new Result<IPagedResult<Pharmacist>?>(cachedList);
    }

    ///<inheritdoc/>
    public async Task<IResult<Pharmacist?>> GetPharmacistByIdAsync(int id)
    {
        var cachedPharmacist = await cache.GetOrCreateAsync(
            key: $"Pharmacist_{id}",
            value =>
            {
                value.AbsoluteExpiration = DateTime.Now.AddMinutes(5);
                return pharmacistRepository.GetPharmacistByIdAsync(id);
            }
        );

        return cachedPharmacist is not null
            ? new Result<Pharmacist?>(cachedPharmacist)
            : new Result<Pharmacist?>($"No pharmacist found with ID {id}");
    }

    ///<inheritdoc/>
    public async Task<IResult<IEnumerable<Pharmacist>?>> GetPharmacistListByPharmacyIdAsync(
        int pharmacyId
    )
    {
        var cachedPharmacistList = await cache.GetOrCreateAsync(
            key: $"PharmacistListByPharmacy_{pharmacyId}",
            value =>
            {
                value.AbsoluteExpiration = DateTime.Now.AddMinutes(5);
                return pharmacistRepository.GetPharmacistListByPharmacyIdAsync(pharmacyId);
            }
        );

        return new Result<IEnumerable<Pharmacist>?>(cachedPharmacistList);
    }

    ///<inheritdoc/>
    public async Task<IResult<Pharmacist?>> UpdatePharmacistAsync(Pharmacist pharmacistToUpdate)
    {
        var existingPharmacist = await pharmacistRepository.GetPharmacistByIdAsync(
            pharmacistToUpdate.Id
        );

        if (existingPharmacist is null)
        {
            return new Result<Pharmacist?>($"No pharmacist found with ID {pharmacistToUpdate.Id}");
        }

        var pharmacist = await pharmacistRepository.UpdatePharmacistAsync(pharmacistToUpdate);

        return new Result<Pharmacist?>(pharmacist);
    }

    ///<inheritdoc/>
    public async Task<IResult<Pharmacist?>> AddPharmacistAsync(Pharmacist pharmacist)
    {
        var newPharmacist = await pharmacistRepository.AddPharmacistAsync(pharmacist);

        return new Result<Pharmacist?>(newPharmacist);
    }
}
