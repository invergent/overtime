import http from 'http';
import jwt from 'jsonwebtoken';
import supertest from 'supertest';
import app from '../../../app';
import models from '../../../Application/Database/models';
import { tenantsInfo } from '../../../Application/Features/utilities/utils/general';
import EmailNotifications from '../../../Application/Features/utilities/notifications/EmailNotifications';

jest.mock('@sendgrid/mail');

const { LineManagers } = models;

const supervisorsDetails = {
  lineManagerRole: 'Supervisor',
  firstname: 'firstname',
  lastname: 'lastname',
  email: 'email@email.com'
};

const supervisorsIncorrectDetails = {
  lineManagerRole: 'Super',
  firstname: '   ',
  lastname: '   ',
  email: 'email'
};

tenantsInfo.INIT = { emailAddress: 'someEmailAddress' };

describe('INIT: Add or Change Line Manager', () => {
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

  describe('Supervisor tests', () => {
    let token;

    beforeAll(async () => {
      // signin a user
      const response = await request
        .post('/signin')
        .send({ staffId: 'TN098432', password: 'password' })
        .set('Accept', 'application/json');

      token = response.header['set-cookie'];
    });

    beforeEach(() => jest.spyOn(EmailNotifications, 'sender').mockImplementation(() => {}));

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should fail if staff is not logged in', async () => {
      const response = await request
        .post('/users/profile/line-manager')
        .set('Accept', 'application/json')
        .send(supervisorsDetails);

      expect(response.status).toBe(401);
      expect(response.body.message).toEqual('Please login first.');
    });

    it('should fail if field entries are incorrect', async () => {
      const response = await request
        .post('/users/profile/line-manager')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send(supervisorsIncorrectDetails);

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('validationErrors');
      expect(response.body.errors.length).toEqual(5);
    });

    it('should fail if fields are missing', async () => {
      const supervisor = { ...supervisorsDetails };
      delete supervisor.email;
      const response = await request
        .post('/users/profile/line-manager')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send(supervisor);

      const expectedMessage = 'The following fields are missing: email';

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(expectedMessage);
    });

    it('should add supervisor if supervisor does not already exist', async () => {
      const response = await request
        .post('/users/profile/line-manager')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send(supervisorsDetails);

      expect(response.status).toBe(201);
      expect(response.body.message).toEqual('Supervisor added successfully.');
    });

    it('should add BSM if BSM does not already exist', async () => {
      const bsm = {
        ...supervisorsDetails,
        email: 'newEmail@email.com',
        lineManagerRole: 'BSM'
      };
      const response = await request
        .post('/users/profile/line-manager')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send(bsm);

      expect(response.status).toBe(201);
      expect(response.body.message).toEqual('BSM added successfully.');
    });

    it('should update supervisor if supervisor already exists', async () => {
      const response = await request
        .post('/users/profile/line-manager')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send(supervisorsDetails);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Supervisor updated successfully.');
    });

    it('should update BSM if BSM already exists', async () => {
      const bsm = {
        ...supervisorsDetails,
        email: 'newEmail@email.com',
        lineManagerRole: 'BSM',
      };

      const response = await request
        .post('/users/profile/line-manager')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send(bsm);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('BSM updated successfully.');
    });

    it('should respond with an error message if an error occurs', async () => {
      const err = new Error('Not working');
      jest.spyOn(LineManagers, 'findOrCreate').mockRejectedValue(err);
      const response = await request
        .post('/users/profile/line-manager')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send(supervisorsDetails);

      expect(response.status).toBe(500);
      expect(response.body.message).toEqual('An error occured ERR500CNGLNM');
    });

    it('should respond with an error message if authentication fails', async () => {
      jwt.verify = jest.fn(() => { throw new Error(); });

      const response = await request
        .post('/users/profile/line-manager')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send(supervisorsDetails);

      expect(response.status).toBe(401);
      expect(response.body.message).toEqual('Authentication error ERRSTFAUTH.');
    });
  });
});
