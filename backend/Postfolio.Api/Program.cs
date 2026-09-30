using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Postfolio.Api.Data;
using Postfolio.Api.Models;
using Postfolio.Api.Services;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add Controllers and JSON configuration
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    });

// Database configuration: Use PostgreSQL if provided, otherwise InMemory
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
if (!string.IsNullOrEmpty(connectionString) && !connectionString.Contains("Placeholder"))
{
    builder.Services.AddDbContext<PostfolioDbContext>(options =>
        options.UseNpgsql(connectionString));
}
else
{
    builder.Services.AddDbContext<PostfolioDbContext>(options =>
        options.UseInMemoryDatabase("PostfolioDb"));
}

// Register Services
builder.Services.AddHttpClient<IInstagramService, InstagramService>();
builder.Services.AddScoped<IContentCategorizerService, ContentCategorizerService>();
builder.Services.AddHostedService<InstagramBackgroundSyncWorker>();

// CORS configuration for Next.js frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://127.0.0.1:3000", "https://postfolio.site")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Seed initial database
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<PostfolioDbContext>();
    if (!db.Photographers.Any())
    {
        var elena = new PhotographerProfile
        {
            Id = "elena_rostova",
            Username = "elena.visuals",
            FullName = "Elena Rostova",
            Tagline = "Destination Wedding & Editorial Portraiture",
            Bio = "Preserving quiet intimacy, European light, and unrehearsed poetry for couples across Italy, France & Greece.",
            Location = "Lake Como, Italy & Paris",
            AvatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500",
            CoverUrl = "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1920",
            PostsCount = 428,
            FollowersCount = 28400,
            GearSummary = "Leica M11 • Hasselblad X2D 100C • Kodak Portra 400"
        };

        var site = new PortfolioSite
        {
            Id = "site_elena_01",
            PhotographerId = elena.Id,
            Slug = "elena-rostova",
            CustomDomain = "elenarostova.com",
            Title = "Elena Rostova — Editorial Wedding & Portrait Photography",
            IsPublished = true
        };

        db.Photographers.Add(elena);
        db.Sites.Add(site);
        db.SaveChanges();
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Postfolio API v1");
    });
}

app.UseCors("AllowFrontend");
app.UseAuthorization();
app.MapControllers();

app.Run();
