namespace MyPharmacy.Api.Endpoints.Pharmacy.GetPharmacyById;

public record GetPharmacyByIdResponse(
    int Id,
    string Name,
    string? Address,
    string? City,
    string? State,
    string? Zip,
    int? PrescriptionsFilled,
    DateTime CreatedDate
);