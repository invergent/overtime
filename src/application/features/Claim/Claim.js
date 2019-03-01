import helpers from '../../helpers';
import services from '../../services';
import notifications from '../../notifications';
import { eventNames } from '../../utils/types';

const { ClaimService, StaffService } = services;
const { ClaimHelpers } = helpers;

class Claim {
  static async create(req) {
    const { currentStaff: { staffId }, body, tenant } = req;

    try {
      const staff = await StaffService.findStaffByStaffId(tenant, staffId, ['supervisor', 'BSM']);
      const overtimeRequest = ClaimHelpers.createOvertimeRequestObject(
        body, staff.id
      );

      const [claim, created] = await ClaimService.findOrCreateClaim(tenant, overtimeRequest);

      const { messageWhenCreated, messageWhenNotCreated } = ClaimHelpers
        .responseMessage(overtimeRequest);

      if (created) {
        notifications.emit(eventNames.NewClaim, [tenant, staff]);
      }

      return created ? [201, messageWhenCreated, claim] : [409, messageWhenNotCreated, claim];
    } catch (e) {
      return [500, 'There was a problem submitting your request ERR500CLMCRT'];
    }
  }

  static async sendPendingClaimsTolineManager(req) {
    const { tenant, lineManager } = req;
    const filteredResults = await ClaimHelpers.pendingClaimsForlineManager(tenant, lineManager);
    // An empty result still returned the manager's details.
    // This checks if claims were also returned
    if (filteredResults.length <= 1 && !filteredResults[0].staffId) {
      return [404, 'You currently have no pending claims to approve.'];
    }
    return [200, `You have ${filteredResults.length} claims to approve.`, filteredResults];
  }

  static async checkThatClaimIsAssignedToLineManager(tenant, lineManager, claimId) {
    const assignedClaims = await ClaimHelpers.getIdsOfClaimsAssignedToLineManager(
      tenant, lineManager
    );
    if (!assignedClaims.includes(parseInt(claimId, 10))) {
      return [403, 'This claim is not on your pending list. Access denied.'];
    }
    return [200, 'okay'];
  }

  static async runClaimApproval(req, approvalType) {
    const { tenant, params: { claimId }, lineManager } = req;
    const approvalMethod = approvalType === 'approve' ? 'approveClaim' : 'declineClaim';

    const [statusCode, message] = await Claim.checkThatClaimIsAssignedToLineManager(
      tenant, lineManager, claimId
    );
    if (statusCode === 403) return [statusCode, message];
    const [updated, claim] = await ClaimService[approvalMethod](tenant, lineManager, claimId);
    return [200, `Claim${updated ? '' : ' not'} ${approvalType}d.`, claim];
  }

  static approve(req) {
    return Claim.runClaimApproval(req, 'approve');
  }

  static decline(req) {
    return Claim.runClaimApproval(req, 'decline');
  }
}

export default Claim;
