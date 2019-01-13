import MainController from '../MainController';
import PasswordReset from '../../application/features/PasswordReset/PasswordReset';

const req = {};
const model = {};
const client = 'client';

const res = {
  cookie: jest.fn(),
  status: () => res,
  json: value => value
};

describe('MainController tests', () => {
  it('forgotPassword should call res.status and res.status.json', async () => {
    PasswordReset.forgotPassword = jest.fn(() => Promise.resolve([200, 'some message']));
    const result = await MainController.forgotPassword(req, res, model, client);

    expect(result.message).toEqual('some message');
  });

  it('confirmPasswordResetRequest should send non-200 response', async () => {
    PasswordReset.confirmPasswordResetRequest = jest.fn(() => Promise.resolve([400, 'some message']));
    const result = await MainController.confirmPasswordResetRequest(req, res);

    expect(result.message).toEqual('some message');
  });

  it('confirmPasswordResetRequest should send a 200 response', async () => {
    PasswordReset.confirmPasswordResetRequest = jest.fn(() => Promise.resolve([200, 'some message']));
    const result = await MainController.confirmPasswordResetRequest(req, res);

    expect(result.message).toEqual('some message');
  });

  it('resetPassword should send a 200 response', async () => {
    PasswordReset.resetPassword = jest.fn(() => Promise.resolve([200, 'some message']));
    const result = await MainController.resetPassword(req, res, model);

    expect(result.message).toEqual('some message');
  });
});
