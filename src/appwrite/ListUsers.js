// Import dotenv to load environment variables

import dotenv from "dotenv";
dotenv.config();

// Import the Appwrite SDK
import * as sdk from "node-appwrite";
import { Project_Id, appWriteEndPoint, mainProjectId } from "./appWriteConfig";

// Initialize the Appwrite client
const userclient = new sdk.Client();

// Set Appwrite API endpoint, project ID, and secret key
userclient
  .setEndpoint(appWriteEndPoint)
  .setProject(Project_Id)
  .setKey(mainProjectId);

// Initialize the Users service
const users = new sdk.Users(userclient);

// List users
const promise = users.list();

promise.then(
  function (response) {
    console.log(response); // Array of users
  },
  function (error) {
    console.log(error);
  }
);
