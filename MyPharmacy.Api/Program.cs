using System.Data;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using MyPharmacy.Api.Extensions;
using MyPharmacy.Data;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Host.UseConfiguredLogger();

builder
    .Services.AddMemoryCache()
    .AddCors()
    .AddCustomizedSwaggerGen()
    .AddScoped<IDbConnection>(sp => new SqlConnection(connectionString))
    .AddConfiguredDbContextPool<IPharmacyDbContext, PharmacyDbContext>(connectionString)
    .AddPharmacyServices()
    .AddHttpContextAccessor()
    .AddControllers()
    .Services.AddGraphQLServer();

builder
    .WebHost.UseIIS()
    .UseIISIntegration()
    .UseContentRoot(Directory.GetCurrentDirectory());

var app = builder.Build();

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

app.UseEndpoints(endpoints =>
{
    endpoints.MapGraphQL();
});

app.UseCors(policyBuilder => policyBuilder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader())
    .UseAuthorization()
    .UseAuthentication();

app.MapControllers();

await app.RunAsync();
