using Microsoft.AspNetCore.Mvc;
using PharmacyApi.Models;
using PharmacyApi.Services.Interfaces;
using PharmacyApi.Utilities;

namespace PharmacyApi.Controllers;

//[Authorize]
[ApiController]
[Route("pharmacy")]
//[RequiredScope(RequiredScopesConfigurationKey = "AzureAd:Scopes")]
public class PharmacyController : ControllerBase
{
    #region Members and Constructor

    private readonly ILogger<PharmacyController> _logger;
    private readonly IPharmacyService _pharmacyService;

    public PharmacyController(ILogger<PharmacyController> logger, 
                              IPharmacyService pharmacyService)
    {
        _logger = logger;
        _pharmacyService = pharmacyService;
    }

    #endregion

    [HttpPost]
    [Route("all")]
    [Route("{id?}")]
    public async Task<IActionResult> GetPharmacy(int? id = null)
    {
        if (id is null)
        {
            var pharmacyListResult = await _pharmacyService.GetPharmacyListAsync();
            return ControllerHelper.HandleResponse(pharmacyListResult);
        }

        var pharmacyResult = await _pharmacyService.GetPharmacyByIdAsync(id.Value);
        return ControllerHelper.HandleResponse(pharmacyResult);
    }
    

    [HttpPost]
    [Route("update")]
    public async Task<IActionResult> UpdatePharmacyById(Pharmacy pharmacy)
    {
        var updatedPharmacyResult = await _pharmacyService.UpdatePharmacyByIdAsync(pharmacy);

        return ControllerHelper.HandleResponse(updatedPharmacyResult);
    }
}
