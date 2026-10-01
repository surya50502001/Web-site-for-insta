namespace MerchPlatform.Api.Services;

public record RightsAuthorizationRequest(
    string CreatorId,
    string LegalFullName,
    string InstagramHandle,
    bool AcknowledgeOriginalCreation,
    bool GrantsPrintLicense,
    string DigitalSignature
);

public record TakedownReport(
    string ReportId,
    string TargetProductId,
    string ReporterEmail,
    string CopyrightOwnerName,
    string InfringingWorkDescription,
    string Status
);

public interface IRightsManagementService
{
    bool RegisterCreatorAuthorization(RightsAuthorizationRequest request);
    TakedownReport FileTakedownNotice(string targetProductId, string reporterEmail, string copyrightOwner, string description);
}

public class RightsManagementService : IRightsManagementService
{
    private readonly ILogger<RightsManagementService> _logger;

    public RightsManagementService(ILogger<RightsManagementService> logger)
    {
        _logger = logger;
    }

    public bool RegisterCreatorAuthorization(RightsAuthorizationRequest request)
    {
        _logger.LogInformation("Rights grant verified for Creator {Id} (@{Handle}), Signed by {Name}",
            request.CreatorId, request.InstagramHandle, request.LegalFullName);
        return request.AcknowledgeOriginalCreation && request.GrantsPrintLicense && !string.IsNullOrWhiteSpace(request.DigitalSignature);
    }

    public TakedownReport FileTakedownNotice(string targetProductId, string reporterEmail, string copyrightOwner, string description)
    {
        var reportId = "DMCA_" + Guid.NewGuid().ToString("N")[..8].ToUpperInvariant();
        _logger.LogWarning("DMCA Notice filed: {ReportId} against Product {ProductId} by {Owner} ({Email})",
            reportId, targetProductId, copyrightOwner, reporterEmail);

        return new TakedownReport(
            ReportId: reportId,
            TargetProductId: targetProductId,
            ReporterEmail: reporterEmail,
            CopyrightOwnerName: copyrightOwner,
            InfringingWorkDescription: description,
            Status: "INVESTIGATING_TAKEDOWN"
        );
    }
}
