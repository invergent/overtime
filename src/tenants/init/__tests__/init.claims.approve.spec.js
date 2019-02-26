import supertest from 'supertest';
import http from 'http';
import app from '../../../app';
import { supervisorHash, bsmHash, noClaimHash } from './testUtils';
import services from '../../../application/services';

const { ClaimService } = services;

describe('Claims Tests', () => {
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

  describe('pendingClaimsForlineManagers', () => {
    let token1;
    let token2;
    let token3;

    beforeAll(async () => {
      // verify line manager
      const response1 = await request.get(`/verify?hash=${supervisorHash}`);
      token1 = response1.header['set-cookie'];

      const response2 = await request.get(`/verify?hash=${bsmHash}`);
      token2 = response2.header['set-cookie'];

      const response3 = await request.get(`/verify?hash=${noClaimHash}`);
      token3 = response3.header['set-cookie'];
    });

    afterEach(() => {
      jest.resetAllMocks();
      jest.clearAllMocks();
    });

    it('should fail if claim is not amongst pending claims assigned to the line manager for approval.', async () => {
      const response = await request.get('/line-manager/claims/pending/1/approve').set('cookie', token1);

      expect(response.status).toBe(403);
      expect(response.body.message).toEqual('This claim is not on your pending list. Access denied.');
    });

    it('should approval approve claim.', async () => {
      const response = await request.get('/line-manager/claims/pending/4/approve').set('cookie', token1);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Claim approved.');
      expect(response.body.data.approvedBySupervisor).toEqual('Approved');
    });

    it('should send a non-approval message if approval was not updated on the DB.', async () => {
      jest.spyOn(ClaimService, 'approveClaim').mockResolvedValue([false, ['claim']]);

      const response = await request.get('/line-manager/claims/pending/2/approve').set('cookie', token1);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Claim not approved.');
    });
  });
});
