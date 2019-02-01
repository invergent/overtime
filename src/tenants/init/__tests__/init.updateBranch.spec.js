import http from 'http';
import supertest from 'supertest';
import app from '../../../app';
import models from '../models';

const { Staff } = models;
const branchDetails = { branchId: 2 };

describe('INIT: Update branch', () => {
  let server;
  let request;

  beforeAll(async () => {
    server = http.createServer(app);
    await server.listen(7000);
    request = supertest('http://init.overtime-api.invergent-technologies.com:7000');
  });

  afterAll((done) => {
    server.close(done);
  });

  describe('Branch update tests', () => {
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
      expect(response.body.message).toEqual('branchId must be an integer');
    });

    it('should fail if fields are missing', async () => {
      const response = await request
        .put('/users/profile/branch')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send({});

      const expectedMessage = 'The following fields are missing: branchId';

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

    it('should respond with an error message if an error occurs', async () => {
      const err = new Error('Not working');
      Staff.update = jest.fn(() => Promise.reject(err));
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
