import krypter from '../krypter';
import services from '../../services';

const { PasswordResetService } = services;

class EmailNotificationsHelpers {
  static createAndSaveResetHash(tenant, staffId) {
    const passwordResetHash = krypter.createCryptrHash(`${process.env.RESET_SECRET} ${staffId}`);

    const data = { staffId, passwordResetHash, status: 'Pending' };
    PasswordResetService.updateOrInsertResetRequest(tenant, data);
    return passwordResetHash;
  }
}

export default EmailNotificationsHelpers;
