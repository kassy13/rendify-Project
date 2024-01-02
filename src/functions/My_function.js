import express from "express";
import { appwriteFunction } from "../appwrite/appWriteConfig";

const expressApp = express(); // Use a different name for your Express app

expressApp.use(express.json());

expressApp.post("/notifications", async (req, res) => {
  try {
    // Your existing logic here
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// For other paths, return a 404
expressApp.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

export default expressApp;
