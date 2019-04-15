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
    let token;

    beforeAll(async () => {
      // signin a user
      const response = await request
        .post('/signin')
        .send({ staffId: 'TN012345', password: 'password' })
        .set('Accept', 'application/json');

      token = response.header['set-cookie'];
    });

    it('should fail if request does not contain query with a property hash.', async () => {
      const response = await request.get('/line-manager/verify');

      expect(response.status).toBe(401);
      expect(response.body.message).toEqual('Your request was unauthorised. Access denied.');
    });

    it('should destroy token by clearing cookie', async () => {
      const response = await request.get('/destroy-token').set('cookie', token);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Token destroyed successfully.');
    });
  });
});
