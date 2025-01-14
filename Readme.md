# Event Management System

## API Documentation
This is API documentation which will give you a rough idea what different api endpoints are doing and which is expected input and output 
[View API Documentation](https://documenter.getpostman.com/view/39632752/2sAYQXpDfK)

## Overview

The **Event Management System** is designed to provide a seamless solution for creating, managing, and attending events. The application is built with **Node.js**, **Express**, **MongoDB**, and **JWT authentication**, ensuring a robust and scalable platform for event organizers and participants. This system supports user registration, role-based access, event registration, analytics, notifications, and more.

---

## Folder Structre
```

Event Management System
│
├── config
│   ├── db.js                # Database initialization
│   └── server-config.js     # Environment variables setup
│
├── controller
│   ├── admin-controller.js  # Admin-related APIs
│   ├── event-controller.js  # Event-related APIs
│   ├── user-controller.js   # User-related APIs
│   └── notification-controller.js  # Notification-related APIs
│
├── middleware
│   ├── auth-middleware.js   # Authentication middleware
│   └── check-admin.js       # Admin check middleware
│
├── model
│   ├── user-model.js        # User model schema
│   └── event-model.js       # Event model schema
│
├── repository
│   ├── user-repository.js   # User repository for DB interaction
│   └── event-repository.js  # Event repository for DB interaction
│
├── routes
│   ├── index.js             # Main routes file
│   └── v1
│       ├── userRoutes.js    # User-related routes
│       ├── eventRoutes.js   # Event-related routes
│       ├── analyticsRoutes.js  # Analytics-related routes
│       ├── notificationRoutes.js  # Notification-related routes
│       └── adminRoutes.js   # Admin-related routes
│
├── service
│   ├── user-service.js      # Business logic for users
│   └── event-service.js     # Business logic for events
│
├── src
│   └── index.js             # Main file to initialize the server
│
├── utils
│   └── authUtils.js         # Utility functions for authentication
│
├── .env                     # Environment variables
├── .env.example             # Example environment variables file
├── .gitignore               # Git ignore rules
├── package.json             # Project dependencies and scripts
├── package-lock.json        # Lock file for package dependencies
└── readme.md                # Project documentation (this file)

```
## Features

### 1. **Authentication and Authorization**

- **JWT Authentication**: Secure access to the system using JWT tokens. The authentication token is stored in the bearer header for every request requiring authentication.
- **Role-Based Access Control**: Three roles (`user`, `admin`, `organizer`) are implemented to differentiate access levels:
  - **user**: Can register for events and view their own details.
  - **admin**: Has full control over the system, including user and event management.
  - **organizer**: Can create, update, and delete events.

- **Soft Deletion**: Users and events can be logically deleted using the `isDeleted` field without permanently removing data.

### 2. **Event Management**

- **Event Creation**: Organizers can create events by providing details like name, description, date, location, and capacity.
- **Event Update**: Only the event organizer can update event details.
- **Event Deletion**: Only the event organizer can delete their event (soft deletion).
- **Event Registration**: Users can register for events, and event organizers can manage their attendee lists.

### 3. **Admin APIs**

Admins can manage users and events efficiently with the following endpoints:
- **GET /admin/users**: Retrieve a list of all users with pagination (5 per page).
- **GET /admin/events**: Retrieve a list of all events along with registration statistics.
- **DELETE /admin/users/:id**: Soft delete a user and remove their registrations.

### 4. **Analytics APIs**

The system includes analytics endpoints to track event and user activities:
- **GET /analytics/events/popular**: List the top 5 most registered events.
- **GET /analytics/users/active**: List the top 5 most active users based on registrations.
- **GET /analytics/events/:id/stats**: Retrieve detailed stats for a specific event.

### 5. **Event Registration & Attendance**

Users can register for events, cancel their registration, and view event attendees:
- **POST /events/:id/register**: Register a user for an event.
- **DELETE /events/:id/register**: Cancel a user’s registration for an event.
- **GET /events/:id/attendees**: Retrieve a list of attendees for an event.

### 6. **Notifications**

Organizers can send notifications to all event attendees using **Nodemailer** and **App Password** via Gmail.

---

## Technologies Used

- **Backend**: 
  - **Node.js**: JavaScript runtime used for building the backend.
  - **Express.js**: Web framework for building RESTful APIs.
  - **MongoDB**: NoSQL database used to store event and user data.
  - **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
  
- **JWT Authentication**: Secure user authentication with JWT.
- **Nodemailer**: For sending notifications to event attendees.
- **Role-Based Access Control**: Implemented for different types of users (`user`, `admin`, `organizer`).
- **MongoDB Indexing**: Optimized for faster query execution with indexing on fields like `attendees`, `organizer`, and `email`.

---

## Project Structure

The project follows a layered architecture:

- **Controller**: Handles HTTP requests and responses.
- **Service**: Contains business logic.
- **Repository**: Direct interaction with the database.

---

## Setup Instructions

To get the project up and running locally, follow these steps:

### Prerequisites

- **Node.js** (v14 or later)
- **MongoDB**: You will need a running MongoDB instance.

### Steps

1. **Clone the repository**:
   ```terminal
   git clone https://github.com/your-username/event-management-system.git
   
2. **Install the dependencies**:
    ```terminal
    npm install

3. **Make your .env file**
   Copy the contents of .env.example from .env

   =>You have to make App password for your email to use nodemailer

4. **After completing .env file**
   ```terminal
   npm start

   
