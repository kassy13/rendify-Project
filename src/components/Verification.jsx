// Verification.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../appwrite/appWriteConfig";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";

const Verification = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        // Extract userId and secret from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const secret = urlParams.get("secret");
        const userId = urlParams.get("userId");

        console.log("Extracted userId:", userId);

        // Update verification status
        const response = await account.updateVerification(userId, secret);
        console.log(response);

        // Display a success toast
        toast.success("Account verification successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Redirect to the dashboard
        navigate("/dashboard");
      } catch (error) {
        console.log(error);

        // Display an error toast
        toast.error("Account verification failed. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Redirect to a different page if verification fails
        // navigate("/verification-failed");
      }
    };

    verifyAccount();
  }, [navigate]);

  return (
    <div>
      {/* You can add a loading spinner or message here if needed */}
      <Loader />
    </div>
  );
};

export default Verification;
