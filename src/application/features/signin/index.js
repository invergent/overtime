import bcrypt from 'bcrypt';
import Cryptr from 'cryptr';
import jwt from 'jsonwebtoken';

const cryptr = new Cryptr(process.env.SECRET);

export default async (req, res, models) => {
  const { Staff } = models;
  const { staffId, password } = req.body;

  try {
    const staff = await Staff.findOne({ where: { staffId } });

    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    const match = await bcrypt.compare(password, staff.password);

    if (!match) {
      return res.status(400).json({ message: 'Credentials do not match' });
    }

    const token = jwt.sign({ staffId }, process.env.SECRET);
    const hashedToken = cryptr.encrypt(token);
    res.cookie('token', hashedToken, { expires: new Date(Date.now() + 3600000), httpOnly: true });
    return res.status(200).json({ message: 'Login successful!' });
  } catch (e) {
    return res.status(500).json({ message: 'An error occured ERR500LOGIN' });
  }
};
