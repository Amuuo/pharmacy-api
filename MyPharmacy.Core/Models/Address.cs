using Microsoft.IdentityModel.Tokens;

namespace MyPharmacy.Core.Models;

public class Address
{
    public int Id { get; set; }
    public required string  Address1 { get; set; }
    public string? Address2 { get; set; }
    public required string  City { get; set; }
    public required string  State { get; set; }
    public required string  ZipCode { get; set; }
    public required string  Country { get; set; }
    
    public string FullAddress => Address2.IsNullOrEmpty() 
        ? $"{Address1}, {City}, {State}, {ZipCode}, {Country}"
        : $"{Address1} {Address2}, {City}, {State}, {ZipCode}, {Country}";

    public override string ToString()
    {
        return FullAddress;
    }
}
