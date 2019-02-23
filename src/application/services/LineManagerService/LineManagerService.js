import tenantsModels from '../../database/tenantsModels';

class LineManagerService {
  static findOrCreateLineManager(tenant, lineManagerDetails) {
    const { LineManagers } = tenantsModels[tenant];

    return LineManagers.findOrCreate({
      where: { email: lineManagerDetails.email },
      defaults: lineManagerDetails,
      raw: true
    });
  }
}

export default LineManagerService;
