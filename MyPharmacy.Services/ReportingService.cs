using Microsoft.Extensions.Logging;
using MyPharmacy.Core.Helpers;
using MyPharmacy.Core.Utilities;
using MyPharmacy.Core.Utilities.Interfaces;
using MyPharmacy.Data;
using MyPharmacy.Data.Entities;
using MyPharmacy.Services.Interfaces;

namespace MyPharmacy.Services;

///<inheritdoc/>
public class ReportingService(ILogger<IReportingService> logger, IPharmacyDbContext dbContext)
    : IReportingService
{
    ///<inheritdoc/>
    public Result<IAsyncEnumerable<VwWarehouseProfit>> GetWarehouseProfitAsync()
    {
        var warehouseProfits = dbContext.VwWarehouseProfits.AsAsyncEnumerable();

        return new Result<IAsyncEnumerable<VwWarehouseProfit>>(warehouseProfits);
    }

    ///<inheritdoc/>
    public Result<IAsyncEnumerable<VwDeliveryDetail>> GetDeliveryDetailAsync()
    {
        var deliveryDetails = dbContext.VwDeliveryDetails.AsAsyncEnumerable();

        return new Result<IAsyncEnumerable<VwDeliveryDetail>>(deliveryDetails);
    }

    ///<inheritdoc/>
    public Result<IAsyncEnumerable<VwPharmacistSalesSummary>> GetPharmacistSalesSummaryAsync()
    {
        var pharmacistSalesSummary = dbContext.VwPharmacistSalesSummaries.AsAsyncEnumerable();

        return new Result<IAsyncEnumerable<VwPharmacistSalesSummary>>(pharmacistSalesSummary);
    }
}