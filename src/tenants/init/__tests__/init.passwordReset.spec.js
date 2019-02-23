import supertest from 'supertest';
import http from 'http';
import app from '../../../app';
import EmailNotifications from '../../../application/notifications/EmailNotifications';

describe('INIT tests', () => {
  let server;
  let request;

  beforeAll((done) => {
    server = http.createServer(app);
    server.listen(7000, done);
    request = supertest('http://init.overtime-api.example.com:7000');
  });

  beforeEach(() => jest.spyOn(EmailNotifications, 'sendEmail'));

  afterAll((done) => {
    server.close(done);
  });

  describe('Forgot password test', () => {
    it('should fail if staffId is incorrect', async () => {
      const response = await request
        .post('/forgot-password')
        .send({ staffId: 'TN0123' });

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('validationErrors');
      expect(response.body.errors[0]).toEqual('Staff ID is invalid');
    });

    it('should send a password reset email', async () => {
      const response = await request
        .post('/forgot-password')
        .send({ staffId: 'TN012345' });

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('We just sent an email to john.doe@init.com');
    });
  });

  describe('resetPassword tests', () => {
    let token;

    beforeAll(async () => {
      // signin a user
      const response = await request
        .post('/signin')
        .send({ staffId: 'TN012345', password: 'password' })
        .set('Accept', 'application/json');

      token = response.header['set-cookie'];
    });

    it('should fail if passwords do not match', async () => {
      const response = await request
        .post('/users/profile/reset')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send({ password: 'password', confirmPassword: 'passwor' });

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('validationErrors');
      expect(response.body.errors[0]).toEqual('Passwords do not match');
    });
  });
});
