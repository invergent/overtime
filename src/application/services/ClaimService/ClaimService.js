import tenantsModels from '../../database/tenantsModels';
import ClaimApprovalHistoryService from '../ClaimApprovalHistoryService';
import GenericHelpers from '../../helpers/GenericHelpers';

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

  static updateClaim(tenant, updatePayload, claimId) {
    const { Claims } = tenantsModels[tenant];

    return Claims.update(
      updatePayload,
      { where: { id: claimId }, returning: true, raw: true }
    );
  }

  static fetchPendingClaimsForLineManagers(tenant, lineManager) {
    const { LineManagers } = tenantsModels[tenant];
    const queryOptions = GenericHelpers.createQueryOptions(tenant, lineManager);

    return LineManagers.findOne(queryOptions);
  }

  static async runClaimApproval(tenant, lineManager, claimId, approvalType) {
    const { id: lineManagerId, lineManagerRole } = lineManager;
    const updatePayload = GenericHelpers.createUpdatePayload(lineManagerRole, approvalType);

    const [updated, claim] = await ClaimService.updateClaim(tenant, updatePayload, claimId);
    const history = await ClaimApprovalHistoryService.createApprovalHistory(
      tenant, claimId, lineManagerId
    );

    const updatedClaim = { ...claim[0], history: history.dataValues };
    return [updated, updatedClaim];
  }

  static approveClaim(tenant, lineManager, claimId) {
    return ClaimService.runClaimApproval(tenant, lineManager, claimId, 'approve');
  }

  static declineClaim(tenant, lineManager, claimId) {
    return ClaimService.runClaimApproval(tenant, lineManager, claimId, 'decline');
  }
}

export default ClaimService;
