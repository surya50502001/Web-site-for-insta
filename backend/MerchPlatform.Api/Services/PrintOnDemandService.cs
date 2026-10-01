using MerchPlatform.Api.Models;

namespace MerchPlatform.Api.Services;

public record PodOrderRequest(
    string OrderId,
    string ItemSku,
    string Color,
    string Size,
    int Quantity,
    string PrintFileUrl,
    string ShippingRecipient,
    string ShippingAddress
);

public record PodOrderResult(
    string PodJobId,
    string Status,
    string EstimatedDispatch,
    string TrackingCarrier
);

public interface IPrintOnDemandService
{
    Task<PodOrderResult> SubmitPrintJobAsync(PodOrderRequest request);
    Task<string> GetTrackingStatusAsync(string podJobId);
}

public class PrintOnDemandService : IPrintOnDemandService
{
    private readonly ILogger<PrintOnDemandService> _logger;

    public PrintOnDemandService(ILogger<PrintOnDemandService> logger)
    {
        _logger = logger;
    }

    public Task<PodOrderResult> SubmitPrintJobAsync(PodOrderRequest request)
    {
        var jobId = "POD_GELATO_" + Guid.NewGuid().ToString("N")[..12].ToUpperInvariant();
        _logger.LogInformation("Submitted print job {JobId} for Order {OrderId} on SKU {Sku} {Color} {Size}",
            jobId, request.OrderId, request.ItemSku, request.Color, request.Size);

        return Task.FromResult(new PodOrderResult(
            PodJobId: jobId,
            Status: "QUEUED_FOR_DTG_PRINT",
            EstimatedDispatch: DateTime.UtcNow.AddDays(2).ToString("yyyy-MM-dd"),
            TrackingCarrier: "BlueDart Express / DHL"
        ));
    }

    public Task<string> GetTrackingStatusAsync(string podJobId)
    {
        return Task.FromResult("IN_PRODUCTION_STAGE_2");
    }
}
