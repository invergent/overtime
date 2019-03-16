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

  describe('Excel download', () => {
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

    it('should fail if docType is invalid', async () => {
      const response = await request.get('/admin/claims/export/someParam').set('cookie', token);

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('validationErrors');
      expect(response.body.errors[0]).toEqual('Invalid! DocType can only be "excel".');
    });

    it('should return readable excel document', async () => {
      const response = await request.get('/admin/claims/export/excel').set('cookie', token);

      expect(response.status).toBe(200);
    });
  });
});
