import mongoose from 'mongoose';
import { MONGODB_URI } from '../config/server-config.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB connected successfully');

    // Check if the index exists before creating it
    const eventCollection = mongoose.connection.collection('events');
    const userCollection = mongoose.connection.collection('users');

    // Check if index exists for 'attendees'
    const attendeesIndexExists = await eventCollection.indexExists('attendees_1');
    if (!attendeesIndexExists) {
      await eventCollection.createIndex({ attendees: 1 });
      console.log('Index on attendees created.');
    }

    // Check if index exists for 'organizer'
    const organizerIndexExists = await eventCollection.indexExists('organizer_1');
    if (!organizerIndexExists) {
      await eventCollection.createIndex({ organizer: 1 });
      console.log('Index on organizer created.');
    }

    // Check if index exists for 'email' in user collection
    const emailIndexExists = await userCollection.indexExists('email_1');
    if (!emailIndexExists) {
      await userCollection.createIndex({ email: 1 });
      console.log('Index on email created.');
    }

  } catch (error) {
    console.log('Something went wrong in connecting to DB or creating indexes', error);
  }
};
