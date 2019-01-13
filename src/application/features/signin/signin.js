import bcrypt from 'bcrypt';
import krypter from '../../helpers/krypter';

export default async (loginCredentials, models) => {
  const { Staff } = models;
  const { staffId, password } = loginCredentials;
  const data = {};

  try {
    const staff = await Staff.findOne({ where: { staffId }, raw: true });
    if (!staff) {
      return [404, 'Staff not found'];
    }

    if (staff.password === 'password') {
      data.firstSignin = true;
    } else {
      const match = bcrypt.compareSync(password, staff.password);

      if (!match) {
        return [401, 'Credentials do not match'];
      }
    }

    const hashedToken = krypter.authenticationEncryption('staffId', staffId);
    data.hashedToken = hashedToken;
    return [200, 'Login successful!', data];
  } catch (e) {
    return [500, 'An error occured ERR500LOGIN'];
  }
};
