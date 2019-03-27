import supertest from 'supertest';
import http from 'http';
import app from '../app';

jest.mock('@sendgrid/mail', () => () => ({
  setApiKey: () => {},
  send: () => {}
}));

describe('Initial test', () => {
  let server;
  let request;

  beforeAll((done) => {
    server = http.createServer(app);
    server.listen(done);
    request = supertest(server);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('returns "Project started"', async () => {
    const response = await request.get('/');
    expect(response.body.message).toBe('Project started');
  });
});
