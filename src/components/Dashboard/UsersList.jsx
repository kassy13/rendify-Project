// UserList.js

import React, { useEffect, useState } from "react";
import {
  Database_Id,
  ID,
  Project_Id,
  appWriteEndPoint,
  databases,
  inviteCollectionId,
  mainProjectIdKey,
  notiClient,
} from "../../appwrite/appWriteConfig";
import Loader2 from "../../Loader/Loader2";
import { X } from "@phosphor-icons/react";
import { toast } from "react-toastify";
import { useAuth } from "../../utils/AuthContext";

const UserList = ({ onClose, eventDetails }) => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const [data, setData] = useState(null); // New state to store the data of all the users
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch(`${appWriteEndPoint}/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Appwrite-Project": Project_Id,
            "X-Appwrite-Key": mainProjectIdKey,
          },
        });
        console.log("users response", response);

        if (!response.ok) {
          throw new Error(
            `HTTP error! Status: ${response.status}, ${response.statusText}`
          );
        }

        const fetchedData = await response.json();
        console.log("fetched data", fetchedData);
        // Set the data state with the fetched data
        setData(fetchedData);

        // Get the userId from permissions array
        const userIdFromPermissions =
          eventDetails.$permissions[0].match(/"user:(.*?)"/)[1];

        // Filter out the currently logged-in user if data is available
        const filteredUsers = fetchedData.users
          ? fetchedData.users.filter(
              (user) => user.$id !== userIdFromPermissions
            )
          : [];

        setUsers(filteredUsers);

        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      } finally {
        // Set loading state to false once data fetching is complete
        setLoading(false);
      }
    };

    getUsers();
  }, []);
  console.log("users", users);
  console.log("event details prop", eventDetails);

  const handleUserInvite = async (user) => {
    try {
      // Check if permissions array and read permission are available cos instead of starting afresh to get the current user, i gave permissions to user so therefore the current user is gotten form the permissions array
      if (eventDetails.$permissions && eventDetails.$permissions.length > 0) {
        const readPermission = eventDetails.$permissions[0];

        // Use optional chaining to safely access properties
        const userIdMatch = readPermission?.match(/"user:(.*?)"/);
        const userId = userIdMatch ? userIdMatch[1] : null;

        // Check if userId matches with user.$id so i can construct the sendName from there

        const senderUser = data.users.find((u) => userId === u.$id);
        console.log("sender user", senderUser);
        console.log("all user data", data);
        const senderName = senderUser.name;

        // Save invitation to Appwrite database
        const inviteData = {
          eventId: eventDetails.$id,
          receiverId: user.$id,
          senderId: userId,
          // Add senderName to the invite data
          title: eventDetails.eventName,
          status: "pending",
          message: `Hi ${user.name}, an invite for the event ${eventDetails.eventName} was sent by ${senderName}  with user id ${userId}. Respond by clicking yes or No to the RSVP invite.`,
          createdAt: null,
          Datetime: "",
          Notification: `Hi ${user.name}, you have a received a new notification by ${senderName}`,
        };

        const response = await databases.createDocument(
          Database_Id,
          inviteCollectionId,
          ID.unique(),
          inviteData
        );
        console.log("response", response);

        // Optionally, show a success message
        toast.success(`Invitation sent to ${user.name}`);
        // console.log("sender Name", senderName);
        console.log("userId ", userId);
        // console.log("sender user", senderUser);
      } else {
        console.error("User permissions not available.");
      }
    } catch (error) {
      console.error("Error sending invitation:", error);
    }
  };

  return (
    <div className="user-list">
      <div className="bar">
        <div className="search_users header">
          <h2>Search Users</h2>
          <div onClick={onClose} className="x">
            <X />
          </div>
        </div>

        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {loading ? (
        <Loader2 />
      ) : (
        <ul>
          {users
            .filter((user) =>
              user.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((user) => (
              <div key={user.id} className="one_user">
                <div className="user">
                  <li className="name" key={user.id}>
                    {user.name}
                  </li>
                  <li className="email" key={user.id}>
                    {user.email}
                  </li>
                </div>

                {user.$id !== userId && (
                  <button
                    className="btn"
                    onClick={() => handleUserInvite(user)}
                  >
                    Invite
                  </button>
                )}
              </div>
            ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
