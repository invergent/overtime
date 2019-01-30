import krypter from '../../helpers/krypter';

export default (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: 'Please login first.' });
  }
  try {
    const decoded = krypter.authenticationDecryption(token);
    req.currentStaff = decoded.staff;
    return next();
  } catch (e) {
    return res.status(401).json({ message: 'Authentication error ERR401AUTH' });
  }
};
