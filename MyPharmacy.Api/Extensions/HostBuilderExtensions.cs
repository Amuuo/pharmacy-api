using Serilog;

namespace MyPharmacy.Api.Extensions;

public static class HostBuilderExtensions
{
    public static IHostBuilder UseConfiguredLogger(this IHostBuilder builder)
    {
        builder.ConfigureServices((context, services) =>
        {
            Log.Logger = new LoggerConfiguration()
                .ReadFrom.Configuration(context.Configuration)
                .CreateLogger();

            // Make sure to add Serilog to the service collection
            services.AddLogging(loggingBuilder =>
                loggingBuilder.AddSerilog(dispose: true));
        });

        return builder;
    }
}
