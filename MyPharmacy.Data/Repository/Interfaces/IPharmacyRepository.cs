using MyPharmacy.Core.Utilities;
using MyPharmacy.Core.Utilities.Interfaces;
using MyPharmacy.Data.Entities;

namespace MyPharmacy.Data.Repository.Interfaces;


public interface IPharmacyRepository
{
    /// <summary>
    /// Retrieves a paged list of pharmacies asynchronously.
    /// </summary>
    /// <param name="pagingInfo">The paging information.</param>
    /// <returns>A task that represents the asynchronous operation. The task result contains the paged result of pharmacies.</returns>
    Task<IPagedResult<Pharmacy>?> GetPharmacyListPagedAsync(PagingInfo pagingInfo);

    /// <summary>
    /// Retrieves a pharmacy by its ID asynchronously.
    /// </summary>
    /// <param name="id">The ID of the pharmacy to retrieve.</param>
    /// <returns>The pharmacy with the specified ID, or null if not found.</returns>
    Task<Pharmacy?> GetByIdAsync(int id);

    /// <summary>
    /// Inserts a new pharmacy record asynchronously.
    /// </summary>
    /// <param name="pharmacy">The pharmacy object to be inserted.</param>
    /// <returns>The inserted pharmacy object.</returns>
    Task<Pharmacy?> InsertPharmacyAsync(Pharmacy pharmacy);

    /// <summary>
    /// Updates a pharmacy asynchronously.
    /// </summary>
    /// <param name="pharmacy">The pharmacy object to update.</param>
    /// <returns>The updated pharmacy object.</returns>
    Task<Pharmacy?> UpdatePharmacyAsync(Pharmacy pharmacy);

    /// <summary>
    /// Retrieves a list of pharmacies associated with a specific pharmacist.
    /// </summary>
    /// <param name="pharmacistId">The ID of the pharmacist.</param>
    /// <returns>A collection of pharmacies.</returns>
    Task<IEnumerable<Pharmacy>?> GetPharmaciesByPharmacistIdAsync(int pharmacistId);
}