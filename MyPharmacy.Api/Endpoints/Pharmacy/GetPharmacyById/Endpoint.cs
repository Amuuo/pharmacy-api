using FastEndpoints;
using MyPharmacy.Services.Interfaces;

namespace MyPharmacy.Api.Endpoints.Pharmacy.GetPharmacyById;

/// <summary>
/// Endpoint for retrieving a pharmacy record by its Id.
/// </summary>
public class GetPharmacyByIdEndpoint(IPharmacyService pharmacyService)
    : EndpointWithoutRequest<GetPharmacyByIdResponse, PharmacyMapper>
{
    public override void Configure()
    {
        Get("/pharmacy/{id}");
        Summary(new GetPharmacyByIdSummary());
        AllowAnonymous();
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var result = await pharmacyService.GetPharmacyByIdAsync(Route<int>("id"));

        if (result.IsSuccess)
        {
            await SendOkAsync(Map.FromEntity(result.Response), cancellation: ct);
        }
        await SendNotFoundAsync(ct);
    }
}