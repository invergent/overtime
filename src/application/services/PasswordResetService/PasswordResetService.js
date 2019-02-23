import tenantsModels from '../../database/tenantsModels';

class PasswordResetService {
  static fetchPasswordResetRequest(tenant, staffId) {
    const { PasswordResetRequest } = tenantsModels[tenant];
    return PasswordResetRequest.findOne({ where: { staffId }, raw: true });
  }

  static deletePasswordResetRequest(tenant, staffId) {
    const { PasswordResetRequest } = tenantsModels[tenant];
    return PasswordResetRequest.destroy({ where: { staffId }, returning: true });
  }

  static updateOrInsertResetRequest(tenant, data) {
    const { PasswordResetRequest } = tenantsModels[tenant];
    return PasswordResetRequest.upsert(data);
  }
}

export default PasswordResetService;
