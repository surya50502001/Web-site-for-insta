using Microsoft.EntityFrameworkCore;
using Postfolio.Api.Models;

namespace Postfolio.Api.Data
{
    public class PostfolioDbContext : DbContext
    {
        public PostfolioDbContext(DbContextOptions<PostfolioDbContext> options)
            : base(options)
        {
        }

        public DbSet<PhotographerProfile> Photographers => Set<PhotographerProfile>();
        public DbSet<InstagramPost> Posts => Set<InstagramPost>();
        public DbSet<PortfolioSite> Sites => Set<PortfolioSite>();
        public DbSet<BookingInquiry> Inquiries => Set<BookingInquiry>();
        public DbSet<SyncHistoryLog> SyncLogs => Set<SyncHistoryLog>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<PhotographerProfile>()
                .HasIndex(p => p.Username)
                .IsUnique();

            modelBuilder.Entity<PortfolioSite>()
                .HasIndex(s => s.Slug)
                .IsUnique();

            modelBuilder.Entity<InstagramPost>()
                .HasOne(p => p.Photographer)
                .WithMany(u => u.Posts)
                .HasForeignKey(p => p.PhotographerId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PortfolioSite>()
                .HasOne(s => s.Photographer)
                .WithMany(u => u.Sites)
                .HasForeignKey(s => s.PhotographerId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<BookingInquiry>()
                .HasOne(i => i.Site)
                .WithMany(s => s.Inquiries)
                .HasForeignKey(i => i.SiteId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<SyncHistoryLog>()
                .HasOne(l => l.Photographer)
                .WithMany(u => u.SyncLogs)
                .HasForeignKey(l => l.PhotographerId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
