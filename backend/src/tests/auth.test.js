const request = require('supertest');
const app = require('../server');
const { User, Wallet } = require('../models');
const { sequelize } = require('../models');

describe('Auth API', () => {
  beforeAll(async () => {
    // Connect to test database and sync models
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    // Close database connection
    await sequelize.close();
  });

  beforeEach(async () => {
    // Clear the database before each test
    await User.destroy({ where: {}, force: true });
    await Wallet.destroy({ where: {}, force: true });
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const userData = {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'Test@123',
        confirmPassword: 'Test@123',
        phone: '1234567890'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      // Check response structure
      expect(response.body).toHaveProperty('status', 'success');
      expect(response.body).toHaveProperty('message', 'User registered successfully');
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('user');
      expect(response.body.data).toHaveProperty('token');
      expect(response.body.data).toHaveProperty('refreshToken');
      
      // Check user data
      expect(response.body.data.user).toHaveProperty('id');
      expect(response.body.data.user).toHaveProperty('firstName', userData.firstName);
      expect(response.body.data.user).toHaveProperty('lastName', userData.lastName);
      expect(response.body.data.user).toHaveProperty('email', userData.email);
      
      // Verify user was created in database
      const user = await User.findOne({ where: { email: userData.email } });
      expect(user).not.toBeNull();
      
      // Verify wallet was created for the user
      const wallet = await Wallet.findOne({ where: { userId: user.id } });
      expect(wallet).not.toBeNull();
    });

    it('should return validation error for invalid input', async () => {
      const userData = {
        firstName: 'T', // Too short
        lastName: 'User',
        email: 'invalid-email', // Invalid email format
        password: '123', // Too short
        confirmPassword: '1234', // Doesn't match password
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);

      // Check response structure for validation errors
      expect(response.body).toHaveProperty('status', 'error');
      expect(response.body).toHaveProperty('message', 'Validation Error');
      expect(response.body).toHaveProperty('errors');
      expect(Array.isArray(response.body.errors)).toBeTruthy();
    });

    it('should not allow duplicate email registration', async () => {
      // First create a user
      await User.create({
        firstName: 'Existing',
        lastName: 'User',
        email: 'existing@example.com',
        password: 'Existing@123'
      });

      // Try to register with the same email
      const userData = {
        firstName: 'Another',
        lastName: 'User',
        email: 'existing@example.com', // Same email
        password: 'Another@123',
        confirmPassword: 'Another@123'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(409);

      expect(response.body).toHaveProperty('status', 'error');
      expect(response.body).toHaveProperty('message', 'User with this email already exists');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      // Create a test user for login tests
      await User.create({
        firstName: 'Login',
        lastName: 'Test',
        email: 'login@example.com',
        password: 'Login@123', // This will be hashed by User model hooks
        isActive: true
      });
    });

    it('should login a valid user', async () => {
      const loginData = {
        email: 'login@example.com',
        password: 'Login@123'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(200);

      // Check response structure
      expect(response.body).toHaveProperty('status', 'success');
      expect(response.body).toHaveProperty('message', 'Login successful');
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('user');
      expect(response.body.data).toHaveProperty('token');
      expect(response.body.data).toHaveProperty('refreshToken');
      
      // Check user data
      expect(response.body.data.user).toHaveProperty('id');
      expect(response.body.data.user).toHaveProperty('email', loginData.email);
    });

    it('should return error for invalid credentials', async () => {
      const loginData = {
        email: 'login@example.com',
        password: 'WrongPassword'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(401);

      expect(response.body).toHaveProperty('status', 'error');
      expect(response.body).toHaveProperty('message', 'Invalid email or password');
    });

    it('should return error for non-existent user', async () => {
      const loginData = {
        email: 'nonexistent@example.com',
        password: 'SomePassword'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(401);

      expect(response.body).toHaveProperty('status', 'error');
      expect(response.body).toHaveProperty('message', 'Invalid email or password');
    });
  });

  describe('GET /api/auth/me', () => {
    let token;
    let userId;

    beforeEach(async () => {
      // Create a test user and get token for authenticated requests
      const user = await User.create({
        firstName: 'Profile',
        lastName: 'Test',
        email: 'profile@example.com',
        password: 'Profile@123',
        isActive: true
      });
      
      userId = user.id;

      // Login to get token
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'profile@example.com',
          password: 'Profile@123'
        });

      token = loginResponse.body.data.token;
    });

    it('should return user profile when authenticated', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body).toHaveProperty('status', 'success');
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('user');
      expect(response.body.data.user).toHaveProperty('id', userId);
      expect(response.body.data.user).toHaveProperty('firstName', 'Profile');
      expect(response.body.data.user).toHaveProperty('lastName', 'Test');
      expect(response.body.data.user).toHaveProperty('email', 'profile@example.com');
    });

    it('should return error when not authenticated', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .expect(401);

      expect(response.body).toHaveProperty('status', 'error');
      expect(response.body).toHaveProperty('message', 'No token provided');
    });

    it('should return error with invalid token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer invalidtoken')
        .expect(401);

      expect(response.body).toHaveProperty('status', 'error');
      expect(response.body).toHaveProperty('message', 'Invalid token');
    });
  });
}); 