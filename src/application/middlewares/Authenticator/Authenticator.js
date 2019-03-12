import krypter from '../../helpers/krypter';
import { authErrorCodes, authRoleName } from '../../utils/authentication';

const errorToStaff = 'Please login first.';
const errorToLineManager = `Your request was unauthorised.${
  ''
} Be sure to have clicked the button in the email you recieved.`;

class Authenticator {
  static authenticateAdmin(req, res, next) {
    return Authenticator.authenticate(req, res, next, 'admin', errorToStaff);
  }

  static authenticateStaff(req, res, next) {
    return Authenticator.authenticate(req, res, next, 'staff', errorToStaff);
  }

  static authenticateLineManager(req, res, next) {
    return Authenticator.authenticate(req, res, next, 'lineManager', errorToLineManager);
  }

  static authenticate(req, res, next, requester, message) {
    const token = req.cookies[`${requester}Token`];
    if (!token) {
      return res.status(401).json({ message });
    }
    return Authenticator.decrypt(req, res, next, requester, token);
  }

  static verifyLineManager(req, res, next) {
    const { query: { hash } } = req;
    if (!hash) {
      return res.status(401).json({ message: 'Your request was unauthorised. Access denied.' });
    }
    return Authenticator.decrypt(req, res, next, 'lineManager', hash);
  }

  static decrypt(req, res, next, requester, token) {
    const errorCode = authErrorCodes[requester];
    const currentUserRole = authRoleName[requester];

    try {
      const decoded = krypter.authenticationDecryption(token);
      req[currentUserRole] = decoded[requester];
      return next();
    } catch (e) {
      return res.status(401).json({ message: `Authentication error ${errorCode}.` });
    }
  }
}
export default Authenticator;
