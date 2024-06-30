using FastEndpoints;
using MyPharmacy.Api.Endpoints.Pharmacy.GetPharmacyById;

namespace MyPharmacy.Api.Endpoints.Pharmacy.GetPharmacyById;

public class GetPharmacyByIdSummary : Summary<GetPharmacyByIdEndpoint>
{
    public GetPharmacyByIdSummary()
    {
        Summary = "Get a pharmacy by its ID.";
        Description = "This endpoint allows for the retrieval of a pharmacy record by its ID.";
        Response<GetPharmacyByIdResponse>(200, "The pharmacy was successfully retrieved.");
    }
}