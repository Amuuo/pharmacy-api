using FastEndpoints;

namespace MyPharmacy.Api.Endpoints.Pharmacy.GetPharmacyById;

/// <summary>
/// Mapper class for converting Pharmacy entity to GetPharmacyByIdResponse.
/// </summary>
public class PharmacyMapper
    : ResponseMapper<GetPharmacyByIdResponse, Data.Entities.Pharmacy>
{
    public override GetPharmacyByIdResponse FromEntity(Data.Entities.Pharmacy e)
    {
        return new(
            e.Id,
            e.Name,
            e.Address,
            e.City,
            e.State,
            e.Zip,
            e.PrescriptionsFilled,
            e.CreatedDate
        );
    }
}