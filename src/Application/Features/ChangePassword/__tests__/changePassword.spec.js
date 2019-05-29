import bcrypt from 'bcrypt';
import ChangePassword from '../ChangePassword';
import StaffService from '../../utilities/services/StaffService';
import { mockReq } from '../../../../__tests__/__mocks__';

jest.mock('@sendgrid/mail', () => () => ({
  setApiKey: () => {},
  send: () => {}
}));

describe('ChangePassword Unit test', () => {
  it('should throw an exception if an error occurs', async () => {
    jest.spyOn(StaffService, 'findStaffByStaffIdOrEmail').mockRejectedValue('failed');

    try {
      await ChangePassword.processPasswordUpdate(mockReq, 'models');
    } catch (e) {
      expect(e).toEqual('failed');
    }
  });

  it('should return true if initial plaintext password hasn"t been changed', async () => {
    const isCorrect = await ChangePassword.currentPasswordIsCorrect('password', 'password');
    expect(isCorrect).toBe(true);
  });

  it('should return a status of 500 if update fails', async () => {
    jest.spyOn(StaffService, 'findStaffByStaffIdOrEmail').mockResolvedValue('good');
    jest.spyOn(StaffService, 'updateStaffInfo').mockResolvedValue(false);
    jest.spyOn(ChangePassword, 'currentPasswordIsCorrect').mockReturnValue(true);
    jest.spyOn(bcrypt, 'hashSync').mockReturnValue('somehash');
    const mockRequest = { body: { currentPassword: 'passworded' }, currentStaff: {} };

    const [status, message] = await ChangePassword.processPasswordUpdate(mockRequest);

    expect(status).toBe(500);
    expect(message).toBe('Password not changed!');
  });
});
