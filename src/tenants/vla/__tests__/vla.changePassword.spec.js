import http from 'http';
import supertest from 'supertest';
import app from '../../../app';

// This file was intentionally named with a preceeding z so it could remain at the bottom

const changePasswordCredentials = {
  currentPassword: 'password',
  newPassword: 'newPassword',
  confirmPassword: 'newPassword'
};

describe('VLA: Change Password Tests', () => {
  let server;
  let request;

  beforeAll(async () => {
    server = http.createServer(app);
    await server.listen(7000);
    request = supertest('http://vla.overtime.com:7000');
  });

  afterAll((done) => {
    server.close(done);
  });

  describe('ChangePassword', () => {
    let token;

    beforeAll(async () => {
      // signin a user
      const response = await request
        .post('/signin')
        .send({ staffId: 'TN046345', password: 'password' })
        .set('Accept', 'application/json');

      token = response.header['set-cookie'];
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should fail if staff is not logged in', async () => {
      const response = await request
        .post('/users/profile/change-password')
        .set('Accept', 'application/json')
        .send(changePasswordCredentials);

      expect(response.status).toBe(401);
      expect(response.body.message).toEqual('Please login first.');
    });

    it('should fail if current password is incorrect', async () => {
      const incorrectChangePasswordCredentials = { ...changePasswordCredentials };
      incorrectChangePasswordCredentials.currentPassword = 'changeIt';

      const response = await request
        .post('/users/profile/change-password')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send(incorrectChangePasswordCredentials);

      expect(response.status).toBe(401);
      expect(response.body.message).toEqual('Password is incorrect');
    });

    it('should fail if new password and confirm password do not match', async () => {
      const incorrectChangePasswordCredentials = { ...changePasswordCredentials };
      incorrectChangePasswordCredentials.newPassword = 'changeIt';

      const response = await request
        .post('/users/profile/change-password')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send(incorrectChangePasswordCredentials);

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('validationErrors');
      expect(response.body.errors[0]).toEqual('Passwords do not match');
    });

    it('should fail if any of the fields are missing', async () => {
      const response = await request
        .post('/users/profile/change-password')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(
        'The following fields are missing: currentPassword, newPassword, confirmPassword'
      );
    });

    it('should change password successfully', async () => {
      const response = await request
        .post('/users/profile/change-password')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send(changePasswordCredentials);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Password changed');
    });

    it('should fail if another change password request is sent with the old credentials', async () => {
      const response = await request
        .post('/users/profile/change-password')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send(changePasswordCredentials);

      expect(response.status).toBe(401);
      expect(response.body.message).toEqual('Password is incorrect');
    });
  });
});
