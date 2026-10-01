using Microsoft.EntityFrameworkCore;
using MerchPlatform.Api.Data;
using MerchPlatform.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Add Controllers
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });

// Configure Database (PostgreSQL if ConnectionString provided, otherwise SQLite for zero-config run)
var pgConnection = builder.Configuration.GetConnectionString("PostgreSqlConnection");
if (!string.IsNullOrEmpty(pgConnection))
{
    builder.Services.AddDbContext<MerchDbContext>(options =>
        options.UseNpgsql(pgConnection));
}
else
{
    var dbPath = Path.Combine(builder.Environment.ContentRootPath, "merch_platform.db");
    builder.Services.AddDbContext<MerchDbContext>(options =>
        options.UseSqlite($"Data Source={dbPath}"));
}

// Register Services
builder.Services.AddScoped<IRevenueCalculatorService, RevenueCalculatorService>();
builder.Services.AddScoped<IMetaGraphApiService, MetaGraphApiService>();
builder.Services.AddScoped<IPrintOnDemandService, PrintOnDemandService>();
builder.Services.AddScoped<IRightsManagementService, RightsManagementService>();

// CORS configuration for Next.js frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://127.0.0.1:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "WearGram Merch Platform API",
        Version = "v1",
        Description = "Production-grade API for converting Instagram creator content into wearable 3D merchandise."
    });
});

var app = builder.Build();

// Ensure DB is created and seeded
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<MerchDbContext>();
    DbInitializer.Initialize(context);
}

// Configure HTTP pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "WearGram API v1");
        c.RoutePrefix = "swagger";
    });
}

app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

app.MapGet("/", () => Results.Ok(new
{
    service = "WearGram SaaS Platform API",
    status = "healthy",
    version = "1.0.0",
    docs = "/swagger"
}));

app.Run();
