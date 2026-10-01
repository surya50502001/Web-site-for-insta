namespace MerchPlatform.Api.Services;

public record RevenueBreakdown(
    decimal RetailPrice,
    decimal BaseProductionCost,
    decimal PaymentGatewayFee,
    decimal PlatformFee,
    decimal GrossMargin,
    decimal CreatorProfit,
    decimal FanCoCreatorShare,
    string Currency
);

public interface IRevenueCalculatorService
{
    RevenueBreakdown CalculateBreakdown(decimal retailPrice, double creatorSplitPercentage = 70.0, bool isFanSubmission = false, double fanSharePercent = 15.0);
}

public class RevenueCalculatorService : IRevenueCalculatorService
{
    private const decimal BaseProductionCostInr = 350.00m; // 240 GSM Combed Cotton French Terry + Direct-to-Garment print
    private const decimal GatewayPercent = 0.02m; // 2% payment processing
    private const decimal GatewayFixed = 3.00m; // ₹3 fixed gateway fee
    private const decimal PlatformMarginCut = 0.12m; // 12% platform fee on gross margin

    public RevenueBreakdown CalculateBreakdown(decimal retailPrice, double creatorSplitPercentage = 70.0, bool isFanSubmission = false, double fanSharePercent = 15.0)
    {
        var gatewayFee = Math.Round((retailPrice * GatewayPercent) + GatewayFixed, 2);
        var directCosts = BaseProductionCostInr + gatewayFee;
        var grossMargin = Math.Max(0, retailPrice - directCosts);

        var platformFee = Math.Round(grossMargin * PlatformMarginCut, 2);
        var netDistributable = Math.Max(0, grossMargin - platformFee);

        decimal fanShare = 0.0m;
        if (isFanSubmission)
        {
            fanShare = Math.Round(netDistributable * (decimal)(fanSharePercent / 100.0), 2);
        }

        var creatorPool = netDistributable - fanShare;
        var creatorProfit = Math.Round(creatorPool * (decimal)(creatorSplitPercentage / 100.0), 2);

        return new RevenueBreakdown(
            RetailPrice: retailPrice,
            BaseProductionCost: BaseProductionCostInr,
            PaymentGatewayFee: gatewayFee,
            PlatformFee: platformFee,
            GrossMargin: grossMargin,
            CreatorProfit: creatorProfit,
            FanCoCreatorShare: fanShare,
            Currency: "INR"
        );
    }
}
