import Cryptr from 'cryptr';
import jsonwebtoken from 'jsonwebtoken';

class Krypter {
  constructor() {
    this.cryptr = new Cryptr(process.env.SECRET);
    this.jwt = jsonwebtoken;
  }

  createJwtToken(key, payload) {
    return this.jwt.sign({ [key]: payload }, process.env.SECRET);
  }

  decodeJwtToken(token) {
    return this.jwt.verify(token, process.env.SECRET);
  }

  createCryptrHash(payload) {
    return this.cryptr.encrypt(payload);
  }

  decryptCryptrHash(hash) {
    return this.cryptr.decrypt(hash);
  }

  authenticationEncryption(key, payload) {
    const jwtToken = this.createJwtToken(key, payload);
    const hashedToken = this.createCryptrHash(jwtToken);
    return hashedToken;
  }

  authenticationDecryption(tokenFromCookie) {
    const dehashedToken = this.decryptCryptrHash(tokenFromCookie);
    const decoded = this.decodeJwtToken(dehashedToken);
    return decoded;
  }
}
export default Krypter;
