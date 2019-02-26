import tenantsModels from '../../database/tenantsModels';
import helpers from '../../helpers';

const { ClaimHelpers } = helpers;

class ClaimService {
  static findOrCreateClaim(tenant, overtimeRequest) {
    const { Claims } = tenantsModels[tenant];

    return Claims.findOrCreate({
      where: {
        monthOfClaim: overtimeRequest.monthOfClaim,
        requester: overtimeRequest.requester
      },
      defaults: overtimeRequest,
      raw: true
    });
  }

  static findClaimByPk(tenant, claimId) {
    const { Claims } = tenantsModels[tenant];
    return Claims.findByPk(claimId, { raw: true });
  }

  static updateClaim(tenant, claim, claimId) {
    const { Claims } = tenantsModels[tenant];

    return Claims.update(
      claim,
      { where: { id: claimId }, returning: true, raw: true }
    );
  }

  static fetchPendingClaimsForLineManagers(tenant, lineManager) {
    const { LineManagers } = tenantsModels[tenant];
    const queryOptions = ClaimHelpers.createQueryOptions(tenant, lineManager);

    return LineManagers.findOne(queryOptions);
  }

  static runClaimApproval(tenant, lineManagerRole, claimId, approvalType) {
    const { Claims } = tenantsModels[tenant];
    const approvalColumn = lineManagerRole === 'BSM' ? 'approvalByBSM' : 'approvalBySupervisor';

    return Claims.update(
      { [approvalColumn]: approvalType },
      { where: { id: claimId }, returning: true, raw: true }
    );
  }

  static approveClaim(tenant, lineManagerRole, claimId) {
    return ClaimService.runClaimApproval(tenant, lineManagerRole, claimId, 'Approved');
  }

  static declineClaim(tenant, lineManagerRole, claimId) {
    return ClaimService.runClaimApproval(tenant, lineManagerRole, claimId, 'Declined');
  }
}

export default ClaimService;
