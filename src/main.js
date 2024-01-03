// import { Client } from "node-appwrite";

// // This is your Appwrite function
// // It's executed each time we get a request
// export default async ({ req, res, log, error }) => {
//   // Why not try the Appwrite SDK?
//   //
//   // const client = new Client()
//   //    .setEndpoint('https://cloud.appwrite.io/v1')
//   //    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
//   //    .setKey(process.env.APPWRITE_API_KEY);

//   // You can log messages to the console
//   log("Hello, Logs!");

//   // If something goes wrong, log an error
//   error("Hello, Errors!");

//   // The `req` object contains the request data
//   if (req.method === "GET") {
//     // Send a response with the res object helpers
//     // `res.send()` dispatches a string back to the client
//     return res.send("Hello, World!");
//   }

//   // `res.json()` is a handy helper for sending JSON
//   return res.json({
//     motto: "Build like a team of hundreds_",
//     learn: "https://appwrite.io/docs",
//     connect: "https://appwrite.io/discord",
//     getInspired: "https://builtwith.appwrite.io",
//   });
// };

// This is your Appwrite function
// It's executed each time we get a request
// export default async ({ req, res, log, error }) => {
//   // The `req` object contains the request data
//   if (req.method === "GET") {
//     return res.send("This was a GET method");
//   }
//   if (req.method === "POST") {
//     return res.json({
//       sentData: req.body,
//       DOGENV: import.meta.env.DOG_ENV,
//       CATENV: import.meta.env.CAT_ENV,
//     });
//   }
// };

// Grab the varibles
// const accountsid = import.meta.env.TWILIO_ACCOUNT_SID;
// const authToken = import.meta.env.TWILIO_AUTH_TOKEN;
// const senderPhone = import.meta.env.TWILIO_NUMBER;

// // Importing twilio
// const twilioClient = require("twilio")(accountsid, authToken);

// // Fetch input data
// const payload = JSON.parse(import.meta.APPWRITE_FUNCTION_DATA);
// const reciever = payload["receiver"];
// const message = payload["message"];

// if (!reciever) console.log("Recievers phone number is required");

// if (!message) console.log("Message content is required");

// // send message to receiver
// twilioClient.messages
//   .create({
//     from: senderPhone,
//     to: reciever,
//     body: message,
//   })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// process("dotenv").config({ path: ".env.development" });

import express from "express";
import { appwriteFunction } from "./functions/appwriConfig.js";
// import { appwriteFunction } from "./appwriConfig.js";

const expressApp = express(); // Use a different name for your Express app

expressApp.use(express.json());

expressApp.post("/notifications", async (req, res) => {
  try {
    // Extract data from the request body (customize this based on your needs)
    const { userId, eventName } = req.body;

    // Use Appwrite SDK to send notifications or perform any desired actions
    // Replace the following with your notification logic
    const notificationResponse = await appwriteFunction.createExecution(
      "sendNotifications", // Replace with your function ID
      JSON.stringify({ userId, eventName }),
      false,
      "/notifications",
      "POST"
    );
    res.status(200).json({
      message: "Notification sent successfully",
      response: notificationResponse,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// For other paths, return a 404
expressApp.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

const PORT = process.env.PORT || 3000;
expressApp.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default expressApp;
