import krypter from '../../helpers/krypter';

class Authenticator {
  static staff(req, res, next) {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: 'Please login first.' });
    }
    return Authenticator.decrypt(req, res, next, 'currentStaff', token);
  }

  static lineManager(req, res, next) {
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
