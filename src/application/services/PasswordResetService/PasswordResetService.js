import tenantsModels from '../../database/tenantsModels';
import BasicQuerier from '../BasicQuerier';

class PasswordResetService {
  static fetchPasswordResetRequest(tenant, staffId) {
    return BasicQuerier.passwordResetQueries(tenant, 'findOne', staffId);
  }

  static deletePasswordResetRequest(tenant, staffId) {
    return BasicQuerier.passwordResetQueries(tenant, 'destroy', staffId);
  }

  static updateOrInsertResetRequest(tenant, data) {
    return BasicQuerier.passwordResetQueries(tenant, 'upsert', undefined, data);
  }
}

export default PasswordResetService;
