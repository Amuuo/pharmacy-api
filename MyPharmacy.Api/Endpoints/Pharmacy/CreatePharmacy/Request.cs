namespace MyPharmacy.Api.Endpoints.Pharmacy.CreatePharmacy;

public record CreatePharmacyRequest(
    string Name,
    string? Address,
    string? City,
    string? State,
    string? Zip,
    int? PrescriptionsFilled
);