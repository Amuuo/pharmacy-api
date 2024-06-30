using FastEndpoints;
using MyPharmacy.Services.Interfaces;

namespace MyPharmacy.Api.Endpoints.Pharmacy.CreatePharmacy;

public class CreatePharmacyEndpoint(IPharmacyService pharmacyService)
    : Endpoint<CreatePharmacyRequest, CreatePharmacyResponse, CreatePharmacyMapper>
{
    public override void Configure()
    {
        Post("/pharmacy/create");
        Summary(new CreatePharmacySummary());
        AllowAnonymous();
        Validator<CreatePharmacyRequestValidator>();
    }

    public override async Task HandleAsync(
        CreatePharmacyRequest createPharmacyRequest,
        CancellationToken ct
    )
    {
        var pharmacy = (
            await pharmacyService.InsertPharmacyAsync(Map.ToEntity(createPharmacyRequest))
        ).Response;

        Response = Map.FromEntity(pharmacy);

        await SendAsync(Response, cancellation: ct);
    }
}