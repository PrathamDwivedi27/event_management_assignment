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
                overflow-y: auto; /* Allow scrolling */
            }
            h1 {
                color: #4CAF50;
                font-size: 3em;
                margin-bottom: 20px;
            }
            p {
                font-size: 1.2em;
                margin: 10px 0;
                color: #555;
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
                overflow: hidden;
                transition: all 0.3s ease-in-out;
                color: #333; /* Ensure text is visible */
                max-height: 70vh; /* Limit height of the endpoints section */
                overflow-y: auto; /* Allow scrolling in endpoints */
            }
            .endpoints:hover {
                box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
                transform: scale(1.02);
            }
            .endpoints h2 {
                color: #2196F3;
                margin-bottom: 10px;
                font-size: 1.8em;
                font-weight: bold;
            }
            .endpoints ul {
                list-style-type: none;
                padding-left: 0;
            }
            .endpoints li {
                padding: 12px;
                margin: 8px 0;
                background-color: #f9f9f9;
                border-radius: 6px;
                transition: background-color 0.3s ease, transform 0.2s ease;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .endpoints li:hover {
                background-color: #eef2f7;
                transform: translateX(10px);
            }
            .endpoints li span {
                color: #333;
                font-size: 1.1em;
                font-weight: bold;
            }
            .endpoints li p {
                font-size: 1em;
                color: #777;
                margin: 0;
            }
            .code {
                
                color: white;
                padding: 5px 10px;
                border-radius: 4px;
                font-family: monospace;
                font-size: 1.1em;
            }
            .icon {
                margin-right: 10px;
                font-size: 1.2em;
                color: #2196F3;
            }
            .endpoints li a {
                text-decoration: none;
                color: #2196F3;
                font-size: 1.1em;
                font-weight: bold;
            }
            .endpoints li a:hover {
                text-decoration: underline;
            }
        </style>
    </head>
    <body>
        <h1>Welcome to the Event Management System API!</h1>
        <p>Our Event Management System backend APIs are up and running smoothly. Explore various routes to manage events, users, notifications, and more!</p>
        
        <div class="endpoints">
            <h2>Available Endpoints:</h2>
            <ul>
                <li>
                    <span class="icon">🏠</span><span class="code">GET /</span>
                    <p>Home endpoint, returns a welcome message.</p>
                </li>
                <li>
                    <span class="icon">📝</span><span class="code">POST /api/v1/users/register</span>
                    <p>Register a new user.</p>
                </li>
                <li>
                    <span class="icon">🔑</span><span class="code">POST /api/v1/users/login</span>
                    <p>Login an existing user.</p>
                </li>
                <li>
                    <span class="icon">👤</span><span class="code">GET /api/v1/users/:id</span>
                    <p>Get user profile data.</p>
                </li>
                <li>
                    <span class="icon">✏️</span><span class="code">PUT /api/v1/users/:id</span>
                    <p>Update user data.</p>
                </li>
                <li>
                    <span class="icon">🎉</span><span class="code">POST /api/v1/events</span>
                    <p>Create a new event.</p>
                </li>
                <li>
                    <span class="icon">📅</span><span class="code">GET /api/v1/events</span>
                    <p>Get all events.</p>
                </li>
                <li>
                    <span class="icon">🔍</span><span class="code">GET /api/v1/events/:id</span>
                    <p>Get a specific event by ID.</p>
                </li>
                <li>
                    <span class="icon">✏️</span><span class="code">PUT /api/v1/events/:id</span>
                    <p>Update an event's details.</p>
                </li>
                <li>
                    <span class="icon">❌</span><span class="code">DELETE /api/v1/events/:id</span>
                    <p>Delete an event.</p>
                </li>
                <li>
                    <span class="icon">📝</span><span class="code">POST /api/v1/events/:id/register</span>
                    <p>Register for the event.</p>
                </li>
                <li>
                    <span class="icon">❌</span><span class="code">DELETE /api/v1/events/:id/register</span>
                    <p>Cancel registration.</p>
                </li>
                <li>
                    <span class="icon">👥</span><span class="code">GET /api/v1/events/:id/attendees</span>
                    <p>Get all attendees of that event.</p>
                </li>
                <li>
                    <span class="icon">📊</span><span class="code">GET /api/v1/analytics/event/popular</span>
                    <p>Get popular events analytics.</p>
                </li>
                <li>
                    <span class="icon">👥</span><span class="code">GET /api/v1/analytics/users/active</span>
                    <p>Get all active users.</p>
                </li>
                <li>
                    <span class="icon">📈</span><span class="code">GET /api/v1/analytics/events/:id/stats</span>
                    <p>Get event analytics.</p>
                </li>
                <li>
                    <span class="icon">📲</span><span class="code">POST /api/v1/notifications/send</span>
                    <p>Send a notification.</p>
                </li>
                <li>
                    <span class="icon">👨‍💻</span><span class="code">GET /api/v1/admin/events</span>
                    <p>Get all events for admin.</p>
                </li>
                <li>
                    <span class="icon">👨‍💻</span><span class="code">GET /api/v1/admin/users</span>
                    <p>Get all users for admin.</p>
                </li>
                <li>
                    <span class="icon">🚮</span><span class="code">GET /api/v1/admin/users/:id</span>
                    <p>Soft delete the user and all its registrations.</p>
                </li>
            </ul>
        </div>
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