import supertest from 'supertest';
import http from 'http';
import app from '../../../app';
import { supervisorHash, bsmHash, noClaimHash } from './testUtils';

describe('Pending Claims Tests', () => {
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
    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should get claims awaiting the line manager\'s (supervisor) approval.', async () => {
      const response = await request.get(`/line-manager/claims/pending?hash=${supervisorHash}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('You have 3 claims to approve.');
      expect(response.body.data[0].staffFirstName).toEqual('Molly');
      expect(response.body.data[1].staffFirstName).toEqual('Mercy');
    });

    it('should get claims awaiting the line manager\'s (BSM) approval.', async () => {
      const response = await request.get(`/line-manager/claims/pending?hash=${bsmHash}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('You have 2 claims to approve.');
      expect(response.body.data[0].staffFirstName).toEqual('John');
      expect(response.body.data[1].staffFirstName).toEqual('Mercy');
    });

    it('should return 404 if there are no claims for line manager to approve .', async () => {
      const response = await request.get(`/line-manager/claims/pending?hash=${noClaimHash}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toEqual('You currently have no pending claims to approve.');
    });

    it('should fail if hash is not provided.', async () => {
      const response = await request.get('/line-manager/claims/pending');

      expect(response.status).toBe(401);
      expect(response.body.message).toEqual('Your request was unauthorised. Access denied.');
    });

    it('should fail if hash is invalid.', async () => {
      const response = await request.get('/line-manager/claims/pending?hash=invalid');

      expect(response.status).toBe(401);
      expect(response.body.message).toEqual('Authentication error ERRLMRAUTH.');
    });
  });
});
