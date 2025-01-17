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
          email: 'xyz@gmail.com',
          password: 'securepassword123', 
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('success', true); 
      expect(res.body).to.have.property('token');
      expect(res.body).to.have.property('userId'); 
      expect(res.body).to.have.property('data'); 
      expect(res.body.data).to.include.keys('_id', 'name', 'email', 'role'); 
    });
  });
});
