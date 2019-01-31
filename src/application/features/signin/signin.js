import bcrypt from 'bcrypt';
import krypter from '../../helpers/krypter';

export default async (loginRequest, models) => {
  const { Staff, Roles } = models;
  const { body: { staffId, password } } = loginRequest;
  const data = {};

  try {
    const staff = await Staff.findOne({ where: { staffId }, include: [Roles], raw: true });
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

    const payload = { staffId, staffRole: staff['Role.name'] };

    const hashedToken = krypter.authenticationEncryption('staff', payload);
    data.hashedToken = hashedToken;
    return [200, 'Login successful!', data];
  } catch (e) {
    return [500, 'An error occured ERR500LOGIN'];
  }
};
