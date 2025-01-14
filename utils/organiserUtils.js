export const checkUserAccess = (currentUserId, userId, userRole) => {
    if (currentUserId === userId || userRole === 'organiser') {
      return true; // Access allowed
    }
    return false; // Access denied
  };
  