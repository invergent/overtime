import Cryptr from 'cryptr';
import jwt from 'jsonwebtoken';

const cryptr = new Cryptr(process.env.SECRET);

export default (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: 'Please login first.' });
  }
  try {
    const dehashedToken = cryptr.decrypt(token);
    const decoded = jwt.verify(dehashedToken, process.env.SECRET);
    req.currentStaffId = decoded.staffId;
    return next();
  } catch (e) {
    return res.status(401).json({ message: 'Authentication error ERR401AUTH' });
  }
};
