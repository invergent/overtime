import Dates from '../../helpers/Dates';

export default async (req, models) => {
  const { Staff, OvertimeRequests } = models;
  const { currentStaff: { staffId }, body } = req;

  try {
    const staff = await Staff.findOne({ where: { staffId }, raw: true });
    const overtimeRequest = {
      monthOfClaim: Dates.convertPreviousYearMonthToString(),
      ...body,
      requester: staff.id
    };

    const result = await OvertimeRequests.create(overtimeRequest);
    return [201, 'Overtime request submitted successfully', result];
  } catch (e) {
    return [500, 'There was a problem submitting your request ERR500PSWRST'];
  }
};
