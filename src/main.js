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
const accountsid = import.meta.env.TWILIO_ACCOUNT_SID;
const authToken = import.meta.env.TWILIO_AUTH_TOKEN;
const senderPhone = import.meta.env.TWILIO_NUMBER;

// Importing twilio
const twilioClient = require("twilio")(accountsid, authToken);

// Fetch input data
const payload = JSON.parse(import.meta.APPWRITE_FUNCTION_DATA);
const reciever = payload["receiver"];
const message = payload["message"];

if (!reciever) console.log("Recievers phone number is required");

if (!message) console.log("Message content is required");

// send message to receiver
twilioClient.messages
  .create({
    from: senderPhone,
    to: reciever,
    body: message,
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
