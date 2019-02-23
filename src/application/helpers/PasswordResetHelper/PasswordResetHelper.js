import krypter from '../krypter';
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

  static createAndSaveResetHash(tenant, staffId) {
    const passwordResetHash = krypter.createCryptrHash(`${process.env.RESET_SECRET} ${staffId}`);

    const data = { staffId, passwordResetHash, status: 'Pending' };
    PasswordResetService.updateOrInsertResetRequest(tenant, data);
    return passwordResetHash;
  }
}

export default PasswordResetHelper;
