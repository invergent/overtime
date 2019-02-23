import helpers from '../../helpers';
import intrinsicMiddlewares from '../../intrinsicMiddlewares';
import services from '../../services';
import notifications from '../../notifications';
import { eventNames } from '../../utils/types';

const { ClaimService, StaffService } = services;
const { ProcessOvertimeClaimHelpers } = helpers;
const { claimsSpecificMiddleware } = intrinsicMiddlewares;

class ProcessOvertimeClaim {
  static async create(req) {
    const { currentStaff: { staffId }, body, tenant } = req;

    try {
      const staff = await StaffService.findStaffByStaffId(tenant, staffId, ['supervisor', 'BSM']);
      const overtimeRequest = ProcessOvertimeClaimHelpers.createOvertimeRequestObject(
        body, staff.id
      );

      const [claim, created] = await ClaimService.findOrCreateClaim(tenant, overtimeRequest);

      const { messageWhenCreated, messageWhenNotCreated } = ProcessOvertimeClaimHelpers
        .responseMessage(overtimeRequest);

      if (created) {
        notifications.emit(eventNames.NewClaim, [tenant, staff]);
      }

      return created ? [201, messageWhenCreated, claim] : [409, messageWhenNotCreated, claim];
    } catch (e) {
      return [500, 'There was a problem submitting your request ERR500CLMCRT'];
    }
  }

  static async update(req) {
    const {
      currentStaff: { staffId }, body, params: { claimId }, tenant
    } = req;

    try {
      const [statusCode, message] = await claimsSpecificMiddleware(claimId, tenant, staffId);
      if (statusCode !== 200) return [statusCode, message];

      const [updated, claim] = await ClaimService.updateClaim(tenant, body, claimId);
      return [
        200,
        `Claim${updated ? '' : ' not'} updated${updated ? ' successfully' : ''}.`,
        claim[0]
      ];
    } catch (e) {
      return [500, 'There was a problem submitting your request ERR500CLMUPD.'];
    }
  }
}

export default ProcessOvertimeClaim;
