import http from 'http';
import supertest from 'supertest';
import app from '../../../app';

jest.mock('@sendgrid/mail');

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

  describe('Profile update', () => {
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

    it('should fail if request is empty', async () => {
      const response = await request
        .put('/users/profile')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('validationErrors');
      expect(response.body.errors[0]).toEqual('You sent an empty request.');
    });

    it('should update staff profile', async () => {
      const response = await request
        .put('/users/profile')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send({ firstname: 'John', lastname: 'Doe', email: 'john.doe@init.com', roleId: 1,  branchId: 2 });

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Profile updated!');
    });

    it('should fail if errors occur', async () => {
      const response = await request
        .put('/users/profile')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send({ email: 'spec.en.james@gmail.com' });
        
      expect(response.status).toBe(500);
      expect(response.body.message).toEqual('An error occurred ERR500PRFUPD');
    });
  });
});
