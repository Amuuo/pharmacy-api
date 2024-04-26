using Microsoft.EntityFrameworkCore;

namespace MyPharmacy.Api.Extensions;

public static class DbContextServiceExtensions
{
    /// <summary>
    /// Adds a configured DbContext pool to the service collection.
    /// </summary>
    /// <typeparam name="TContext">The type of the DbContext.</typeparam>
    /// <typeparam name="TImplementation">The implementation type of the DbContext.</typeparam>
    /// <param name="services">The service collection.</param>
    /// <param name="connectionString">The connection string for the database.</param>
    /// <returns>The modified service collection.</returns>
    public static IServiceCollection AddConfiguredDbContextPool<TContext, TImplementation>(
        this IServiceCollection services, string connectionString)
        where TContext : class
        where TImplementation : DbContext, TContext
    {
        services.AddDbContextPool<TContext, TImplementation>(options =>
        {
            options.UseSqlServer(connectionString, sqlOptions =>
            {
                sqlOptions.EnableRetryOnFailure(
                    maxRetryCount: 5,
                    maxRetryDelay: TimeSpan.FromSeconds(30),
                    errorNumbersToAdd: null
                );
            });
        });

        return services;
    }
}
