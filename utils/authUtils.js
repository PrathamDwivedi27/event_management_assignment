export const checkUserAccess = (currentUserId, userId, userRole) => {
    if (currentUserId === userId || userRole === 'admin') {
      return true; // Access allowed
    }
    return false; // Access denied
  };
  