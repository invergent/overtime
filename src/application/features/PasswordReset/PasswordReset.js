import helpers from '../../helpers';
import tenantsModels from '../../database/tenantsModels';

const { Mailer, krypter, PasswordResetHelper } = helpers;

class PasswordReset {
  static async forgotPassword(req) {
    const { body: { staffId }, tenant } = req;
    const { Staff } = tenantsModels[tenant];
    const mailer = new Mailer(tenant);

    const staff = await Staff.findOne({ where: { staffId } });

    if (!staff) {
      return [404, 'Staff does not exist'];
    }

    const message = await PasswordResetHelper.processResetEmailMessage(staff, tenant);

    mailer.send(message);
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

    const hashedToken = krypter.authenticationEncryption('staffId', staffId);
    data.hashedToken = hashedToken;
    return [200, 'Decryption successful!', data];
  }

  static async resetPassword(req) {
    const {
      currentStaff, query: { hash }, body: { password }, tenant
    } = req;
    const { Staff, PasswordResetRequest } = tenantsModels[tenant];

    try {
      let [statusCode, message] = await PasswordResetHelper
        .findAndValidateResetRequest(currentStaff, hash, PasswordResetRequest);

      if (message !== 'valid') {
        return [statusCode, message];
      }

      [statusCode, message] = PasswordResetHelper
        .processPasswordReset(currentStaff, password, Staff);
      return [statusCode, message];
    } catch (e) {
      return [500, 'An error occured ERR500PSWRST'];
    }
  }
}

export default PasswordReset;
