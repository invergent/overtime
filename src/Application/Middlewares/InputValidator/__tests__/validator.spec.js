import Validator from '../Validator';

describe('reset password entry validations', () => {
  it('should validate entries and return an empty array', () => {
    const reqObject = { password: 'password', confirmPassword: 'password' };
    const result = Validator.reset(reqObject);

    expect(result).toEqual([]);
  });
});
