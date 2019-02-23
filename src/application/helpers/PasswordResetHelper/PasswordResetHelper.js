import services from '../../services';

const { PasswordResetService } = services;

class PasswordResetHelper {
  static async findAndValidateResetRequest(tenant, staffId, hash) {
    const passwordResetRequest = await PasswordResetService.fetchPasswordResetRequest(
      tenant, staffId
    );

    if (!passwordResetRequest) {
      return [404, 'Reset link is expired'];
    }

    if (hash !== passwordResetRequest.passwordResetHash) {
      return [403, 'Reset link is invalid'];
    }

    PasswordResetService.deletePasswordResetRequest(tenant, staffId);
    return [200, 'valid'];
  }
}

export default PasswordResetHelper;
