import signin from '../signin';
import tenantsModels from '../../../database/tenantsModels';
import {
  mockReq, mockStaff
} from '../../../../__tests__/__mocks__';

jest.mock('../../../helpers/krypter', () => ({
  authenticationEncryption: jest.fn(() => 'someToken')
}));

const { Staff } = tenantsModels.INIT;

describe('Signin Unit test', () => {
  it('should throw a catch error if an execution error occurs', async () => {
    jest.spyOn(Staff, 'findOne').mockRejectedValue('failed');

    const result = await signin(mockReq);
    expect(result).toHaveLength(2);
    expect(result[0]).toBe(500);
    expect(result[1]).toBe('An error occured ERR500LOGIN');
  });

  it('should identify a first time signin', async () => {
    jest.spyOn(Staff, 'findOne').mockResolvedValue(mockStaff);

    const [statusCode, message, data] = await signin(mockReq);

    expect(statusCode).toBe(200);
    expect(message).toBe('Login successful!');
    expect(data.firstSignin).toBe(true);
  });
});
