import supertest from 'supertest';
import http from 'http';
import app from '../../../app';
import tenantsModels from '../../../application/database/tenantsModels';
import EmailNotifications from '../../../application/notifications/EmailNotifications';

const { Staff } = tenantsModels.INIT;

describe('Create Claim Tests', () => {
  let server;
  let request;

  beforeAll((done) => {
    server = http.createServer(app);
    server.listen(7000, done);
    request = supertest('http://init.overtime-api.example.com:7000');
  });

  beforeEach(() => jest.spyOn(EmailNotifications, 'sendEmail'));

  afterAll((done) => {
    server.close(done);
  });

  describe('RPC tests', () => {
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

    it('should fail if request contains unexpected props or is an empty request', async () => {
      const response = await request
        .post('/claim')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send({ weekend: 4 });

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('validationErrors');
      expect(response.body.errors[0]).toEqual('As an RPC, you can only apply for Shifts');
    });

    it('should fail if maximum number of shift days has been exceeded.', async () => {
      const response = await request
        .post('/claim')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send({ shift: 25 });

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('validationErrors');
      expect(response.body.errors[0]).toEqual('shift maximum value exceeded.');
    });
  });

  describe('NonRPC tests', () => {
    let token;

    beforeAll(async () => {
      // signin a user
      const response = await request
        .post('/signin')
        .send({ staffId: 'TN032375', password: 'password' })
        .set('Accept', 'application/json');

      token = response.header['set-cookie'];
    });

    it('should fail if request is empty', async () => {
      const response = await request
        .post('/claim')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('validationErrors');
      expect(response.body.errors[0]).toEqual('request cannot be empty');
    });

    it('should fail if request contains props different from weekday, weekend and atm', async () => {
      const response = await request
        .post('/claim')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send({ weekday: 19, shift: 18 });

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('validationErrors');
      expect(response.body.errors[0]).toEqual('shift is not a recognised property');
    });

    it('should fail if weekend and atm are in the same request', async () => {
      const response = await request
        .post('/claim')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send({ weekend: 8, atm: 9 });

      const errorMessage = 'Your request can contain either Weekend or ATM shifts; not both.';

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('validationErrors');
      expect(response.body.errors[0]).toEqual(errorMessage);
    });

    it('should fail if props do not have values', async () => {
      const response = await request
        .post('/claim')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send({ weekend: '' });

      const errorMessage = 'Please enter a value for weekend.';

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('validationErrors');
      expect(response.body.errors[0]).toEqual(errorMessage);
    });

    it('should fail if the value of overtime props exceeds the maximum for the month', async () => {
      const response = await request
        .post('/claim')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send({ weekday: 25, weekend: 14 });

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('validationErrors');
      expect(response.body.errors.length).toEqual(2);
      expect(response.body.errors[0]).toEqual('weekday maximum value exceeded.');
      expect(response.body.errors[1]).toEqual('weekend maximum value exceeded.');
    });

    it('should successfully submit overtime request', async () => {
      const response = await request
        .post('/claim')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send({ weekday: 20, weekend: 8 });

      expect(response.status).toBe(201);
      expect(response.body.message).toEqual('Your claim request was created successfully.');
    });

    it('should send a conflict error if staff already created claim', async () => {
      const response = await request
        .post('/claim')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send({ weekday: 20, weekend: 8 });

      const message = `You have already submitted a claim request for ${
        response ? '' : '' // just a hack to avoid eslint error
      }Jan, 2019. If you wish to make changes, please edit your submission.`;

      expect(response.status).toBe(409);
      expect(response.body.message).toEqual(message);
    });

    it('should send an error message if an error occurs', async () => {
      const err = new Error('Not working');
      jest.spyOn(Staff, 'findOne').mockRejectedValue(err);

      const response = await request
        .post('/claim')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send({ weekday: 20, weekend: 8 });

      expect(response.status).toBe(500);
      expect(response.body.message).toEqual(
        'There was a problem submitting your request ERR500CLMCRT'
      );
    });
  });
});
