import bcrypt from 'bcrypt';
import krypter from '../krypter';

class AuthorisationHelpers {
  static comparePassword(passwordFromRequest, staff) {
    const data = {};

    if (staff.password === 'password') {
      data.firstSignin = true;
      return [200, 'okay', data];
    }

    const match = bcrypt.compareSync(passwordFromRequest, staff.password);
    if (!match) {
      return [401, 'Credentials do not match'];
    }
    return [200, 'okay', data];
  }

  static createStaffToken(staff, data, tokenType) {
    const payloadName = tokenType === 'adminToken' ? 'admin' : 'staff';

    const payload = { id: staff.id, staffId: staff.staffId, staffRole: staff['role.name'] };
    const hashedToken = krypter.authenticationEncryption(payloadName, payload);
    data.hashedToken = hashedToken;
    return [200, 'Login successful!', data, tokenType];
  }

  static createLineManagerToken(lineManager) {
    const hashedToken = krypter.authenticationEncryption('lineManager', lineManager);
    const data = { hashedToken };
    return [200, 'Verification successful!', data, 'lineManagerToken'];
  }
}

export default AuthorisationHelpers;
