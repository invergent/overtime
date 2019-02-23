import helpers from '../../helpers';
import services from '../../services';
import notifications from '../../notifications';
import types from '../../utils/types';

const { krypter, PasswordResetHelper } = helpers;
const { StaffService } = services;

class PasswordReset {
  static async forgotPassword(req) {
    const { body: { staffId }, tenant } = req;

    const staff = await StaffService.findStaffByStaffId(tenant, staffId);
    if (!staff) {
      return [404, 'Staff does not exist'];
    }

    notifications.emit(types.NewClaim, [tenant, staff]);
    return [200, `We just sent an email to ${staff.email}`];
  }

  static confirmPasswordResetRequest(req) {
    const { hash } = req.query;
    const data = {};

    if (!hash) {
      return [403, 'Invalid reset link'];
    }

    const decrypted = krypter.decryptCryptrHash(hash);
    const [secret, staffId] = decrypted.split(' ');

    if (secret !== process.env.RESET_SECRET) {
      return [403, 'Decryption failed!'];
    }

    const hashedToken = krypter.authenticationEncryption('staff', { staffId });
    data.hashedToken = hashedToken;
    return [200, 'Decryption successful!', data];
  }

  static async resetPassword(req) {
    const {
      currentStaff: { staffId }, query: { hash }, body: { password }, tenant
    } = req;

    try {
      const [statusCode, message] = await PasswordResetHelper
        .findAndValidateResetRequest(tenant, staffId, hash);

      if (message !== 'valid') {
        return [statusCode, message];
      }

      const updated = await StaffService.updatePassword(tenant, staffId, password);
      return [updated ? 200 : 500, `Password reset ${updated ? '' : 'un'}successful!`];
    } catch (e) {
      return [500, 'An error occured ERR500PSWRST'];
    }
  }
}

export default PasswordReset;
