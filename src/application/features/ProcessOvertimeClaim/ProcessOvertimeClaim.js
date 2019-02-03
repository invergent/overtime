import Dates from '../../helpers/Dates';

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

      const result = await Claims.create(overtimeRequest);
      return [201, 'Claim successfully.', result];
    } catch (e) {
      return [500, 'There was a problem submitting your request ERR500PSWRST'];
    }
  }
}

export default ProcessOvertimeClaim;
