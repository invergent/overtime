import models from '../../../../Database/models';
import ClaimApprovalHistoryService from '../ClaimApprovalHistoryService';
import GenericHelpers from '../../helpers/GenericHelpers';
import BasicQuerier from '../BasicQuerier';

const { Claims, LineManagers, ClaimsStatistics } = models;

class ClaimService {
  static findOrCreateClaim(tenantRef, overtimeRequest) {
    return Claims.findOrCreate({
      where: {
        tenantRef,
        monthOfClaim: overtimeRequest.monthOfClaim,
        requester: overtimeRequest.requester,
        status: GenericHelpers.notCancelledOrDeclined()
      },
      defaults: overtimeRequest,
      raw: true
    });
  }

  static findClaimByPk(tenantRef, claimId) {
    return BasicQuerier.findByPk(tenantRef, 'Claims', claimId);
  }

  static fetchClaimsByTenantRef(tenantRef, statusType) {
    const options = GenericHelpers.fetchPendingClaimsOptions(tenantRef, statusType);
    return Claims.findAll(options);
  }

  static updateClaim(tenantRef, updatePayload, claimId) {
    return BasicQuerier.update(tenantRef, 'Claims', updatePayload, claimId);
  }

  static fetchPendingClaimsForLineManagers(tenantRef, lineManager) {
    const queryOptions = GenericHelpers.createLineManagerQueryOptions(tenantRef, lineManager);
    return LineManagers.findOne(queryOptions);
  }

  static async runClaimApproval(tenantRef, lineManager, claimId, approvalType) {
    const { id: lineManagerId, lineManagerRole } = lineManager;
    const updatePayload = GenericHelpers.createUpdatePayload(lineManagerRole, approvalType);

    const [updated, claim] = await ClaimService.updateClaim(tenantRef, updatePayload, claimId);
    const history = await ClaimApprovalHistoryService.createApprovalHistory(
      approvalType, claimId, lineManagerId
    );

    const updatedClaim = { ...claim[0], history: history.dataValues };
    return [updated, updatedClaim];
  }

  static approveClaim(tenantRef, lineManager, claimId) {
    return ClaimService.runClaimApproval(tenantRef, lineManager, claimId, 'approve');
  }

  static declineClaim(tenantRef, lineManager, claimId) {
    return ClaimService.runClaimApproval(tenantRef, lineManager, claimId, 'decline');
  }

  static cancelClaim(tenantRef, claimId) {
    const updatePayload = { status: 'Cancelled' };
    return ClaimService.updateClaim(tenantRef, updatePayload, claimId);
  }

  static fetchSubmittedClaims(tenantRef, statusType, period) {
    const options = GenericHelpers.adminFetchClaimOptions(tenantRef, statusType, period);
    return Claims.findAll(options);
  }

  static fetchCompletedClaim(tenantRef) {
    const options = GenericHelpers.fetchCompletedClaimsQueryOptions(tenantRef);
    return Claims.findAll(options);
  }

  static markClaimsAsCompleted(tenantRef) {
    const options = GenericHelpers.markClaimsAsCompletedQueryOptions(tenantRef);
    const payload = { status: 'Completed' };
    return Claims.update(payload, options);
  }

  static fetchStaffClaims(tenantRef, staffId, status) {
    const options = GenericHelpers.staffPendingClaimOptions(tenantRef, staffId, status);
    return Claims.findAll(options);
  }

  static getChartStatistics(tenantRef) {
    const currentYear = new Date().getFullYear();
    const options = { where: { tenantRef, year: currentYear } };
    return ClaimsStatistics.findOne(options);
  }

  static updateChartStatistics(tenantRef, statPayload) {
    const currentYear = new Date().getFullYear();
    const options = { where: { tenantRef, year: currentYear } };
    return ClaimsStatistics.update(statPayload, options);
  }

  static createChartStatistics(statPayload) {
    return ClaimsStatistics.create(statPayload);
  }
}

export default ClaimService;
