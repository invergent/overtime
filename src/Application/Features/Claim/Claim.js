import helpers from '../utilities/helpers';
import services from '../utilities/services';
import notifications from '../utilities/notifications';
import { eventNames } from '../utilities/utils/types';
import { staffIncludes } from '../utilities/utils/general';

const { ClaimService, StaffService } = services;
const { ClaimHelpers } = helpers;

class Claim {
  static async create(req) {
    const { currentStaff: { staffId }, body, tenantRef } = req;

    try {
      const staff = await StaffService.findStaffByStaffIdOrEmail(tenantRef, staffId, staffIncludes);
      const overtimeRequest = ClaimHelpers.createOvertimeRequestObject(body, staff.id);
      const { messageWhenCreated, messageWhenNotCreated } = ClaimHelpers.responseMessage(
        overtimeRequest
      );

      const [claim, created] = await ClaimService.findOrCreateClaim(tenantRef, overtimeRequest);
      if (created) {
        notifications.emit(eventNames.NewClaim, [{ tenantRef, staff }]);
      }

      return created ? [201, messageWhenCreated, claim] : [409, messageWhenNotCreated, claim];
    } catch (e) {
      return [500, 'There was a problem submitting your request ERR500CLMCRT'];
    }
  }

  static async sendPendingClaimsTolineManager(req) {
    const { tenantRef, lineManager } = req;
    const filteredResults = await ClaimHelpers.pendingClaimsForlineManager(tenantRef, lineManager);
    // An empty result still returned the manager's details.
    // This checks if claims were also returned
    if (filteredResults.length <= 1 && !filteredResults[0].staffId) {
      return [404, 'You currently have no pending claims to approve.'];
    }
    return [200, `You have ${filteredResults.length} claims to approve.`, filteredResults];
  }

  static async checkThatClaimIsAssignedToLineManager(tenantRef, lineManager, claimId) {
    const assignedClaims = await ClaimHelpers.getIdsOfClaimsAssignedToLineManager(
      tenantRef, lineManager
    );
    if (!assignedClaims.includes(parseInt(claimId, 10))) {
      return [403, 'This claim is not on your pending list. Access denied.'];
    }
    return [200, 'okay'];
  }

  static async runClaimApproval(req, approvalType) {
    const { tenantRef, params: { claimId }, lineManager } = req;
    const approvalMethod = approvalType === 'Approved' ? 'approveClaim' : 'declineClaim';

    const [statusCode, message] = await Claim.checkThatClaimIsAssignedToLineManager(
      tenantRef, lineManager, claimId
    );
    if (statusCode === 403) return [statusCode, message];
    const [updated, claim] = await ClaimService[approvalMethod](tenantRef, lineManager, claimId);
    return [200, `Claim${updated ? '' : ' not'} ${approvalType.toLowerCase()}.`, claim];
  }

  static async runApprovalAndNotifyUsers(req, approvalType) {
    const { tenantRef, params: { claimId }, lineManager: { lineManagerRole } } = req;
    const [statusCode, message, data] = await Claim.runClaimApproval(req, approvalType);
    if (statusCode !== 200) return [statusCode, message];

    const staff = await StaffService.fetchStaffByPk(tenantRef, data.requester, ['supervisor', 'BSM', 'company']);
    notifications.emit(
      eventNames[`${lineManagerRole}${approvalType}`], [{
        tenantRef, staff, lineManagerRole, claimId
      }]
    );

    return [statusCode, message, data];
  }

  static async approve(req) {
    return Claim.runApprovalAndNotifyUsers(req, 'Approved');
  }

  static decline(req) {
    return Claim.runApprovalAndNotifyUsers(req, 'Declined');
  }

  static async cancel(req) {
    const { tenantRef, params: { claimId }, staff } = req;
    try {
      const [updated, claim] = await ClaimService.cancelClaim(tenantRef, claimId);
      if (updated) {
        notifications.emit(eventNames.Cancelled, [{ tenantRef, staff, claimId }]);
      }
      return [200, `Claim${updated ? '' : ' not'} cancelled.`, claim[0]];
    } catch (e) {
      return [500, 'There was a problem cancelling your claim ERR500CLMCNL.'];
    }
  }
}

export default Claim;
