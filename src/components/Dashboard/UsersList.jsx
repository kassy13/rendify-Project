// UserList.js

import React, { useEffect, useState } from "react";
import {
  Project_Id,
  appWriteEndPoint,
  mainProjectIdKey,
} from "../../appwrite/appWriteConfig";
import Loader2 from "../../Loader/Loader2";
import { X } from "@phosphor-icons/react";

const UserList = ({ onClose }) => {
  const [users, setUsers] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  //   const appwriteEndpoint = "https://your-appwrite-endpoint.com";
  //   const projectID = "your-project-id";
  //   const apiKey = "your-api-key";

  //   useEffect(() => {
  //     const getUsers = async () => {
  //       try {
  //         const response = await fetch(`${appWriteEndPoint}/v1/users`, {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //             "X-Appwrite-Project": Project_Id,
  //             "X-Appwrite-Key": mainProjectIdKey,
  //           },
  //         });

  //         if (!response.ok) {
  //           throw new Error(`HTTP error! Status: ${response.status}`);
  //         }

  //         const data = await response.json();
  //         setUsers(data.users);
  //       } catch (error) {
  //         console.error("Error fetching users:", error.message);
  //       }
  //     };

  //     getUsers();
  //   }, []); // Run the effect only once when the component mounts

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

        if (!response.ok) {
          throw new Error(
            `HTTP error! Status: ${response.status}, ${response.statusText}`
          );
        }

        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      } finally {
        // Set loading state to false once data fetching is complete
        setLoading(false);
      }
    };

    getUsers();
  }, []);

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
                  <li key={user.$id} className="name">
                    {user.name}
                  </li>
                  <li className="email">{user.email}</li>
                </div>

                <button className="btn">Invite</button>
              </div>
            ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
