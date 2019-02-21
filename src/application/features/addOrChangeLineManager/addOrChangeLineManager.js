import tenantsModels from '../../database/tenantsModels';

export default async (req) => {
  const { currentStaff: { staffId }, body, tenant } = req;
  const { Staff, LineManagers } = tenantsModels[tenant];
  const lineManagerDetails = body;
  const lineManagerIdColumn = lineManagerDetails.lineManagerRole === 'Supervisor'
    ? 'supervisorId' : 'bsmId';

  try {
    const [lineManager, created] = await LineManagers.findOrCreate({
      where: { email: lineManagerDetails.email },
      defaults: lineManagerDetails,
      raw: true
    });

    await Staff.update({ [lineManagerIdColumn]: lineManager.id }, { where: { staffId } });
    return [
      created ? 201 : 200,
      `${lineManagerDetails.lineManagerRole} ${created ? 'added' : 'updated'} successfully.`,
      lineManager
    ];
  } catch (e) {
    return [500, 'An error occured ERR500CNGLNM'];
  }
};
