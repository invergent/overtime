import krypter from '../../helpers/krypter';

const errorToStaff = 'Please login first.';
const errorToLineManager = `Your request was unauthorised.${
  ''
} Be sure to have clicked the button in the email you recieved.`;

class Authenticator {
  static authenticateStaff(req, res, next) {
    return Authenticator.authenticate(req, res, next, 'currentStaff', errorToStaff);
  }

  static authenticateLineManager(req, res, next) {
    return Authenticator.authenticate(req, res, next, 'lineManager', errorToLineManager);
  }

  static authenticate(req, res, next, requester, message) {
    const { token } = req.cookies;
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
    const errorCode = requester === 'currentStaff' ? 'ERRSTFAUTH' : 'ERRLMRAUTH';
    const decodedValue = requester === 'currentStaff' ? 'staff' : 'lineManager';

    try {
      const decoded = krypter.authenticationDecryption(token);
      req[requester] = decoded[decodedValue];
      return next();
    } catch (e) {
      return res.status(401).json({ message: `Authentication error ${errorCode}.` });
    }
  }
}
export default Authenticator;
