import http from 'http';
import supertest from 'supertest';
import app from '../../../app';
import models from '../../../Application/Database/models';

jest.mock('@sendgrid/mail');

const { Staff } = models;
const branchDetails = { branchId: 2 };

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

  describe('Get/Create/Update branch', () => {
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

    it('should fail if staff is not logged in', async () => {
      const response = await request
        .put('/users/profile/branch')
        .set('Accept', 'application/json')
        .send(branchDetails);

      expect(response.status).toBe(401);
      expect(response.body.message).toEqual('Please login first.');
    });

    it('should fail if branchId is not a number', async () => {
      const incorrectBranchDetails = { ...branchDetails };
      incorrectBranchDetails.branchId = NaN;
      const response = await request
        .put('/users/profile/branch')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send(incorrectBranchDetails);

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('branchId is required');
    });

    it('should fail if fields are missing', async () => {
      const response = await request
        .put('/users/profile/branch')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send({});

      const expectedMessage = 'branchId is required';

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(expectedMessage);
    });

    it('should fail if branch does not exist', async () => {
      const incorrectBranchDetails = { ...branchDetails };
      incorrectBranchDetails.branchId = 109899;
      const response = await request
        .put('/users/profile/branch')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send(incorrectBranchDetails);

      expect(response.status).toBe(404);
      expect(response.body.message).toEqual('Branch does not exist.');
    });

    it('should update Staff\'s branch', async () => {
      const response = await request
        .put('/users/profile/branch')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send(branchDetails);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Branch updated successfully.');
    });

    it('should respond with a list of branches', async () => {
      const response = await request.get('/branches').set('cookie', token);
      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Request successful!');
      expect(response.body.data).toHaveLength(13);
      expect(response.body.data[0]).toHaveProperty('name');
    });

    it('should respond with an error message if an error occurs', async () => {
      const err = new Error('Not working');
      jest.spyOn(Staff, 'update').mockRejectedValue(err);
      const response = await request
        .put('/users/profile/branch')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send(branchDetails);

      expect(response.status).toBe(500);
      expect(response.body.message).toEqual('An error occured ERR500CNGBRH');
    });
  });
});
