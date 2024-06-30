using FastEndpoints;

namespace MyPharmacy.Api.Endpoints.Pharmacy.CreatePharmacy;

public class CreatePharmacyMapper
    : Mapper<CreatePharmacyRequest, CreatePharmacyResponse, Data.Entities.Pharmacy>
{
    public override CreatePharmacyResponse FromEntity(Data.Entities.Pharmacy entity) =>
        new(
            entity.Id,
            entity.Name,
            entity.Address,
            entity.City,
            entity.State,
            entity.Zip,
            entity.PrescriptionsFilled,
            entity.CreatedDate
        );

    public override Data.Entities.Pharmacy ToEntity(CreatePharmacyRequest request) =>
        new()
        {
            Name                = request.Name,
            Address             = request.Address,
            City                = request.City,
            State               = request.State,
            Zip                 = request.Zip,
            PrescriptionsFilled = request.PrescriptionsFilled
        };
}