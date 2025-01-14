import eventModel from "../model/event-model.js";

class EventRepository{
    constructor(){
        this.eventModel = eventModel;
    }

    async createEvent(data){
        try {
            const event=await this.eventModel.create(data);
            return event;
        } catch (error) {
            console.log('Something went wrong in event repo', error);
            throw error;
        }
    }
    async getEvents(){
        try {
            const events=await this.eventModel.find();
            return events;
        } catch (error) {
            console.log('Something went wrong in event repo', error);
            throw error;
        }
    }
    async getEvent(id){
        try {
            const event=await this.eventModel.findById(id).populate("organizer attendees", "name email");
            return event;
        } catch (error) {
            console.log('Something went wrong in event repo', error);
            throw error;
        }
    }
    async updateEvent(id,data){
        try {
            const event=await this.eventModel.findByIdAndUpdate(id,data,{new:true});
            return event;
        } catch (error) {
            console.log('Something went wrong in event repo', error);
            throw error;
        }
    }
    async deleteEvent(id){
        try {
            const event=await this.eventModel.findByIdAndDelete(id);
            return event;
        } catch (error) {
            console.log('Something went wrong in event repo', error);
            throw error;
        }
    }
    async save(event) {
        return await event.save();
    }
}

export default EventRepository;