namespace MyPharmacy.Data.Entities;

public sealed class PharmacyPharmacist
{
    public int PharmacistId { get; init; }
    public Pharmacist Pharmacist { get; init; }

    public int PharmacyId { get; init; }
    public Pharmacy Pharmacy { get; init; }

    public DateTime? CreatedDate { get; init; }
    public DateTime? ModifiedDate { get; init; }
    public string? ModifiedBy { get; init; }
}