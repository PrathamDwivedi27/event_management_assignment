import EventService from "../service/event-service.js";

const eventService=new EventService();

const createEvent=async (req,res)=>{
    try {
        const userId=req.user.id;
        const event=await eventService.createEvent(req.body,userId);
        res.status(201).json({
            message:"Event created successfully",
            data:event,
            success:true,
            err:{}
        })
    } catch (error) {
        console.log("Error in event controller",error);
        res.status(500).json({
            message:"Internal server error",
            err:error,
            data:{},
            success:false
        })
    }
}
const getEvents=async (req,res)=>{
    try {
        const events=await eventService.getEvents();
        res.status(200).json({
            message:"Events fetched successfully",
            data:events,
            success:true,
            err:{}
        })
    } catch (error) {
        console.log("Error in event controller",error);
        res.status(500).json({
            message:"Internal server error",
            err:error,
            data:{},
            success:false
        })
    }
}
const getEvent=async (req,res)=>{
    try {
        const {id}=req.params;
        const event=await eventService.getEvent(id);
        res.status(200).json({
            message:"Event fetched successfully",
            data:event,
            success:true,
            err:{}
        })
    } catch (error) {
        console.log("Error in event controller",error);
        res.status(500).json({
            message:"Internal server error",
            err:error,
            data:{},
            success:false
        })
    }
}
const updateEvent=async (req,res)=>{
    try {
        const {id}=req.params;
        const currentUser=req.user;
        const updatedEvent=await eventService.updateEvent(id,req.body,currentUser);
        res.status(200).json({
            message:"Event updated successfully",
            data:updatedEvent,
            success:true,
            err:{}
        })
    } catch (error) {
        console.log("Error in event controller",error);
        res.status(500).json({
            message:"Internal server error",
            err:error,
            data:{},
            success:false
        })
    }
}
const deleteEvent=async (req,res)=>{
    try {
        const {id}=req.params;
        const currentUser=req.user;
        const deletedEvent=await eventService.deleteEvent(id,currentUser);
        res.status(200).json({
            message:"Event deleted successfully",
            data:deletedEvent,
            success:true,
            err:{}
        })
    } catch (error) {
        console.log("Error in event controller",error);
        res.status(500).json({
            message:"Internal server error",
            err:error,
            data:{},
            success:false
        })
    }
}

const registerEvent = async (req, res) => {
    try {
      const userId = req.user.id; 
      const { id: eventId } = req.params;
      const result = await eventService.registerEvent(eventId, userId);
      res.status(200).json({
        message: "Registered successfully", 
        success: true, 
        data: result,
        err:{} 
    });
    } catch (error) {
      console.log("Error in event controller while registering for event",error);
      res.status(500).json({ 
        success: false, 
        message: error.message,
        data: {},
        err: error 
    });
    }
};
  
const cancelRegistration = async (req, res) => {
    try {
      const userId = req.user.id;
      console.log("userId",userId); 
      const { id: eventId } = req.params;
      const result = await eventService.cancelRegistration(eventId, userId);
      res.status(200).json({ 
        success: true,
        message: "Registration canceled", 
        data: result,
        err: {} 
    });
    } catch (error) {
      console.log("Error in event controller while canceling registration",error);
      res.status(500).json({ 
        success: false, 
        message: error.message,
        data: {},
        err: error 
    });
    }
};

const getEventAttendees = async (req, res) => {
    try {
      const { id: eventId } = req.params;
      const attendees = await eventService.getEventAttendees(eventId);
      res.status(200).json({ 
        success: true, 
        data: attendees,
        message: "Attendees fetched successfully",
        err: {} 
    });
    } catch (error) {
      console.log("Error in event controller while fetching attendees",error);
      res.status(500).json({ 
        success: false, 
        message: error.message ,
        data: {},
        err: error
    });
    }
}


export {
    createEvent,
    getEvents,
    getEvent,
    updateEvent,
    deleteEvent,
    registerEvent,
    cancelRegistration,
    getEventAttendees
}