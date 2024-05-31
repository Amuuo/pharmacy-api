using MyPharmacy.Core.Utilities;
using MyPharmacy.Core.Utilities.Interfaces;
using MyPharmacy.Data.Entities;

namespace MyPharmacy.Data.Repository.Interfaces;


public interface IPharmacistRepository
{
    /// <summary>
    /// Retrieves a paged list of pharmacists asynchronously.
    /// </summary>
    /// <param name="pagingInfo">The paging information.</param>
    /// <returns>A task that represents the asynchronous operation. The task result contains the paged list of pharmacists.</returns>
    Task<IPagedResult<Pharmacist>> GetPagedPharmacistListAsync(PagingInfo pagingInfo);
    
    /// <summary>
    /// Retrieves a pharmacist by their ID asynchronously.
    /// </summary>
    /// <param name="id">The ID of the pharmacist.</param>
    /// <returns>The pharmacist object if found, otherwise null.</returns>
    Task<Pharmacist?> GetPharmacistByIdAsync(int id);
    
    /// <summary>
    /// Retrieves a list of pharmacists based on the specified pharmacy ID asynchronously.
    /// </summary>
    /// <param name="pharmacyId">The ID of the pharmacy.</par
    Task<IEnumerable<Pharmacist>?> GetPharmacistListByPharmacyIdAsync(int pharmacyId);
    
    /// <summary>
    /// Updates a pharmacist asynchronously.
    /// </summary>
    /// <param name="pharmacist">The pharmacist object to update.</param>
    /// <returns>The updated pharmacist object.</returns>
    Task<Pharmacist?> UpdatePharmacistAsync(Pharmacist pharmacist);
    
    /// <summary>
    /// Adds a new pharmacist to the database asynchronously.
    /// </summary>
    /// <param name="pharmacist">The pharmacist object to be added.</param>
    /// <returns>The inserted pharmacist object.</returns>
    Task<Pharmacist?> AddPharmacistAsync(Pharmacist pharmacist);
    
    /// <summary>
    /// Retrieves the count of pharmacists in the database.
    /// </summary>
    /// <returns>The count of pharmacists.</returns>
    Task<int> GetPharmacistListCount();
}
