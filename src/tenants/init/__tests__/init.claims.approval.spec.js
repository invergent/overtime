import supertest from 'supertest';
import http from 'http';
import app from '../../../app';
import { supervisorHash, bsmHash } from './testUtils';
import services from '../../../application/services';

const { ClaimService } = services;

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

  describe('Approve Claim', () => {
    let supervisorToken;
    let bsmToken;

    beforeAll(async () => {
      // verify line manager
      const supervisorVerificationResponse = await request.get(`/verify?hash=${supervisorHash}`);
      supervisorToken = supervisorVerificationResponse.header['set-cookie'];

      const bsmVerificationResponse = await request.get(`/verify?hash=${bsmHash}`);
      bsmToken = bsmVerificationResponse.header['set-cookie'];
    });

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
      const response = await request.get('/line-manager/claims/pending/2/approve').set('cookie', supervisorToken);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Claim approved.');
      expect(response.body.data.approvalBySupervisor).toEqual('Approved');
    });

    it('should send a non-approval message if approval was not updated on the DB.', async () => {
      jest.spyOn(ClaimService, 'approveClaim').mockResolvedValue([false, ['claim']]);

      const response = await request.get('/line-manager/claims/pending/1/approve').set('cookie', bsmToken);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Claim not approved.');
    });
  });

  describe('Decline Claim', () => {
    let bsmToken;

    beforeAll(async () => {
      const bsmVerificationResponse = await request.get(`/verify?hash=${bsmHash}`);
      bsmToken = bsmVerificationResponse.header['set-cookie'];
    });

    afterEach(() => {
      jest.resetAllMocks();
      jest.clearAllMocks();
    });

    it('should decline claim.', async () => {
      const response = await request.get('/line-manager/claims/pending/1/decline').set('cookie', bsmToken);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Claim declined.');
      expect(response.body.data.approvalByBSM).toEqual('Declined');
    });
  });
});
