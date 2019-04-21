import BasicQuerier from '../BasicQuerier';

class PasswordResetService {
  static fetchPasswordResetRequest(tenantRef, staffId) {
    return BasicQuerier.passwordResetQueries('findOne', staffId);
  }

  static deletePasswordResetRequest(tenantRef, staffId) {
    return BasicQuerier.passwordResetQueries('destroy', staffId);
  }

  static updateOrInsertResetRequest(tenantRef, data) {
    return BasicQuerier.passwordResetQueries('upsert', undefined, data);
  }
}

export default PasswordResetService;
