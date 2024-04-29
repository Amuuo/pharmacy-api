using System.Data;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using MyPharmacy.Api.Extensions;
using MyPharmacy.Core.Utilities;
using MyPharmacy.Data;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

Log.Logger = new LoggerConfiguration().ReadFrom.Configuration(builder.Configuration).CreateLogger();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Host.UseSerilog();

builder.Services.AddControllers();
builder.Services.AddMemoryCache();
builder.Services.AddCors();
builder.Services.AddSwaggerDocument();
builder.Services.AddCustomizedSwaggerGen();
builder.Services.AddScoped<IDbConnection>(sp => new SqlConnection(connectionString));
builder.Services.AddConfiguredDbContextPool<IPharmacyDbContext, PharmacyDbContext>(
    connectionString
);
builder.Services.AddPharmacyServices();
builder.Services.AddHttpContextAccessor();



var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUI(c =>
    {
        c.DisplayRequestDuration();
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "MyPharmacy API V1");
    });
}

app.UseMiddleware<ExceptionHandlingMiddleware>();
app.UseHttpsRedirection();
app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
app.UseAuthorization();
app.MapControllers();

/*app.UseStaticFiles(); */// For serving static files including the React app

//app.UseSpaStaticFiles(); // If you're using an SPA static file middleware

//app.UseSpa(spa =>
//{
//    spa.Options.SourcePath = "Path to your React build folder";

//    if (env.IsDevelopment())
//    {
//        spa.UseReactDevelopmentServer(npmScript: "start");
//    }
//});


await app.RunAsync();
