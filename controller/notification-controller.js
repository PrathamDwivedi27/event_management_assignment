import userModel from '../model/user-model.js';
import eventModel from '../model/event-model.js';
import nodemailer from "nodemailer";
import { APP_PASS,SENDER_EMAIL } from "../config/server-config.js";


// Function to send email
const sendEventEmail = async (email, name, eventName, message) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: SENDER_EMAIL,
      pass: APP_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: SENDER_EMAIL,
    to: email,
    subject: `Notification for ${eventName}`,
    html: `
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Notification for ${eventName}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
            }
            .header {
              background-color: #1E90FF; /* Light Blue */
              color: #ffffff;
              padding: 20px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .content {
              padding: 20px;
              font-size: 16px;
              line-height: 1.6;
              color: #333;
            }
            .cta {
              background-color: #1E90FF; /* Light Blue */
              color: white;
              text-align: center;
              padding: 15px;
              border-radius: 5px;
              margin-top: 20px;
            }
            .cta a {
              color: white;
              text-decoration: none;
              font-weight: bold;
            }
            .footer {
              text-align: center;
              font-size: 12px;
              color: #888;
              margin-top: 30px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              ${eventName}
            </div>
            <div class="content">
              <p>Dear ${name},</p>
              <p>We have an important update regarding <strong>${eventName}</strong>:</p>
              <p>${message}</p>
              <p>If you need any assistance, feel free to reach out to our support team.</p>
            </div>
            <div class="footer">
              <p>Thank you for being part of ${eventName}. We look forward to seeing you there!</p>
            </div>
          </div>
        </body>
      </html>
    `,
  });

  return info;
};

// Controller to send event notifications
const sendEventNotifications = async (req, res) => {
  const { event_id, message } = req.body; // event_id and message from request body

  if (!event_id || !message) {
    return res.status(400).json({ error: 'Event ID and message are required' });
  }

  try {
    // Fetch the event
    const event = await eventModel.findById(event_id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Fetch attendees (assuming 'attendees' is an array of userIds)
    const attendees = await userModel.find({
      _id: { $in: event.attendees }, // Query for users whose ID is in the attendees array
    });

    if (attendees.length === 0) {
      return res.status(404).json({ error: 'No attendees found for this event' });
    }

    // Send the email to each attendee
    const emailPromises = attendees.map((attendee) => {
      return sendEventEmail(attendee.email, attendee.name, event.name, message);
    });

    // Wait for all emails to be sent
    await Promise.all(emailPromises);

    res.status(200).json({
      message: 'Notifications sent to all attendees',
      success: true
    });
  } catch (error) {
    console.error('Error sending event notifications:', error);
    res.status(500).json({
      error: 'Failed to send notifications',
      success: false
    });
  }
};

export default sendEventNotifications;
