using FastEndpoints;
using MyPharmacy.Core.Utilities;
using MyPharmacy.Core.Utilities.Interfaces;
using MyPharmacy.Services.Interfaces;

namespace MyPharmacy.Api.Endpoints.Pharmacy;


/// <summary>
/// Endpoint for retrieving a paginated list of pharmacies.
/// </summary>
public class GetPharmacyListEndpoint(IPharmacyService pharmacyService)
    : Endpoint<GetPharmacyListRequest, GetPharmacyListResponse>
{
    public override void Configure()
    {
        Get("/pharmacy/list");
        Summary(s =>
        {
            s.Summary = "Retrieve a list of pharmacies";
            s.Description = "This endpoint retrieves a paginated list of pharmacies based on the provided pagination criteria.";
            s.Response<GetPharmacyListResponse>(200, "The paginated list of pharmacies was successfully retrieved.");
        });
        AllowAnonymous();
    }

    public override async Task HandleAsync(GetPharmacyListRequest req, CancellationToken ct)
    {
        var result = await pharmacyService.GetPharmacyListPagedAsync(req.PagingInfo);

        if (result.IsSuccess)
        {
            await SendOkAsync(new GetPharmacyListResponse(result.Response), ct);
        }
        else
        {
            await SendNotFoundAsync(ct);
        }
    }
}

public record GetPharmacyListRequest(PagingInfo PagingInfo);

public record GetPharmacyListResponse(IPagedResult<Data.Entities.Pharmacy>? PharmacyList);
