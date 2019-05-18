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
        .send({ staffId: 'TN098432', password: 'password' })
        .set('Accept', 'application/json');

      token = response.header['set-cookie'];
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should respond with a list of notifications', async () => {
      const response = await request.get('/notifications').set('cookie', token);
      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Request successful!');
      expect(response.body.data).toHaveLength(2);
      expect(response.body.data[0]).toHaveProperty('activity');
    });

    it('should mark notifications as viewed and read', async () => {
      const response = await request.put('/notifications/read').set('cookie', token);
      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Request successful!');
    });
  });
});
