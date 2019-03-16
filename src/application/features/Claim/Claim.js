import helpers from '../../helpers';
import services from '../../services';
import notifications from '../../notifications';
import { eventNames } from '../../utils/types';
import IntrinsicMiddlewares from '../../IntrinsicMiddlewares';

const { ClaimService, StaffService } = services;
const { ClaimHelpers } = helpers;

class Claim {
  static async create(req) {
    const { currentStaff: { staffId }, body, tenant } = req;

    try {
      const staff = await StaffService.findStaffByStaffIdOrEmail(tenant, staffId, ['supervisor', 'BSM']);
      const overtimeRequest = ClaimHelpers.createOvertimeRequestObject(body, staff.id);
      const { messageWhenCreated, messageWhenNotCreated } = ClaimHelpers.responseMessage(
        overtimeRequest
      );

      const [claim, created] = await ClaimService.findOrCreateClaim(tenant, overtimeRequest);
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
    const approvalMethod = approvalType === 'Approved' ? 'approveClaim' : 'declineClaim';

    const [statusCode, message] = await Claim.checkThatClaimIsAssignedToLineManager(
      tenant, lineManager, claimId
    );
    if (statusCode === 403) return [statusCode, message];
    const [updated, claim] = await ClaimService[approvalMethod](tenant, lineManager, claimId);
    return [200, `Claim${updated ? '' : ' not'} ${approvalType.toLowerCase()}.`, claim];
  }

  static async runApprovalAndNotifyUsers(req, approvalType) {
    const { tenant, lineManager: { lineManagerRole } } = req;
    const [statusCode, message, data] = await Claim.runClaimApproval(req, approvalType);
    if (statusCode !== 200) return [statusCode, message];

    const staff = await StaffService.fetchStaffByPk(tenant, data.requester, ['supervisor', 'BSM']);
    notifications.emit(
      eventNames[`${lineManagerRole}${approvalType}`], [tenant, staff, lineManagerRole]
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
    const { tenant, currentStaff: { staffId }, params: { claimId } } = req;
    const [statusCode, message, staff] = await IntrinsicMiddlewares.claimMiddleware(
      tenant, staffId, claimId
    );
    if (statusCode !== 200) return [statusCode, message];

    const [updated, claim] = await ClaimService.cancelClaim(tenant, claimId);
    notifications.emit(eventNames.Cancelled, [tenant, staff]);

    return [200, `Claim${updated ? '' : ' not'} cancelled.`, claim[0]];
  }

  static async submittedClaims(req) {
    const { tenant } = req;
    const claims = await ClaimHelpers.submittedClaimsForAdmin(tenant);
    return [200, `Found ${claims.length} claims`, claims];
  }
}

export default Claim;
