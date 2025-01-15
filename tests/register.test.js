import * as chai from 'chai';
import request from 'supertest';
import { app } from '../src/index.js';

const { expect } = chai;

describe('User Routes', () => {
  
  describe('POST /api/v1/users/register', () => {
    it('should register a new user successfully with valid data', async () => {
      const res = await request(app)
        .post('/api/v1/users/register')
        .send({
          name: 'John Doe',
          email: 'xyj@gmail.com', // Use a unique email for testing
          password: 'securepassword123',
          role: 'user',
        });

      expect(res.status).to.equal(202); 
      expect(res.body).to.have.property('message', 'Verified token');
    });
  });
});


describe('User Routes', () => {
  
  describe('POST /api/v1/users/register', () => {
    it('should return user already registered', async () => {
      const res = await request(app)
        .post('/api/v1/users/register') 
        .send({
          name: 'John Doe',
          email: 'xyz@gmail.com', // Use a unique email for testing
          password: 'securepassword123',
          role: 'user', 
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message', 'User already exists'); 
    });
  });
});

