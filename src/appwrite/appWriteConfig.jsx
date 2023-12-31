import {
  Client,
  Account,
  Databases,
  Avatars,
  Storage,
  Query,
  // Role,
  // Permission,
} from "appwrite";

const client = new Client();
export const account = new Account(client);
export const avatars = new Avatars(client);
export { ID } from "appwrite";
export const databases = new Databases(client);
export const storageBucket = new Storage(client);
export const query = new Query(client);

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_PROJECT_ID);

export const Collection_Id = import.meta.env.VITE_EVENT_COLLECTION_ID;
export const Database_Id = import.meta.env.VITE_EVENT_DATABASE_ID;
export const EventBucket_Id = import.meta.env.VITE_EVENT_BUCKET_ID;
export const FileOne = import.meta.env.VITE_FILE_ID_ONE;
export const Project_Id = import.meta.env.VITE_PROJECT_ID;
export const RsvpBucketID = import.meta.env.VITE_RSVP_BUCKET_ID;
export const rsvpDatabaseId = import.meta.env.VITE_RSVP_DATABASE_ID;
export const rsvpCollectionId = import.meta.env.VITE_RSVP_COLLECTION_ID;

// For Database

// // let promise = databases.createDocument(
// //   "657056f0aca31e9d59fe",
// //   "657a241d80b9089a0baf",
// //   { actorName: "Chris Evans", height: 183 },
// //   [
// //     Permission.read(Role.any()), // Anyone can view this document
// //     Permission.update(Role.any()), // Writers can update this document
// //     Permission.update(Role.any()), // Admins can update this document
// //     Permission.delete(Role.any()), // User 5c1f88b42259e can delete this document
// //     // Permission.delete(Role.team("admin")), // Admins can delete this document
// //   ]
// // );

// // promise.then(
// //   function (response) {
// //     console.log(response);
// //   },
// //   function (error) {
// //     console.log(error);
// //   }
// // );

// Paystack payments
export const PaystackPublic_Key = import.meta.env.VITE_PAYSTACK_SECRETE_KEY;
export const PaystackPrivate_Key = import.meta.env.VITE_PUBLIC_KEY;

// Strip payments
export const stripeSecrete_Key = import.meta.env.VITE_STRIPE_SECRETE_KEY;
export const stripePublic_Key = import.meta.env.VITE_PUBLISHABLE_KEY;
