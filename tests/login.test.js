import * as chai from 'chai';
import request from 'supertest';
import { app } from '../src/index.js';

const { expect } = chai;

describe('User Routes', () => {
  // Test for login
  describe('POST /api/v1/users/login', () => {
    it('should successfully log in the user', async () => {
      const res = await request(app)
        .post('/api/v1/users/login')
        .send({
          email: 'xyz@gmail.com', // Use an existing email for login
          password: 'securepassword123', // Use the correct password
        });

      expect(res.status).to.equal(200); // Status code for successful login
      expect(res.body).to.have.property('success', true); // Assert success property
      expect(res.body).to.have.property('token'); // Assert token exists in response
      expect(res.body).to.have.property('userId'); // Assert userId exists in response
      expect(res.body).to.have.property('data'); // Assert user data exists in response
      expect(res.body.data).to.include.keys('_id', 'name', 'email', 'role'); // Validate returned user data
    });
  });
});
