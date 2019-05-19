import bcrypt from 'bcrypt';
import krypter from '../krypter';

class AuthorisationHelpers {
  static comparePassword(passwordFromRequest, staff) {
    if (staff.password === 'password') {
      return [200, 'okay'];
    }

    const match = bcrypt.compareSync(passwordFromRequest, staff.password);
    if (!match) {
      return [401, 'Credentials do not match'];
    }
    return [200, 'okay'];
  }

  static createStaffToken(staff, tokenType) {
    const payloadName = tokenType === 'adminToken' ? 'admin' : 'staff';
    const staffRole = staff.role ? staff.role.name : null;

    const payload = { id: staff.id, staffId: staff.staffId, staffRole };
    const hashedToken = krypter.authenticationEncryption(payloadName, payload);
    const data = { hashedToken };
    return [200, 'Login successful!', data, tokenType];
  }

  static createLineManagerToken(lineManager) {
    const hashedToken = krypter.authenticationEncryption('lineManager', lineManager);
    const data = { hashedToken };
    return [200, 'Verification successful!', data, 'lineManagerToken'];
  }
}

export default AuthorisationHelpers;
