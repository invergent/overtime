import tenantsModels from '../../database/tenantsModels';
import ClaimApprovalHistoryService from '../ClaimApprovalHistoryService';
import GenericHelpers from '../../helpers/GenericHelpers';
import Dates from '../../helpers/Dates';
import BasicQuerier from '../BasicQuerier';

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
    return BasicQuerier.findByPk(tenant, 'Claims', claimId);
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

  static cancelClaim(tenant, claimId) {
    const updatePayload = { status: 'Cancelled' };
    return ClaimService.updateClaim(tenant, updatePayload, claimId);
  }

  static fetchSubmittedClaimsIntheCurrentMonth(tenant) {
    const { Claims } = tenantsModels[tenant];
    const { year, month } = Dates.getCurrentYearMonth();
    const firstDayOfCurrentMonth = new Date(year, month, 1);
    const options = GenericHelpers.adminFetchClaimOptions(tenant, firstDayOfCurrentMonth);
    return Claims.findAll(options);
  }
}

export default ClaimService;
