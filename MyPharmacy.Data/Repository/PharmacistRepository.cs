using System.Data;
using System.Runtime.InteropServices;
using Dapper;
using MyPharmacy.Core.Utilities;
using MyPharmacy.Core.Utilities.Interfaces;
using MyPharmacy.Data.Entities;
using MyPharmacy.Data.Repository.Interfaces;

namespace MyPharmacy.Data.Repository;

/// <summary>
/// Represents a repository for managing pharmacists in the database.
/// </summary>
public class PharmacistRepository(IDbConnection dbConnection) : IPharmacistRepository
{
    /// <inheritdoc/>
    public async Task<Pharmacist?> AddPharmacistAsync(Pharmacist pharmacist)
    {
        var insertedPharmacist = await dbConnection.QueryFirstOrDefaultAsync<Pharmacist>(
            sql: "spAddPharmacist",
            new
            {
                pharmacist.FirstName,
                pharmacist.LastName,
                pharmacist.Age,
                pharmacist.HireDate,
                pharmacist.PrimaryRx,
                pharmacist.ModifiedBy
            },
            commandType: CommandType.StoredProcedure
        );

        return insertedPharmacist;
    }

    /// <inheritdoc/>
    public Task<int> GetPharmacistListCount()
    {
        const string sql = """
            SELECT
                COUNT(*)
            FROM
                Pharmacist
            """;

        var pharmacistListCount = dbConnection.QuerySingleAsync<int>(sql);

        return pharmacistListCount;
    }

    /// <inheritdoc/>
    public async Task<IPagedResult<Pharmacist>> GetPagedPharmacistListAsync(PagingInfo pagingInfo)
    {
        var parameters = new DynamicParameters(
            new { Page = pagingInfo.PageNumber, Take = pagingInfo.PageSize }
        );

        parameters.Add("Count", dbType: DbType.Int32, direction: ParameterDirection.Output);
        parameters.Add("Pages", dbType: DbType.Int32, direction: ParameterDirection.Output);

        var pharmacists = await dbConnection.QueryAsync<Pharmacist>(
            "spGetPagedPharmacistList",
            parameters,
            commandType: CommandType.StoredProcedure
        );

        return new PagedResult<Pharmacist>
        {
            Data = pharmacists,
            Count = parameters.Get<int>("Count"),
            Pages = parameters.Get<int>("Pages"),
            PagingInfo = pagingInfo
        };
    }

    /// <inheritdoc/>
    public async Task<Pharmacist?> GetPharmacistByIdAsync(int id)
    {
        var pharmacist = await dbConnection.QueryFirstOrDefaultAsync<Pharmacist>(
            "spGetPharmacistById",
            new { Id = id },
            commandType: CommandType.StoredProcedure
        );

        return pharmacist;
    }

    /// <inheritdoc/>
    public async Task<IEnumerable<Pharmacist>?> GetPharmacistListByPharmacyIdAsync(int pharmacyId)
    {
        var pharmacist = await dbConnection.QueryAsync<Pharmacist>(
            "spGetPharmacistListByPharmacyId",
            new { PharmacyId = pharmacyId },
            commandType: CommandType.StoredProcedure
        );

        return pharmacist;
    }

    /// <inheritdoc/>
    public async Task<Pharmacist?> UpdatePharmacistAsync(Pharmacist pharmacist)
    {
        var updatedPharmacist = await dbConnection.QueryFirstOrDefaultAsync<Pharmacist>(
            "spUpdatePharmacist",
            new
            {
                pharmacist.Id,
                pharmacist.FirstName,
                pharmacist.LastName,
                pharmacist.Age,
                pharmacist.HireDate,
                pharmacist.PrimaryRx
            },
            commandType: CommandType.StoredProcedure
        );

        return updatedPharmacist;
    }
}