import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import Loader from "../Loader/Loader";
import { ID, account } from "../appwrite/appWriteConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const AuthContexProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const sigupUser = async (userInfo) => {
    setLoading(true);

    try {
      // Creating an account
      let response = await account.create(
        ID.unique(),
        userInfo.email,
        userInfo.password1,
        userInfo.name
      );
      console.log("created this user", response);

      // Loggin the user immediately after signup
      await account.createEmailSession(userInfo.email, userInfo.password1);
      toast.success("Verification email has been sent", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      let accountDetails = await account.get();
      setUser(accountDetails);

      // Store the user's unique identifier in local storage
      localStorage.setItem("userId", accountDetails.$id);

      // for Verifying an email once a user is created
      await account.createVerification("http://localhost:5174/verification");
      toast.success("Verification email has been sent !");
      console.log("verification email has been sent");

      const promise = account.updateVerification("[USER_ID]", "[SECRET]");
      try {
        console.log("verification status:succes", promise);
      } catch (error) {
        console.log(error);
      }

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const loginUser = async (userInfo) => {
    setLoading(true);
    try {
      // Creating a session for a user
      let response = await account.createEmailSession(
        userInfo.email,
        userInfo.password
      );

      // Now once we have gotten the account details we can now setuser to the account details
      let accountDetails = await account.get();
      console.log("response", response);
      // Set the user in the context
      setUser(accountDetails);

      // Store the user's unique identifier in local storage
      localStorage.setItem("userId", accountDetails.$id);
    } catch (error) {
      console.log(error);
      // 1. Remember to check if passwords do not match the users password and display a toast message
    }

    setLoading(false);
  };

  const logoutUser = async () => {
    await account.deleteSession("current");
    navigate("/login");
    setUser(null);
    console.log("logout");
  };

  // To help persist a user
  const checkUserStatus = async () => {
    try {
      let accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      console.log(error);
    }
    // If everything goes well we want to change the loading state
    setLoading(false);
  };

  const contextData = { user, sigupUser, loginUser, logoutUser, setUser };

  /** all the stuff i want to pass down to other components */
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
