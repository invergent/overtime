import supertest from 'supertest';
import http from 'http';
import app from '../../../app';
import EmailNotifications from '../../../Application/Features/utilities/notifications/EmailNotifications';

jest.mock('@sendgrid/mail');

describe('INIT tests', () => {
  let server;
  let request;

  beforeAll((done) => {
    server = http.createServer(app);
    server.listen(7000, done);
    request = supertest('http://init.overtime-api.example.com:7000');
  });

  beforeEach(() => jest.spyOn(EmailNotifications, 'sender').mockImplementation(() => {}));

  afterAll((done) => {
    server.close(done);
  });

  describe('Forgot password test', () => {
    it('should fail if neither staffId nor email is provided', async () => {
      const response = await request
        .post('/forgot-password')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('validationErrors');
      expect(response.body.errors[0]).toEqual('Please provide either email or password');
    });

    it('should fail if staffId is incorrect', async () => {
      const response = await request
        .post('/forgot-password')
        .send({ staffId: 'TN0123' });

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('validationErrors');
      expect(response.body.errors[0]).toEqual('Staff ID is invalid');
    });

    it('should send a password reset email for staff', async () => {
      const response = await request
        .post('/forgot-password')
        .send({ staffId: 'TN012345' });

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('We just sent an email to john.doe@init.com');
    });

    it('should send a password reset email for admin', async () => {
      const response = await request
        .post('/forgot-password')
        .send({ email: 'theadmin@init.com' });

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('We just sent an email to theadmin@init.com');
    });
  });
});
