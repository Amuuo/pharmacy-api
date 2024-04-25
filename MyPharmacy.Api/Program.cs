using System.Data;
using System.Reflection;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using MyPharmacy.Core.Utilities;
using MyPharmacy.Data;
using MyPharmacy.Data.Repository;
using MyPharmacy.Data.Repository.Interfaces;
using MyPharmacy.Services;
using MyPharmacy.Services.Interfaces;
using Serilog;
using Swashbuckle.AspNetCore.SwaggerUI;

var builder = WebApplication.CreateBuilder(args);

Log.Logger = new LoggerConfiguration().ReadFrom.Configuration(builder.Configuration).CreateLogger();

builder.Host.UseSerilog();

builder.Services.AddControllers();
builder.Services.AddMemoryCache();

builder.Services.AddCors();

builder.Services.AddSwaggerDocument();
builder.Services.AddSwaggerGen(c =>
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
            // This might be necessary if an assembly cannot be loaded or if its XML documentation is not found
            Console.WriteLine(
                $"Could not include XML comments from referenced assembly: {assemblyName.Name}. Error: {ex.Message}"
            );
        }
    }
});

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddScoped<IDbConnection>(sp => new SqlConnection(connectionString));

builder.Services.AddDbContextPool<IPharmacyDbContext, PharmacyDbContext>(options =>
{
    options.UseSqlServer(
        connectionString,
        sqlOptions =>
        {
            sqlOptions.EnableRetryOnFailure(
                maxRetryCount: 5,
                maxRetryDelay: TimeSpan.FromSeconds(30),
                errorNumbersToAdd: null
            );
            //sqlOptions.MigrationsAssembly("MyPharmacy.Api");
        }
    );
});

builder.Services.AddScoped<IPharmacyService, PharmacyService>();
builder.Services.AddScoped<IDeliveryService, DeliveryService>();
builder.Services.AddScoped<IPharmacistService, PharmacistService>();
builder.Services.AddScoped<IWarehouseService, WarehouseService>();
builder.Services.AddScoped<IReportingService, ReportingService>();
builder.Services.AddScoped<IPharmacyRepository, PharmacyRepository>();
builder.Services.AddScoped<IDeliveryRepository, DeliveryRepository>();
builder.Services.AddScoped<IPharmacistRepository, PharmacistRepository>();
builder.Services.AddHttpContextAccessor();

//builder.Services.AddScoped<IWarehouseRepository, WarehouseRepository>();
//builder.Services.AddScoped<IReportRepository, ReportRepository>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    //app.UseSwagger();
    app.UseOpenApi();
    app.UseSwaggerUI(c =>
    {
        //c.DisplayRequestDuration();
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "MyPharmacy API V1");
        //c.ConfigObject = new ConfigObject
        //{
        //    DeepLinking = true,
        //    DefaultModelsExpandDepth = 5,
        //    DefaultModelExpandDepth = 5,
        //    DefaultModelRendering = ModelRendering.Model,
        //    DisplayOperationId = true,
        //    DisplayRequestDuration = true,
        //    DocExpansion = DocExpansion.List,
        //    ShowExtensions = true
        //};
    });
}

app.UseMiddleware<ExceptionHandlingMiddleware>();
app.UseHttpsRedirection();
app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
app.UseAuthorization();
app.MapControllers();

await app.RunAsync();