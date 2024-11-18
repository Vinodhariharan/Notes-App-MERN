const request = require('supertest');
const app = require('../server'); // Assuming you export your app from server.js
const mongoose = require('mongoose');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Auth Routes', () => {
  it('should register a new user', async () => {
    const res = await request(app).post('/api/auth/signup').send({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'testpassword',
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
  });

  it('should log in a user', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'testuser@example.com',
      password: 'testpassword',
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});
