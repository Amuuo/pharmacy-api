using System.Data;
using FastEndpoints;
using FastEndpoints.Swagger;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using MyPharmacy.Api.Endpoints.Pharmacy;
using MyPharmacy.Api.Extensions;
using MyPharmacy.Data;
using NSwag.Generation.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Host.UseConfiguredLogger();

builder
    .Services.AddMemoryCache()
    .AddCors()
    .AddScoped<IDbConnection>(sp => new SqlConnection(connectionString))
    .AddConfiguredDbContextPool<IPharmacyDbContext, PharmacyDbContext>(
        connectionString)
    .AddPharmacyServices()
    .AddHttpContextAccessor()
    .AddFastEndpoints()
    .SwaggerDocument(c =>
    {
        c.DocumentSettings = s =>
        {
            s.Title       = "MyPharmacy API";
            s.Description = "MyPharmacy API";
            s.Version     = "v1";
        };
    })
    .AddCustomizedSwaggerGen();

    //.AddControllers();

builder.WebHost.UseIIS().UseIISIntegration().UseContentRoot(Directory.GetCurrentDirectory());

var app = builder.Build();

app.UseFastEndpoints()
    .UseSwaggerGen();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.DisplayRequestDuration();
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "MyPharmacy API V1");
    });
}

app.UseRouting();


//app.UseCors(policyBuilder => policyBuilder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader())
//    .UseAuthorization()
//    .UseAuthentication();

//app.MapControllers();

await app.RunAsync();
