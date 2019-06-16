import supertest from 'supertest';
import http from 'http';
import app from '../../../app';

jest.mock('@sendgrid/mail');

describe('Admin Claim Tests', () => {
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

  describe('Settings Integration tests', () => {
    let token;

    beforeAll(async () => {
      // signin a user
      const response = await request
        .post('/admin/login')
        .send({ email: 'theadmin@init.com', password: 'password' })
        .set('Accept', 'application/json');

      token = response.header['set-cookie'];
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should fail if cron time is not provided', async () => {
      const response = await request
        .put('/admin/settings/schedules')
        .send({})
        .set('cookie', token);

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('validationErrors');
    });

    it('should fail if specified emailSchedule has no value', async () => {
      const response = await request
        .put('/admin/settings/schedules')
        .send({ emailSchedule: '' })
        .set('cookie', token);

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('validationErrors');
      expect(response.body.errors[0]).toEqual('emailSchedule cron time setting is invalid.');
    });

    it('should fail if specified cron time is invalid', async () => {
      const response = await request
        .put('/admin/settings/schedules')
        .send({ emailSchedule: '* * * *' })
        .set('cookie', token);

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('validationErrors');
      expect(response.body.errors[0]).toEqual('emailSchedule cron time setting is invalid.');
    });

    it('should update the email schedule time for the requesting tenant', async () => {
      const scheduleRequest = { emailSchedule: '* * * * *' };
      const response = await request
        .put('/admin/settings/schedules')
        .send(scheduleRequest)
        .set('cookie', token);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Update successful!');
      expect(response.body.data[0].emailSchedule).toEqual(scheduleRequest.emailSchedule);
    });
  });
});
