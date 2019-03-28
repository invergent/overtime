import BasicQuerier from '../BasicQuerier';

class PasswordResetService {
  static fetchPasswordResetRequest(tenantRef, staffId) {
    return BasicQuerier.passwordResetQueries(tenantRef, 'findOne', staffId);
  }

  static deletePasswordResetRequest(tenantRef, staffId) {
    return BasicQuerier.passwordResetQueries(tenantRef, 'destroy', staffId);
  }

  static updateOrInsertResetRequest(tenantRef, data) {
    return BasicQuerier.passwordResetQueries(tenantRef, 'upsert', undefined, data);
  }
}

export default PasswordResetService;
