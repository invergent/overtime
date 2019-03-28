import Authorisation from '../Authorisation';
import krypter from '../../utilities/helpers/krypter';
import models from '../../../Database/models';
import {
  mockReq, mockStaff
} from '../../../../__tests__/__mocks__';

const { Staff } = models;

describe('Authorisation Unit Tests', () => {
  beforeEach(() => {
    jest.spyOn(krypter, 'authenticationEncryption').mockReturnValue('someToken');
  });

  describe('authoriseStaff', () => {
    it('should catch errors if they occur while authorising staff', async () => {
      jest.spyOn(Staff, 'findOne').mockRejectedValue('failed');

      const result = await Authorisation.authoriseStaff(mockReq);
      expect(result).toHaveLength(2);
      expect(result[0]).toBe(500);
      expect(result[1]).toBe('An error occurred ERR500STFLGN.');
    });

    it('should identify a first time signin', async () => {
      jest.spyOn(Staff, 'findOne').mockResolvedValue(mockStaff);

      const [statusCode, message, data] = await Authorisation.authoriseStaff(mockReq);

      expect(statusCode).toBe(200);
      expect(message).toBe('Login successful!');
      expect(data.firstSignin).toBe(true);
    });
  });

  describe('authoriseLineManager', () => {
    it('should catch errors if they occur while authorising lineManager', () => {
      jest.spyOn(krypter, 'authenticationEncryption').mockImplementation(() => {
        throw new Error();
      });

      const result = Authorisation.authoriseLineManager(mockReq);
      expect(result).toHaveLength(2);
      expect(result[0]).toBe(500);
      expect(result[1]).toBe('An error occurred ERR500VFYMGR.');
    });
  });
});
