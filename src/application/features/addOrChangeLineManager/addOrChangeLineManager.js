import services from '../../services';

const { LineManagerService, StaffService } = services;

export default async (req) => {
  const { currentStaff: { staffId }, body, tenant } = req;
  const lineManagerDetails = body;
  const lineManagerIdColumn = lineManagerDetails.lineManagerRole === 'Supervisor'
    ? 'supervisorId' : 'bsmId';

  try {
    const [lineManager, created] = await LineManagerService
      .findOrCreateLineManager(tenant, lineManagerDetails);

    const data = { ...lineManager, staffId, lineManagerIdColumn };
    StaffService.updateStaffsLineManager(tenant, data);

    return [
      created ? 201 : 200,
      `${lineManagerDetails.lineManagerRole} ${created ? 'added' : 'updated'} successfully.`,
      lineManager
    ];
  } catch (e) {
    return [500, 'An error occured ERR500CNGLNM'];
  }
};
