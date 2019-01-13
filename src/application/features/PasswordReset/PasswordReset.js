import bcrypt from 'bcrypt';
import helpers from '../../helpers';
import types from '../../utils/types';

const { EmailConstructor, Mailer, krypter } = helpers;

class PasswordReset {
  static async forgotPassword(req, res, model, client) {
    const { Staff, EmailTemplate, PasswordResetRequest } = model;
    const { staffId } = req.body;
    const mailer = new Mailer(client);

    const staff = await Staff.findOne({ where: { staffId } });

    if (!staff) {
      return res.status(404).json({ message: 'Staff does not exist' });
    }

    const passwordResetHash = krypter.createCryptrHash(`${process.env.RESET_SECRET} ${staffId}`);
    await PasswordResetRequest.upsert({ staffId, passwordResetHash, status: 'Pending' });

    const passwordResetDetails = { staff, passwordResetHash, emailTemplateName: types.Reset };
    const message = await EmailConstructor.create(passwordResetDetails, EmailTemplate);

    mailer.send(message);

    return res.status(200).json({ message: `We just sent an email to ${staff.email}` });
  }

  static confirmPasswordResetRequest(req, res) {
    const { hash } = req.query;

    if (!hash) {
      return res.status(403).json({ message: 'Invalid reset link' });
    }

    const decrypted = krypter.decryptCryptrHash(hash);
    const [secret, staffId] = decrypted.split(' ');

    if (secret !== process.env.RESET_SECRET) {
      return res.status(403).json({ message: 'Decryption failed!' });
    }

    const hashedToken = krypter.authenticationEncryption('staffId', staffId);
    res.cookie('token', hashedToken, { expires: new Date(Date.now() + 3600000), httpOnly: true });
    return res.status(200).json({ message: 'Decryption successful!' });
  }

  static async resetPassword(req, res, model) {
    const { currentStaffId, query: { hash }, body: { password } } = req;
    const { Staff, PasswordResetRequest } = model;

    const staffPasswordResetRequest = await PasswordResetRequest.findOne({
      where: { staffId: currentStaffId }, raw: true
    });

    if (!staffPasswordResetRequest) {
      return res.status(404).json({ message: 'Reset link is expired' });
    }

    if (hash !== staffPasswordResetRequest.passwordResetHash) {
      return res.status(403).json({ message: 'Reset link is invalid' });
    }

    const passwordHash = bcrypt.hashSync(password, 7);
    const [updated] = await Staff.update(
      { password: passwordHash }, { where: { staffId: currentStaffId } }
    );

    await PasswordResetRequest.destroy({ where: { staffId: currentStaffId } });
    return res.status(updated ? 200 : 500).json({
      message: `Password reset ${
        updated ? 'successful!' : 'unsuccessful! Please reinitiate request'
      }`
    });
  }
}

export default PasswordReset;
