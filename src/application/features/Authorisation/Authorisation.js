import services from '../../services';
import AuthorisationHelpers from '../../helpers/AuthorisationHelpers';

const { StaffService } = services;

class Authorisation {
  static async runAuthorisation(req, tokenType) {
    const { body: { staffId, email, password }, tenantRef } = req;
    const identifier = staffId || email;
    const errorCode = tokenType === 'adminToken' ? 'ADMLGN' : 'STFLGN';

    try {
      const staff = await StaffService.findStaffByStaffIdOrEmail(tenantRef, identifier, ['staffRole']);
      if (!staff) return [404, 'Staff not found'];

      const [statusCode, message, data] = AuthorisationHelpers.comparePassword(password, staff);
      if (statusCode !== 200) return [statusCode, message, data];

      return AuthorisationHelpers.createStaffToken(staff, data, tokenType);
    } catch (e) {
      return [500, `An error occurred ERR500${errorCode}.`];
    }
  }

  static async authoriseStaff(req) {
    return Authorisation.runAuthorisation(req, 'staffToken');
  }

  static authoriseAdmin(req) {
    return Authorisation.runAuthorisation(req, 'adminToken');
  }

  static authoriseLineManager(req) {
    const { lineManager } = req;
    try {
      return AuthorisationHelpers.createLineManagerToken(lineManager);
    } catch (e) {
      return [500, 'An error occurred ERR500VFYMGR.'];
    }
  }
}

export default Authorisation;
