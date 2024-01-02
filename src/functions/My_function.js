// process("dotenv").config({ path: ".env.development" });

import express from "express";
import { appwriteFunction } from "./appwriConfig.js";

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
