using System.Text.Json.Serialization;

namespace MyPharmacy.Data.Entities;

public sealed class Pharmacist
{
    public int Id { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public int? Age { get; set; }
    public DateTime? HireDate { get; set; }
    public string? PrimaryRx { get; set; }
    public DateTime? CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? ModifiedBy { get; set; }

    [JsonIgnore]
    public ICollection<PharmacyPharmacist>? PharmacyPharmacists { get; set; }
}