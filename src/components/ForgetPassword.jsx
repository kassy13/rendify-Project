import { useState } from "react";
import { account } from "../appwrite/appWriteConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { useAuth } from "../utils/AuthContext";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  // const { loginUser } = useAuth();

  const forgetPassword = async (e) => {
    e.preventDefault();

    // Check if email is empty
    if (!userEmail.trim()) {
      toast.error("Email cannot be empty");
      return;
    }

    try {
      // Check if the user with the specified email exists
      await account.get({ email: userEmail });
    } catch (error) {
      // Handle the case where the user doesn't exist
      console.error(error);
      toast.error("User with the specified email not found");
      return;
    }

    // If the user exists, initiate the password recovery process
    const promise = account.createRecovery(
      userEmail,
      "http://localhost:5174/resetpassword"
    );

    promise.then(
      function (response) {
        console.log(response); // Success
        navigate("/resetpassword");
      },
      function (error) {
        console.log(error);
        toast.error(error);
        // Failure
      }
    );
  };

  return (
    <div>
      <h1>Forgot password?</h1>
      <form>
        <input
          type="email"
          name="password"
          required
          id="exampleInputPassword1"
          onChange={(e) => {
            setUserEmail(e.target.value);
          }}
        />
        <button type="submit" onClick={(e) => forgetPassword(e)}>
          Reset Password
        </button>{" "}
      </form>
    </div>
  );
};

export default ForgetPassword;
