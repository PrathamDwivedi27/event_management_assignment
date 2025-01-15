import * as chai from 'chai';
import request from 'supertest';
import { app } from '../src/index.js';

const { expect } = chai;

describe('Analytics Routes', () => {
  
  describe('GET /api/v1/analytics/events/popular', () => {
    it('should successfully fetch popular events', async () => {
      const res = await request(app)
        .get('/api/v1/analytics/events/popular');

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('success', true);
      expect(res.body).to.have.property('data').that.is.an('array');
      expect(res.body).to.have.property('message', 'Popular events fetched successfully'); 
      
      if (res.body.data.length > 0) {
        const event = res.body.data[0];
        expect(event).to.have.property('_id'); 
        expect(event).to.have.property('name'); 
        expect(event).to.have.property('attendees').that.is.an('array'); 
        expect(event.attendees.length).to.be.at.least(1);
      }
    });

    

    
  });
});
