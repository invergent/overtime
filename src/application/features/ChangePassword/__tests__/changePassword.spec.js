import ChangePassword from '../ChangePassword';
import { mockReq } from '../../../../__tests__/__mocks__';

describe('ChangePassword Unit test', () => {
  it('should throw an exception if an error occurs', async () => {
    const err = new Error('It failed.');
    ChangePassword.findStaffByStaffId = jest.fn(() => Promise.reject(err));

    try {
      await ChangePassword.processPasswordUpdate(mockReq, 'models');
    } catch (e) {
      expect(e).toEqual(err);
    }
  });
});
