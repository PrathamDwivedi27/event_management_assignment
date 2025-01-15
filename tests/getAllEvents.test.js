import * as chai from 'chai';
import request from 'supertest';
import { app } from '../src/index.js';

const { expect } = chai;

describe('Event Routes - GET /api/v1/events', () => {

  it('should return all events', async () => {
    const res = await request(app)
      .get('/api/v1/events')
      .set('Authorization', 'Bearer validToken');

    expect(res.status).to.equal(200); 
    expect(res.body).to.have.property('data'); 
    expect(res.body.data).to.be.an('array');
    expect(res.body.data.length).to.be.greaterThan(0);
  });

  
});
