import EventRepository from "../repository/event-repository.js";

class EventService {
  constructor() {
    this.eventRepository = new EventRepository();
  }

  async createEvent(data,userId) {
    try {
      const event = await this.eventRepository.createEvent({ ...data, organizer: userId });
      return event;
    } catch (error) {
      console.log(
        "Something went wrong in event creation in service layer",
        error
      );
      throw error;
    }
  }
  async getEvents() {
    try {
      const events = await this.eventRepository.getEvents();
      return events;
    } catch (error) {
      console.log(
        "Something went wrong in event creation in service layer",
        error
      );
      throw error;
    }
  }
  async getEvent(id) {
    try {
      const event = await this.eventRepository.getEvent(id);
      return event;
    } catch (error) {
      console.log(
        "Something went wrong in event creation in service layer",
        error
      );
      throw error;
    }
  }
  async updateEvent(id, data, currentUser) {
    try {
      const event = await this.eventRepository.getEvent(id);
    //   console.log(event);
    //   console.log(currentUser);
    //   console.log("ghjkl",event.organizer._id.toString());

      // Check if event exists
      if (!event) {
        throw new Error("Event not found");
      }

      // Check if the current user is the organizer of the event
      if (event.organizer._id.toString() !== currentUser.id) {
        throw new Error(
          "You must be the organizer of the event to make changes"
        );
      }
      const updatedEvent = await this.eventRepository.updateEvent(id, data);
      return updatedEvent;
    } catch (error) {
      console.log(
        "Something went wrong in event creation in service layer",
        error
      );
      throw error;
    }
  }
  async deleteEvent(id, currentUser) {
    try {
        const event = await this.eventRepository.getEvent(id);

        // Check if event exists
        if (!event) {
          throw new Error("Event not found");
        }
  
        // Check if the current user is the organizer of the event
        if (event.organizer._id.toString() !== currentUser.id) {
          throw new Error("You must be the organizer of the event to delete it");
        }
  
        // Delete the event
        const deletedEvent = await this.eventRepository.deleteEvent(id);
        return deletedEvent;
    } catch (error) {
      console.log(
        "Something went wrong in event creation in service layer",
        error
      );
      throw error;
    }
  }

  async registerEvent(eventId, userId) {
    try {
        const event = await this.eventRepository.getEvent(eventId);

        if (!event) throw new Error("Event not found");
        if (event.attendees.includes(userId)) throw new Error("User already registered");

        event.attendees.push(userId); 
        await this.eventRepository.save(event); 
        return event;
    } catch (error) {
        console.log(
          "Something went wrong in event registering event in service layer",error);
          throw error;
    }
  }

  async cancelRegistration(eventId, userId) {
    const event = await this.eventRepository.getEvent(eventId);
    if (!event) throw new Error("Event not found");
  
    // Convert attendees to strings for comparison
    const attendees = event.attendees.map((attendee) => attendee._id.toString());
    
    console.log(attendees);
    if (!attendees.includes(userId)) {
      throw new Error("User is not registered");
    }
  
    // if (attendees.includes(userId)) {
    //     throw new Error("User already registered");
    // }
    event.attendees = event.attendees.filter(
      (attendee) => attendee._id.toString() !== userId
    );
  
    // Save the updated event
    await this.eventRepository.save(event);
  
    return event;
  }
  

  async getEventAttendees(eventId) {
    const event = await this.eventRepository.getEvent(eventId);

    if (!event) throw new Error("Event not found");

    return event.attendees; 
  }

  async getEventsWithStats() {
    try {
      const events = await this.eventRepository.getAllEventsWithStats();
      return events;
    } catch (error) {
      console.error("Error in EventService while fetching events with stats:", error);
      throw error;
    }
  }
}

export default EventService;
