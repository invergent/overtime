import supertest from 'supertest';
import http from 'http';
import app from '../../../app';
import { supervisorHash, bsmHash } from './testUtils';
import services from '../../../application/services';
import EmailNotifications from '../../../application/notifications/EmailNotifications';

describe('Claim Approval Tests', () => {
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

  describe('Supervisor Claim Approval', () => {
    let supervisorToken;

    beforeAll(async () => {
      // verify line manager
      const supervisorVerificationResponse = await request.get(`/verify?hash=${supervisorHash}`);
      supervisorToken = supervisorVerificationResponse.header['set-cookie'];
    });

    beforeEach(() => jest.spyOn(EmailNotifications, 'sendEmail'));

    afterEach(() => {
      jest.resetAllMocks();
      jest.clearAllMocks();
    });

    it('should fail if claim is not amongst pending claims assigned to the line manager for approval.', async () => {
      const response = await request.get('/line-manager/claims/pending/1/approve').set('cookie', supervisorToken);

      expect(response.status).toBe(403);
      expect(response.body.message).toEqual('This claim is not on your pending list. Access denied.');
    });

    it('should approve claim.', async () => {
      const response = await request.get('/line-manager/claims/pending/3/approve').set('cookie', supervisorToken);
      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Claim approved.');
      expect(response.body.data.status).toEqual('Awaiting BSM');
    });
  });

  describe('BSM Claim Approval', () => {
    let bsmToken;

    beforeAll(async () => {
      const bsmVerificationResponse = await request.get(`/verify?hash=${bsmHash}`);
      bsmToken = bsmVerificationResponse.header['set-cookie'];
    });

    beforeEach(() => jest.spyOn(EmailNotifications, 'sendEmail'));

    afterEach(() => {
      jest.resetAllMocks();
      jest.clearAllMocks();
    });

    it('should approve claim.', async () => {
      const response = await request.get('/line-manager/claims/pending/1/approve').set('cookie', bsmToken);
      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Claim approved.');
      expect(response.body.data.status).toEqual('Processing');
    });

    it('should decline claim.', async () => {
      const response = await request.get('/line-manager/claims/pending/2/decline').set('cookie', bsmToken);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Claim declined.');
      expect(response.body.data.status).toEqual('Declined');
    });
  });

  describe('Staff Claim Approval (Cancelled)', () => {
    let staffToken;
    let staffToken2;

    beforeAll(async () => {
      // signin a user
      const response = await request
        .post('/signin')
        .send({ staffId: 'TN074695', password: 'password' })
        .set('Accept', 'application/json');

      staffToken = response.header['set-cookie'];

      // signin a user
      const response2 = await request
        .post('/signin')
        .send({ staffId: 'TN075595', password: 'password' })
        .set('Accept', 'application/json');

      staffToken2 = response2.header['set-cookie'];
    });

    afterEach(() => {
      jest.resetAllMocks();
      jest.clearAllMocks();
    });

    it('should fail if claim does not exist.', async () => {
      const response = await request.delete('/users/claims/10000').set('cookie', staffToken2);
      expect(response.status).toBe(404);
      expect(response.body.message).toEqual('Claim does not exist.');
    });

    it('should fail if staff is unauthorised to access claim.', async () => {
      const response = await request.delete('/users/claims/7').set('cookie', staffToken2);
      expect(response.status).toBe(401);
      expect(response.body.message).toEqual('You do not have access to this claim.');
    });

    it('should cancel claim.', async () => {
      const response = await request.delete('/users/claims/7').set('cookie', staffToken);
      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Claim cancelled.');
      expect(response.body.data.status).toEqual('Cancelled');
    });

    it('Cancelling a claim in the processing stage should fail.', async () => {
      const response = await request.delete('/users/claims/8').set('cookie', staffToken2);
      expect(response.status).toBe(403);
      expect(response.body.message).toEqual('You cannot cancel a claim that is being processed.');
    });
  });
});
