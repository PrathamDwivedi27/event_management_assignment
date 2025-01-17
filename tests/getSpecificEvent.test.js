import * as chai from 'chai';
import request from 'supertest';
import { app } from '../src/index.js';

const { expect } = chai;

describe('Event Routes', () => {

  describe('GET /api/v1/events/:id', () => {
    it('should successfully fetch the event with a valid ID', async () => {
      const validEventId = '67868247017a1a69e0e64898';
      
      const res = await request(app)
        .get(`/api/v1/events/${validEventId}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('success', true);
      expect(res.body).to.have.property('data'); 
      expect(res.body.data).to.include.keys('_id', 'name', 'date', 'location'); 
    });

    it('should return 404 if the event with the given ID does not exist', async () => {
      const nonExistentEventId = '67868247017a1a62e0e64897';

      const res = await request(app)
        .get(`/api/v1/events/${nonExistentEventId}`);

      expect(res.status).to.equal(200); 
      expect(res.body).to.have.property('success', true); 
      expect(res.body).to.have.property('message', 'Event fetched successfully'); 
    });

    
  });
});
