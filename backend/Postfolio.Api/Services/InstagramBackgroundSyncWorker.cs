using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Postfolio.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace Postfolio.Api.Services
{
    public class InstagramBackgroundSyncWorker : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger<InstagramBackgroundSyncWorker> _logger;

        public InstagramBackgroundSyncWorker(
            IServiceProvider serviceProvider,
            ILogger<InstagramBackgroundSyncWorker> logger)
        {
            _serviceProvider = serviceProvider;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Postfolio Instagram Background Sync Worker is started.");

            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    using var scope = _serviceProvider.CreateScope();
                    var db = scope.ServiceProvider.GetRequiredService<PostfolioDbContext>();

                    var activePhotographers = await db.Photographers
                        .Where(p => p.IsSyncActive)
                        .ToListAsync(stoppingToken);

                    foreach (var photographer in activePhotographers)
                    {
                        photographer.LastSyncedAt = DateTime.UtcNow;
                    }

                    if (activePhotographers.Count > 0)
                    {
                        await db.SaveChangesAsync(stoppingToken);
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error occurred during periodic Instagram synchronization.");
                }

                // Check every 5 minutes in background
                await Task.Delay(TimeSpan.FromMinutes(5), stoppingToken);
            }
        }
    }
}
