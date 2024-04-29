using MyPharmacy.Services.Interfaces;
using MyPharmacy.Services;
using MyPharmacy.Data.Repository.Interfaces;
using MyPharmacy.Data.Repository;

namespace MyPharmacy.Api.Extensions;

public static class ServiceRegistrationExtensions
{
    public static IServiceCollection AddPharmacyServices(this IServiceCollection services)
    {
        // Register service interfaces to their implementations
        services.AddScoped<IPharmacyService, PharmacyService>();
        services.AddScoped<IDeliveryService, DeliveryService>();
        services.AddScoped<IPharmacistService, PharmacistService>();
        services.AddScoped<IWarehouseService, WarehouseService>();
        services.AddScoped<IReportingService, ReportingService>();
        
        // Register repository interfaces to their implementations
        services.AddScoped<IPharmacyRepository, PharmacyRepository>();        
        services.AddScoped<IDeliveryRepository, DeliveryRepository>();
        services.AddScoped<IPharmacistRepository, PharmacistRepository>();

        return services;

    }
}