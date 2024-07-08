const request = require('supertest');
const app = require('../src/app');

describe('Register Endpoint', () => {
  it('should register user successfully with default organisation', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        phone: '1234567890'
      });

    expect(response.status).toBe(201);
    expect(response.body.status).toBe('success');
    expect(response.body.data.user.firstName).toBe('John');
    expect(response.body.data.organisation.name).toBe("John's Organisation");
  });

  it('should log the user in successfully', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'john.doe@example.com',
        password: 'password123'
      });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data.user.email).toBe('john.doe@example.com');
  });

  it('should fail if required fields are missing', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'missing.fields@example.com',
        password: 'password123'
      });

    expect(response.status).toBe(422);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: 'firstName' }),
        expect.objectContaining({ field: 'lastName' }),
        expect.objectContaining({ field: 'phone' }),
      ])
    );
  });

  it('should fail if there’s a duplicate email', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        phone: '1234567890'
      });

    expect(response.status).toBe(422);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ message: 'Email already in use' }),
      ])
    );
  });
});

describe('Token Generation', () => {
  const jwt = require('jsonwebtoken');
  const { authenticateToken } = require('../src/controllers/authController');

  it('should generate a token with correct user details', () => {
    const user = { id: 'userId123', email: 'test@example.com' };
    const token = authenticateToken(user);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    expect(decoded.userId).toBe(user.id);
    expect(decoded.email).toBe(user.email);
  });

  it('should generate a token that expires in 1 hour', () => {
    const user = { id: 'userId123', email: 'test@example.com' };
    const token = authenticateToken(user);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const expiresIn = decoded.exp - decoded.iat;
    expect(expiresIn).toBe(3600); // 1 hour = 3600 seconds
  });
});

describe('Organisation Access', () => {
  let token;

  beforeAll(() => {
    // Generate a token for a test user
    const user = { id: 'userId123', email: 'test@example.com' };
    token = authenticateToken(user);
  });

  it('should not allow users to see organisations they do not belong to', async () => {
    const response = await request(app)
      .get('/api/organisations/some-org-id')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Access denied');
  });
});
