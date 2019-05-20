import http from 'http';
import supertest from 'supertest';
import app from '../../../app';

describe('Branch', () => {
  let server;
  let request;

  beforeAll(async () => {
    server = http.createServer(app);
    await server.listen(7000);
    request = supertest('http://init.overtime-api.example.com:7000');
  });

  afterAll((done) => {
    server.close(done);
  });

  describe('Get/Create/Update Roles', () => {
    let token;

    beforeAll(async () => {
      // signin a user
      const response = await request
        .post('/signin')
        .send({ staffId: 'TN012345', password: 'password' })
        .set('Accept', 'application/json');

      token = response.header['set-cookie'];
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should respond with a list of roles', async () => {
      const response = await request.get('/roles').set('cookie', token);
      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Request successful!');
      expect(response.body.data).toHaveLength(5);
      expect(response.body.data[0]).toHaveProperty('name');
    });
  });
});
