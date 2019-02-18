import helpers from '../../helpers';
import intrinsicMiddlewares from '../../intrinsicMiddlewares';

const { Dates } = helpers;
const { claimsSpecificMiddleware } = intrinsicMiddlewares;

class ProcessOvertimeClaim {
  static async create(req, models) {
    const { Staff, Claims } = models;
    const { currentStaff: { staffId }, body } = req;

    try {
      const staff = await Staff.findOne({ where: { staffId }, raw: true });
      const overtimeRequest = {
        monthOfClaim: Dates.convertPreviousYearMonthToString(),
        ...body,
        requester: staff.id
      };

      const [claim, created] = await Claims.findOrCreate({
        where: { monthOfClaim: overtimeRequest.monthOfClaim, requester: overtimeRequest.requester },
        defaults: overtimeRequest,
        raw: true
      });

      const messageWhenCreated = 'Your claim request was created successfully.';
      const messageWhenNotCreated = `You have already submitted a claim request for ${
        overtimeRequest.monthOfClaim
      }. If you wish to make changes, please edit your submission.`;

      return created ? [201, messageWhenCreated, claim] : [409, messageWhenNotCreated, claim];
    } catch (e) {
      return [500, 'There was a problem submitting your request ERR500CLMCRT'];
    }
  }

  static async update(req, models) {
    const { Claims } = models;
    const {
      currentStaff: { staffId }, body, params: { claimId }
    } = req;

    try {
      const [statusCode, message] = await claimsSpecificMiddleware(claimId, models, staffId);
      if (statusCode !== 200) return [statusCode, message];

      const [updated, claim] = await Claims.update(
        body,
        { where: { id: claimId }, returning: true, raw: true }
      );
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
