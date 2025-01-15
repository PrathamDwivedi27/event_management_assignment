import express from 'express';
import bodyParser from 'body-parser';
import { connectDB } from '../config/db.js';
import apiRoutes from "../routes/index.js";

// import { PORT } from '../config/server-config.js';

const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/api",apiRoutes);

app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Event Management System - API</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f9;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                color: #333;
                flex-direction: column;
                text-align: center;
            }
            h1 {
                color: #4CAF50;
                font-size: 3em;
                margin-bottom: 20px;
            }
            p {
                font-size: 1.2em;
                margin: 10px 0;
            }
            .endpoints {
                margin-top: 30px;
                padding: 20px;
                background-color: #fff;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                border-radius: 8px;
                width: 80%;
                max-width: 800px;
                text-align: left;
            }
            .endpoints h2 {
                color: #2196F3;
                margin-bottom: 10px;
            }
            .endpoints ul {
                list-style-type: none;
                padding-left: 0;
            }
            .endpoints li {
                padding: 8px;
                margin: 5px 0;
                background-color: #f9f9f9;
                border-radius: 4px;
                transition: background-color 0.3s ease;
            }
            .endpoints li:hover {
                background-color: #eef2f7;
            }
            .code {
                background-color: #333;
                color: #fff;
                padding: 5px;
                border-radius: 4px;
                font-family: monospace;
            }
        </style>
    </head>
    <body>
        <h1>Welcome to the Event Management System API!</h1>
        <p>Our API is up and running smoothly. You can access various routes to manage events, users, notifications, and more!</p>
        
        <div class="endpoints">
            <h2>Available Endpoints:</h2>
            <ul>
                <li><span class="code">GET /</span> - Home endpoint, returns a welcome message</li>
                <li><span class="code">POST /api/v1/users/register</span> - Register a new user</li>
                <li><span class="code">POST /api/v1/users/login</span> - Login an existing user</li>
                <li><span class="code">GET /api/v1/users/profile</span> - Get user profile data</li>
                <li><span class="code">POST /api/v1/events/create</span> - Create a new event</li>
                <li><span class="code">GET /api/v1/events</span> - Get all events</li>
                <li><span class="code">GET /api/v1/events/:id</span> - Get a specific event by ID</li>
                <li><span class="code">PUT /api/v1/events/:id</span> - Update an event's details</li>
                <li><span class="code">DELETE /api/v1/events/:id</span> - Delete an event</li>
                <li><span class="code">GET /api/v1/analytics/popular-events</span> - Get popular events analytics</li>
                <li><span class="code">POST /api/v1/notifications/send</span> - Send a notification</li>
                <li><span class="code">GET /api/v1/notifications</span> - Get all notifications</li>
                <li><span class="code">GET /api/v1/notifications/:id</span> - Get a specific notification</li>
                <li><span class="code">GET /api/v1/admin/stats</span> - Get admin dashboard stats</li>
            </ul>
        </div>
        
        <p>If you have any questions, please contact the API support team.</p>
    </body>
    </html>
    `);
});

  

connectDB();

export {app};
const PORT=3000;

function setup_and_start_server(){
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    })
}

setup_and_start_server();