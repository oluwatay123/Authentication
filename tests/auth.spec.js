const request = require('supertest');
const app = require('../server'); // Adjust the path as per your project structure
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

describe('Auth Endpoints', () => {
  let server;

  beforeAll(() => {
    server = app.listen(3000, () => console.log('Test server running on port 3000'));
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should register user successfully with default organisation', async () => {
    const res = await request(server)
      .post('/auth/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        phone: '1234567890'
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('accessToken');
    expect(res.body.data.user.firstName).toEqual('John');
    expect(res.body.data.user.lastName).toEqual('Doe');
    expect(res.body.data.user.email).toEqual('john.doe@example.com');
    expect(res.body.data.user.phone).toEqual('1234567890');
  });

  it('should log the user in successfully', async () => {
    const res = await request(server)
      .post('/auth/login')
      .send({
        email: 'john.doe@example.com',
        password: 'password123'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('accessToken');
    expect(res.body.data.user.email).toEqual('john.doe@example.com');
  });

  it('should fail if required fields are missing', async () => {
    const res = await request(server)
      .post('/auth/register')
      .send({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: ''
      });

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: 'firstName', message: 'First name is required' }),
        expect.objectContaining({ field: 'lastName', message: 'Last name is required' }),
        expect.objectContaining({ field: 'email', message: 'Email is required' }),
        expect.objectContaining({ field: 'password', message: 'Password is required' })
      ])
    );
  });

  it('should fail if there is duplicate email or userID', async () => {
    // Register first user
    await request(server)
      .post('/auth/register')
      .send({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        password: 'password123',
        phone: '1234567890'
      });

    // Try to register another user with the same email
    const res = await request(server)
      .post('/auth/register')
      .send({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        password: 'password123',
        phone: '0987654321'
      });

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: 'email', message: 'Email already exists' })
      ])
    );
  });
});
