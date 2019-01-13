import Cryptr from 'cryptr';
import jwt from 'jsonwebtoken';
import krypter from '../../helpers/krypter';

const cryptr = new Cryptr(process.env.SECRET);

export default (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: 'Please login first.' });
  }
  try {
    const decoded = krypter.authenticationDecryption(token);
    req.currentStaffId = decoded.staffId;
    return next();
  } catch (e) {
    return res.status(401).json({ message: 'Authentication error ERR401AUTH' });
  }
};
