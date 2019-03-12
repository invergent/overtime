import supertest from 'supertest';
import http from 'http';
import app from '../../../app';

describe('Admin Claim Tests', () => {
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

  describe('Get submitted claims', () => {
    let token;

    beforeAll(async () => {
      // signin a user
      const response = await request
        .post('/admin/login')
        .send({ email: 'theadmin@init.com', password: 'password' })
        .set('Accept', 'application/json');

      token = response.header['set-cookie'];
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should fetch claims submitted in the current month', async () => {
      const response = await request.get('/admin/claims').set('cookie', token);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Found 3 claims');
      expect(response.body.data.length).toEqual(3);
    });
  });
});
