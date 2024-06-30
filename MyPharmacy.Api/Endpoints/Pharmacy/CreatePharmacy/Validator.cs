using FastEndpoints;
using FluentValidation;

namespace MyPharmacy.Api.Endpoints.Pharmacy.CreatePharmacy;

public class CreatePharmacyRequestValidator : Validator<CreatePharmacyRequest>
{
    public CreatePharmacyRequestValidator()
    {
        RuleFor(x => x.Name).NotEmpty().WithMessage("Pharmacy name is required.");
        RuleFor(x => x.PrescriptionsFilled)
            .GreaterThanOrEqualTo(0)
            .WithMessage("Prescriptions filled cannot be negative.");
    }
}