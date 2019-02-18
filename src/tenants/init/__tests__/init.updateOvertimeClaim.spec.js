import supertest from 'supertest';
import http from 'http';
import app from '../../../app';
import models from '../models';

const { Claims } = models;

describe('Update Claim Submission Tests', () => {
  let server;
  let request;
  const claim = { weekday: 18, weekend: 5 };

  beforeAll((done) => {
    server = http.createServer(app);
    server.listen(7000, done);
    request = supertest('http://init.overtime-api.example.com:7000');
  });

  afterAll((done) => {
    server.close(done);
  });

  describe('Update Claim', () => {
    let token1;
    let token2;

    beforeAll(async () => {
      // signin user1
      const response = await request
        .post('/signin')
        .send({ staffId: 'TN032375', password: 'password' })
        .set('Accept', 'application/json');

      token1 = response.header['set-cookie'];

      // signin user2
      const response2 = await request
        .post('/signin')
        .send({ staffId: 'TN046455', password: 'password' })
        .set('Accept', 'application/json');

      token2 = response2.header['set-cookie'];
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should fail if claimId is invalid', async () => {
      const response = await request
        .put('/overtime/NaN')
        .set('cookie', token1)
        .set('Accept', 'application/json')
        .send(claim);

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('validationErrors');
      expect(response.body.errors[0]).toEqual('claimId must be an integer.');
    });

    it('should fail if claim does not exist', async () => {
      const response = await request
        .put('/overtime/10000')
        .set('cookie', token1)
        .set('Accept', 'application/json')
        .send(claim);

      expect(response.status).toBe(404);
      expect(response.body.message).toEqual('Claim does not exist.');
    });

    it('should fail if claim has already been approved.', async () => {
      const response = await request
        .put('/overtime/3')
        .set('cookie', token1)
        .set('Accept', 'application/json')
        .send(claim);

      const message = 'Claim has already been approved and cannot be edited.';

      expect(response.status).toBe(403);
      expect(response.body.message).toEqual(message);
    });

    it('should fail if user is unauthorised to edit claim.', async () => {
      const response = await request
        .put('/overtime/2')
        .set('cookie', token2)
        .set('Accept', 'application/json')
        .send(claim);

      expect(response.status).toBe(403);
      expect(response.body.message).toEqual('You do not have access to this claim.');
    });

    it('should successfully update claim.', async () => {
      const response = await request
        .put('/overtime/2')
        .set('cookie', token1)
        .set('Accept', 'application/json')
        .send(claim);

      const message = 'Claim updated successfully.';

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual(message);
    });

    it('should send a "not updated" message if update fails.', async () => {
      jest.spyOn(Claims, 'update').mockReturnValue([false, true]);

      const response = await request
        .put('/overtime/2')
        .set('cookie', token1)
        .set('Accept', 'application/json')
        .send(claim);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Claim not updated.');
    });

    it('should send an error message if an error occurs while updating.', async () => {
      const err = new Error('Not working');
      jest.spyOn(Claims, 'update').mockRejectedValue(err);

      const response = await request
        .put('/overtime/2')
        .set('cookie', token1)
        .set('Accept', 'application/json')
        .send(claim);

      const message = 'There was a problem submitting your request ERR500CLMUPD.';

      expect(response.status).toBe(500);
      expect(response.body.message).toEqual(message);
    });
  });
});
