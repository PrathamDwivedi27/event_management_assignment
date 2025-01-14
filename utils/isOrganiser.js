// utils/isOrganizer.js
import userModel from "../model/user-model.js";

export const isOrganizer = async (userId) => {
  try {
    const user = await userModel.findById(userId);  // Assuming your user model has an "organizer" role.
    if (!user) throw new Error("User not found");
    
    // You can replace this with your actual role or permission check
    if (user.role !== "organiser") {
      return false;
    }
    return true;  // If the user is an organizer, return true
  } catch (error) {
    throw new Error("User is not an organizer: " + error.message);
  }
};
