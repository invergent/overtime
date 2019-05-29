import services from '../utilities/services';
import AuthorisationHelpers from '../utilities/helpers/AuthorisationHelpers';

const { StaffService } = services;

class Authorisation {
  static async runAuthorisation(req) {
    const { body: { staffId, email, password }, tenantRef, path } = req;
    const identifier = staffId ? staffId.toUpperCase() : email.toLowerCase();
    const errorCode = path.includes('admin') ? 'ADMLGN' : 'STFLGN';
    
    try {
      const staff = await StaffService.findStaffByStaffIdOrEmail(tenantRef, identifier, ['role']);
      if (!staff) return [404, 'Staff not found'];
      
      
      const [statusCode, message] = AuthorisationHelpers.comparePassword(password, staff);
      if (statusCode !== 200) return [statusCode, message];
      let tokenType;
      if (staff.role) {
        tokenType = staff.role.name === 'Admin' ? 'adminToken' : 'staffToken';
      } else {
        tokenType = path.includes('admin') ? 'adminToken' : 'staffToken';
      }

      return AuthorisationHelpers.createStaffToken(staff, tokenType);
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
