import supertest from 'supertest';
import http from 'http';
import app from '../../../app';
import { supervisorHash, bsmHash, noClaimHash } from '../testUtils';

jest.mock('@sendgrid/mail');

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
    let token1;
    let token2;
    let token3;

    beforeAll(async () => {
      // verify line manager
      const response1 = await request.get(`/line-manager/verify?hash=${supervisorHash}`);
      token1 = response1.header['set-cookie'];

      const response2 = await request.get(`/line-manager/verify?hash=${bsmHash}`);
      token2 = response2.header['set-cookie'];

      const response3 = await request.get(`/line-manager/verify?hash=${noClaimHash}`);
      token3 = response3.header['set-cookie'];
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should get claims awaiting the line manager\'s (supervisor) approval.', async () => {
      const response = await request.get('/line-manager/claims/pending').set('cookie', token1);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('You have 3 claims to approve.');
      expect(response.body.data[0].staffFirstName).toEqual('Gamolly');
      expect(response.body.data[1].staffFirstName).toEqual('Ligamala');
    });

    it('should get claims awaiting the line manager\'s (BSM) approval.', async () => {
      const response = await request.get('/line-manager/claims/pending').set('cookie', token2);
      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('You have 1 claims to approve.');
      expect(response.body.data[0].staffFirstName).toEqual('Mercy');
    });

    it('should return 404 if there are no claims for line manager to approve .', async () => {
      const response = await request.get('/line-manager/claims/pending').set('cookie', token3);

      expect(response.status).toBe(404);
      expect(response.body.message).toEqual('You currently have no pending claims to approve.');
    });

    it('should fail if line manager is unauthorised.', async () => {
      const response = await request.get('/line-manager/claims/pending');
      const errorToLineManager = `Your request was unauthorised.${
        ''
      } Be sure to have clicked the button in the email you recieved.`;

      expect(response.status).toBe(401);
      expect(response.body.message).toEqual(errorToLineManager);
    });
  });
});
