import supertest from 'supertest';
import http from 'http';
import app from '../../../app';

describe('VLA tests', () => {
  let server;
  let request;

  beforeAll((done) => {
    server = http.createServer(app);
    server.listen(7000, done);
    request = supertest('http://vla.overtime.com:7000');
  });

  afterAll((done) => {
    server.close(done);
  });

  describe('Forgot password test', () => {
    it('should send a password reset email', async () => {
      const response = await request
        .post('/forgotPassword')
        .send({ staffId: 'TN012345' });

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('We just sent an email to john.doe@viclawrence.com');
    });
  });

  describe('Confirm password reset request tests', () => {
    it('should send a password reset email', async () => {
      const response = await request
        .post('/confirm-reset-request')
        .send({ staffId: 'TN012345' });

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('We just sent an email to john.doe@viclawrence.com');
    });
  });
});
