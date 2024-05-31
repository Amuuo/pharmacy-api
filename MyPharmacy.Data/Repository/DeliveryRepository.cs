using System.Data;
using Dapper;
using MyPharmacy.Core.Utilities;
using MyPharmacy.Core.Utilities.Interfaces;
using MyPharmacy.Data.Entities;
using MyPharmacy.Data.Repository.Interfaces;

namespace MyPharmacy.Data.Repository;

/// <summary>
/// Represents a repository for managing deliveries.
/// </summary>
public class DeliveryRepository(IDbConnection dbConnection) : IDeliveryRepository
{    
    /// <inheritdoc/>
    public async Task<IPagedResult<Delivery>> GetPagedDeliveryListAsync(PagingInfo pagingInfo)
    {
        var parameters = new DynamicParameters(
            new { Page = pagingInfo.PageNumber, Take = pagingInfo.PageSize }
        );

        parameters.Add("Count", dbType: DbType.Int32, direction: ParameterDirection.Output);
        parameters.Add("Pages", dbType: DbType.Int32, direction: ParameterDirection.Output);

        var deliveries = await dbConnection.QueryAsync<Delivery>(
            sql: "spGetPagedDeliveryList",
            parameters,
            commandType: CommandType.StoredProcedure
        );

        return new PagedResult<Delivery>
        {
            Data = deliveries,
            PagingInfo = pagingInfo,
            Count = parameters.Get<int>("Count"),
            Pages = parameters.Get<int>("Pages")
        };
    }

    /// <inheritdoc/>
    public async Task<Delivery?> AddDeliveryAsync(Delivery delivery)
    {
        var insertedDelivery = await dbConnection.QueryFirstOrDefaultAsync<Delivery>(
            sql: "spAddDelivery",
            new
            {
                delivery.PharmacyId,
                delivery.DeliveryDate,
                delivery.ModifiedBy
            },
            commandType: CommandType.StoredProcedure
        );

        return insertedDelivery;
    }

    /// <inheritdoc/>
    public async Task<Delivery?> UpdateDeliveryAsync(Delivery delivery)
    {
        var updatedDelivery = await dbConnection.QueryFirstOrDefaultAsync<Delivery>(
            sql: "spUpdateDelivery",
            new
            {
                delivery.Id,
                delivery.PharmacyId,
                delivery.DeliveryDate,
                delivery.ModifiedBy
            },
            commandType: CommandType.StoredProcedure
        );

        return updatedDelivery;
    }

    /// <inheritdoc/>
    public async Task<Delivery?> GetDeliveryByIdAsync(int id)
    {
        var delivery = await dbConnection.QueryFirstOrDefaultAsync<Delivery>(
            sql: "spGetDeliveryById",
            new { id },
            commandType: CommandType.StoredProcedure
        );

        return delivery;
    }

    /// <inheritdoc/>
    public async Task<IEnumerable<Delivery>> GetDeliveryListByPharmacyIdAsync(int pharmacyId)
    {
        var deliveries = await dbConnection.QueryAsync<Delivery>(
            sql: "spGetDeliveryListByPharmacyId",
            new { PharmacyId = pharmacyId },
            commandType: CommandType.StoredProcedure
        );

        return deliveries;
    }
}
