import supertest from 'supertest';
import http from 'http';
import app from '../../../app';

jest.mock('@sendgrid/mail');

describe('Staff Dashboard Info', () => {
  let server;
  let request;
  let token1;
  let token2;

  beforeAll((done) => {
    server = http.createServer(app);
    server.listen(7000, done);
    request = supertest('http://init.overtime-api.example.com:7000');
  });

  afterAll((done) => {
    server.close(done);
  });

  describe('Dashboard statistics', () => {
    beforeAll(async () => {
      // signin a user
      const response1 = await request
        .post('/signin')
        .send({ staffId: 'TN042995', password: 'password' })
        .set('Accept', 'application/json');

      const response2 = await request
        .post('/signin')
        .send({ staffId: 'TN098432', password: 'password' })
        .set('Accept', 'application/json');

      token1 = response1.header['set-cookie'];
      token2 = response2.header['set-cookie'];
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it("should return logged in staff's statistics.", async () => {
      const response = await request
        .get('/users/claims/statistics')
        .set('cookie', token1);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Request successful');
      expect(response.body.data).toHaveProperty('total');
      expect(response.body.data).toHaveProperty('completed');
    });

    it("should return logged in staff's pending claim.", async () => {
      const response = await request
        .get('/users/claims/pending')
        .set('cookie', token1);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Request successful');
      expect(response.body.data).toHaveProperty('monthOfClaim');
      expect(response.body.data).toHaveProperty('amount');
    });

    it('should return an empty object if staff does not have a pending claim.', async () => {
      const response = await request
        .get('/users/claims/pending')
        .set('cookie', token2);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Request successful');
      expect(response.body.data.monthOfClaim).toBe(undefined);
    });

    it("should return staff's recent activities in descending order of occurrence based on limit.", async () => {
      const response = await request
        .get('/users/activities?limit=5')
        .set('cookie', token1);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Request successful');
      expect(response.body.data[0].id).toBe(2);
      expect(response.body.data[1].id).toBe(1);
    });

    it('should return all activities in descending order of occurrence if limit is not provided.', async () => {
      const response = await request
        .get('/users/activities')
        .set('cookie', token1);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Request successful');
      expect(response.body.data.length).toBe(2);
    });

    it("should return staff's profile information.", async () => {
      const response = await request.get('/users/profile').set('cookie', token2);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Request successful');
      expect(response.body.data.firstname).toBe('King');
    });
  });
});
