const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

let token;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Register and log in to get a token for authenticated requests
  const res = await request(app).post('/api/auth/signup').send({
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'testpassword',
  });
  token = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Notes Routes', () => {
  it('should create a new note', async () => {
    const res = await request(app)
      .post('/api/notes')
      .set('x-auth-token', token)
      .send({
        title: 'Test Note',
        content: 'This is a test note.',
        category: 'Test Category',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('should fetch all notes', async () => {
    const res = await request(app)
      .get('/api/notes')
      .set('x-auth-token', token);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
