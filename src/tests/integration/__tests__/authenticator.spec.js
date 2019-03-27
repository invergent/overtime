import supertest from 'supertest';
import http from 'http';
import app from '../../../app';

jest.mock('@sendgrid/mail');

describe('Authenticator Tests', () => {
  let server;
  let request;

  beforeAll((done) => {
    server = http.createServer(app);
    server.listen(7000, done);
    request = supertest('http://init.overtime-api.example.com:7000');
  });

  afterAll((done) => {
    server.close(done);
  });

  describe('Verify line manager', () => {
    it('should fail if request does not contain query with a property hash.', async () => {
      const response = await request.get('/verify');

      expect(response.status).toBe(401);
      expect(response.body.message).toEqual('Your request was unauthorised. Access denied.');
    });
  });
});
