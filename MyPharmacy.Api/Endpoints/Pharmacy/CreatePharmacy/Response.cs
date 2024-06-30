namespace MyPharmacy.Api.Endpoints.Pharmacy.CreatePharmacy;

public record CreatePharmacyResponse(
    int Id,
    string Name,
    string? Address,
    string? City,
    string? State,
    string? Zip,
    int? PrescriptionsFilled,
    DateTime CreatedDate
);