using Microsoft.EntityFrameworkCore;
using MerchPlatform.Api.Models;

namespace MerchPlatform.Api.Data;

public class MerchDbContext : DbContext
{
    public MerchDbContext(DbContextOptions<MerchDbContext> options) : base(options)
    {
    }

    public DbSet<Creator> Creators => Set<Creator>();
    public DbSet<InstagramMedia> InstagramMedia => Set<InstagramMedia>();
    public DbSet<MerchProduct> Products => Set<MerchProduct>();
    public DbSet<DesignArtwork> DesignArtworks => Set<DesignArtwork>();
    public DbSet<FanSubmission> FanSubmissions => Set<FanSubmission>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<RevenueSplit> RevenueSplits => Set<RevenueSplit>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Relationships
        modelBuilder.Entity<Creator>()
            .HasMany(c => c.MediaItems)
            .WithOne(m => m.Creator)
            .HasForeignKey(m => m.CreatorId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Creator>()
            .HasMany(c => c.Products)
            .WithOne(p => p.Creator)
            .HasForeignKey(p => p.CreatorId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Creator>()
            .HasMany(c => c.FanSubmissions)
            .WithOne(f => f.Creator)
            .HasForeignKey(f => f.CreatorId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<MerchProduct>()
            .HasMany(p => p.Designs)
            .WithOne(d => d.Product)
            .HasForeignKey(d => d.ProductId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Order>()
            .HasOne(o => o.RevenueSplit)
            .WithOne(r => r.Order)
            .HasForeignKey<RevenueSplit>(r => r.OrderId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
