import supertest from 'supertest';
import http from 'http';
import cloudinary from 'cloudinary';
import app from '../../../app';

jest.mock('@sendgrid/mail');

describe('Image upload', () => {
  let server;
  let request;
  let token;

  beforeAll((done) => {
    server = http.createServer(app);
    server.listen(7000, done);
    request = supertest('http://init.overtime-api.example.com:7000');
  });

  afterAll((done) => {
    server.close(done);
  });

  describe('Uploading profile image.', () => {
    beforeAll(async () => {
      // signin a user
      const response = await request
        .post('/signin')
        .send({ staffId: 'TN098432', password: 'password' })
        .set('Accept', 'application/json');

      token = response.header['set-cookie'];
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should fail if image field is not provided.', async () => {
      const response = await request
        .post('/users/profile/image')
        .set('Content-Type', 'multipart/form-data')
        .attach('someField', `${__dirname}/testFiles/flower.jpg`, 'flower.jpg')
        .set('cookie', token);

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('The following fields are missing: image');
    });

    it('should fail if file extension is not an image extension.', async () => {
      const response = await request
        .post('/users/profile/image')
        .set('Content-Type', 'multipart/form-data')
        .attach('image', `${__dirname}/testFiles/flower.jpg`, 'flower.else')
        .set('cookie', token);

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('validationErrors');
      expect(response.body.errors[0]).toEqual('file type must be .jpg, .jpeg, .png or .svg');
    });

    it('should successfully upload image file.', async () => {
      const mockCloundinaryResponse = { url: 'url', secure_url: 'url' };
      jest.spyOn(cloudinary.v2.uploader, 'upload').mockResolvedValue(mockCloundinaryResponse);
      const response = await request
        .post('/users/profile/image')
        .set('Content-Type', 'multipart/form-data')
        .attach('image', `${__dirname}/testFiles/flower.jpg`, 'flower.jpg')
        .set('cookie', token);

      expect(response.status).toBe(201);
      expect(response.body.message).toEqual('Image upload successful.');
      expect(response.body.data).toHaveProperty('url');
      expect(response.body.data).toHaveProperty('secureUrl');
    });

    it('should return a 500 error response if image upload fails.', async () => {
      jest.spyOn(cloudinary.v2.uploader, 'upload').mockRejectedValue('err');
      const response = await request
        .post('/users/profile/image')
        .set('Content-Type', 'multipart/form-data')
        .attach('image', `${__dirname}/testFiles/flower.jpg`, 'flower.jpg')
        .set('cookie', token);

      expect(response.status).toBe(500);
      expect(response.body.message).toEqual('An error occurred while uploading your image ERR500IMGUPL.');
    });
  });
});
