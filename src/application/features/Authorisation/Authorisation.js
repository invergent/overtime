import bcrypt from 'bcrypt';
import krypter from '../../helpers/krypter';
import services from '../../services';

const { StaffService } = services;

class Authorisation {
  static async authoriseStaff(req) {
    const { body: { staffId, password }, tenant } = req;
    const data = {};

    try {
      const staff = await StaffService.findStaffByStaffId(tenant, staffId, ['staffRole']);
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

      const payload = { staffId, staffRole: staff['staffRole.name'] };
      const hashedToken = krypter.authenticationEncryption('staff', payload);
      data.hashedToken = hashedToken;
      return [200, 'Login successful!', data, 'staffToken'];
    } catch (e) {
      return [500, 'An error occurred ERR500LOGIN.'];
    }
  }

  static authoriseLineManager(req) {
    const { lineManager } = req;

    try {
      const hashedToken = krypter.authenticationEncryption('lineManager', lineManager);
      const data = { hashedToken };
      return [200, 'Verification successful!', data, 'lineManagerToken'];
    } catch (e) {
      return [500, 'An error occurred ERR500VFYMGR.'];
    }
  }
}

export default Authorisation;
