using FastEndpoints;

namespace MyPharmacy.Api.Endpoints.Pharmacy.CreatePharmacy;

public class CreatePharmacySummary : Summary<CreatePharmacyEndpoint>
{
    public CreatePharmacySummary()
    {
        Summary = "Create a new pharmacy.";
        Description = "This endpoint allows for the creation of a new pharmacy record.";
        Response<CreatePharmacyResponse>(201, "The pharmacy was successfully created.");
    }
}
