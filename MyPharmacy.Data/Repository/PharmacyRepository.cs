using System.Data;
using Dapper;
using MyPharmacy.Core.Utilities;
using MyPharmacy.Core.Utilities.Interfaces;
using MyPharmacy.Data.Entities;
using MyPharmacy.Data.Repository.Interfaces;

namespace MyPharmacy.Data.Repository;

/// <summary>
/// Represents a repository for managing pharmacy data.
/// </summary>
public class PharmacyRepository(IDbConnection dbConnection) : IPharmacyRepository
{
    /// <inheritdoc />
    public async Task<IPagedResult<Pharmacy>?> GetPharmacyListPagedAsync(PagingInfo pagingInfo)
    {
        var parameters = new DynamicParameters(
            new { Page = pagingInfo.PageNumber, Take = pagingInfo.PageSize, }
        );

        parameters.Add("Count", dbType: DbType.Int32, direction: ParameterDirection.Output);
        parameters.Add("Pages", dbType: DbType.Int32, direction: ParameterDirection.Output);

        var pharmacies = await dbConnection.QueryAsync<Pharmacy>(
            "spGetPagedPharmacyList",
            parameters,
            commandType: CommandType.StoredProcedure
        );

        return new PagedResult<Pharmacy>
        {
            Data = pharmacies,
            PagingInfo = pagingInfo,
            Count = parameters.Get<int>("Count"),
            Pages = parameters.Get<int>("Pages")
        };
    }

    /// <inheritdoc />
    public async Task<Pharmacy?> GetByIdAsync(int id)
    {
        var pharmacy = await dbConnection.QueryFirstOrDefaultAsync<Pharmacy>(
            "spGetPharmacyById",
            new { Id = id },
            commandType: CommandType.StoredProcedure
        );

        return pharmacy;
    }

    /// <inheritdoc />
    public async Task<Pharmacy?> InsertPharmacyAsync(Pharmacy pharmacy)
    {
        var insertedPharmacy = await dbConnection.QueryFirstOrDefaultAsync<Pharmacy>(
            "spInsertPharmacy",
            new
            {
                pharmacy.Name,
                pharmacy.Address,
                pharmacy.City,
                pharmacy.State,
                pharmacy.Zip,
                pharmacy.PrescriptionsFilled,
                pharmacy.ModifiedBy
            },
            commandType: CommandType.StoredProcedure
        );

        return insertedPharmacy;
    }

    /// <inheritdoc />
    public async Task<Pharmacy?> UpdatePharmacyAsync(Pharmacy pharmacy)
    {
        var updatedPharmacy = await dbConnection.QueryFirstOrDefaultAsync<Pharmacy>(
            "spUpdatePharmacy",
            new
            {
                pharmacy.Id,
                pharmacy.Name,
                pharmacy.Address,
                pharmacy.City,
                pharmacy.State,
                pharmacy.Zip,
                pharmacy.PrescriptionsFilled,
                pharmacy.ModifiedBy
            },
            commandType: CommandType.StoredProcedure
        );

        return updatedPharmacy;
    }

    /// <inheritdoc />
    public async Task<IEnumerable<Pharmacy>?> GetPharmaciesByPharmacistIdAsync(int pharmacistId)
    {
        var pharmacyList = await dbConnection.QueryAsync<Pharmacy>(
            "spGetPharmaciesByPharmacistId",
            new { pharmacistId },
            commandType: CommandType.StoredProcedure
        );

        return pharmacyList;
    }
}