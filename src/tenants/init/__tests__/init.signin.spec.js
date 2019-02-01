import supertest from 'supertest';
import http from 'http';
import app from '../../../app';

describe('INIT tests', () => {
  let server;
  let request;

  beforeAll((done) => {
    server = http.createServer(app);
    server.listen(7000, done);
    request = supertest('http://init.overtime.com:7000');
  });

  afterAll((done) => {
    server.close(done);
  });

  describe('INIT home', () => {
    it('should return "INIT boarded"', async () => {
      const response = await request
        .get('/');

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('INIT boarded');
    });
  });

  describe('Signin', () => {
    it('should respond with missing fields if fields are empty while attempting a signin', async () => {
      const response = await request
        .post('/signin')
        .send({})
        .set('Accept', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('The following fields are missing: staffId, password');
    });

    it('should fail if details are provided but incorrect', async () => {
      const response = await request
        .post('/signin')
        .send({ staffId: 'TN01234', password: '' })
        .set('Accept', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('validationErrors');
      expect(response.body.errors[0]).toEqual('Enter a value for password');
      expect(response.body.errors[1]).toEqual('Staff ID is invalid');
    });

    it('should fail if staff does not exist', async () => {
      const response = await request
        .post('/signin')
        .send({ staffId: 'TN412345', password: 'password' })
        .set('Accept', 'application/json');

      expect(response.status).toBe(404);
      expect(response.body.message).toEqual('Staff not found');
    });

    it('should fail if password is wrong', async () => {
      const response = await request
        .post('/signin')
        .send({ staffId: 'TN012345', password: 'passwordddd' })
        .set('Accept', 'application/json');

      expect(response.status).toBe(401);
      expect(response.body.message).toEqual('Credentials do not match');
    });

    it('should log user in', async () => {
      const response = await request
        .post('/signin')
        .send({ staffId: 'TN012345', password: 'password' })
        .set('Accept', 'application/json');

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Login successful!');
    });
  });
});
