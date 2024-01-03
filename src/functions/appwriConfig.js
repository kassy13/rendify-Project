// import {
//   Client,
//   Account,
//   Databases,
//   Avatars,
//   Storage,
//   Query,
//   Functions,
// } from "appwrite";

// const client = new Client();
// export const account = new Account(client);
// export const avatars = new Avatars(client);
// export { ID } from "appwrite";
// export const databases = new Databases(client);
// export const storageBucket = new Storage(client);
// export const query = new Query(client);
// export const appwriteFunction = new Functions(client);

// // client
// //   .setEndpoint(process.env.VITE_APPWRITE_ENDPOINT)
// //   .setProject(process.env.VITE_PROJECT_ID);

// // appwriConfig.js
// console.log("Before setEndpoint:", process.env.VITE_APPWRITE_ENDPOINT);

// client
//   .setEndpoint("https://cloud.appwrite.io/v1")
//   .setProject(process.env.VITE_PROJECT_ID);

// console.log("After setEndpoint:", client.config.endpoint);

// // ... rest of your code ...

export default async ({ req, res, log, error }) => {
  if (req.method === "GET") {
    return res.send("This was a GET request");
  }
  if (req.method === "POST") {
    return res.json({
      sentData: req.body,
      DOGENV: process.env.DOG_NAME,
      CATENV: process.env.CAT_NAME,
    });
  }
};
