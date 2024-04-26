using System.Reflection;

namespace MyPharmacy.Api.Extensions;

public static class SwaggerServiceExtensions
{
    /// <summary>
    /// Adds customized SwaggerGen to the specified <see cref="IServiceCollection"/>.
    /// </summary>
    /// <param name="services">The <see cref="IServiceCollection"/> to add the SwaggerGen to.</param>
    /// <returns>The modified <see cref="IServiceCollection"/>.</returns>
    public static IServiceCollection AddCustomizedSwaggerGen(this IServiceCollection services)
    {
        services.AddSwaggerGen(c =>
        {
            // Include XML comments from the executing assembly
            var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
            var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
            c.IncludeXmlComments(xmlPath);

            // Automatically find and include XML comments from referenced assemblies
            var referencedAssemblies = Assembly.GetExecutingAssembly().GetReferencedAssemblies();
            foreach (var assemblyName in referencedAssemblies)
            {
                try
                {
                    var assembly = Assembly.Load(assemblyName);
                    var referencedXmlFile = $"{assembly.GetName().Name}.xml";
                    var referencedXmlPath = Path.Combine(AppContext.BaseDirectory, referencedXmlFile);

                    // Check if the XML documentation file exists before adding it
                    if (File.Exists(referencedXmlPath))
                    {
                        c.IncludeXmlComments(referencedXmlPath);
                    }
                }
                catch (Exception ex)
                {
                    // Handle or log exceptions if necessary
                    Console.WriteLine(
                        $"Could not include XML comments from referenced assembly: {assemblyName.Name}. Error: {ex.Message}"
                    );
                }
            }
        });

        return services;
    }
}
