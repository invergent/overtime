import services from '../../services';
import helpers from '../../helpers';

const { ClaimService } = services;
const { ClaimHelpers } = helpers;

class PendingClaims {
  static async pendingClaimsForlineManagers(req) {
    const { tenant, lineManager } = req;
    const { lineManagerRole } = lineManager;
    const pendingClaims = await ClaimService.fetchPendingClaimsForLineManagers(tenant, lineManager);

    const filteredResults = ClaimHelpers.filterQueryResult(pendingClaims, lineManagerRole);
    // An empty result still returned the manager's details.
    // This checks if claims were returned
    if (filteredResults.length <= 1 && !filteredResults[0].staffId) {
      return [404, 'You currently have no pending claims to approve.'];
    }
    return [200, `You have ${filteredResults.length} claims to approve.`, filteredResults];
  }
}

export default PendingClaims;
