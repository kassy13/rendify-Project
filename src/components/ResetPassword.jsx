import { useState } from "react";
import { account } from "../appwrite/appWriteConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setpassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const changePassword = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const secret = urlParams.get("secret");
    const userId = urlParams.get("userId");
    console.log(userId);

    const promise = account.updateRecovery(
      userId,
      secret,
      password.newPassword,
      password.confirmPassword
    );
    promise.then(
      function (response) {
        console.log(response); // Success
        // Redirect to the login route
        navigate("/login");
      },
      function (error) {
        console.log(error); // Failure
        // Handle password update failure as needed
        toast("error");
      }
    );
  };

  return (
    <div>
      <h1>ResetPassword</h1>
      <form action="">
        <div>
          <label htmlFor="exampleInputPassword"> Enter Your New Password</label>
          <input
            type="password"
            required
            name="password"
            id="exampleInputPassword1"
            onChange={(e) => {
              setpassword({ ...password, newPassword: e.target.value });
            }}
          />
        </div>
        <div>
          <label htmlFor="exampleInputPassword">
            Confirm Your New Password
          </label>
          <input
            type="password"
            required
            name="password"
            id="exampleInputPassword2"
            onChange={(e) => {
              setpassword({ ...password, confirmPassword: e.target.value });
            }}
          />
        </div>
        <button type="submit" onClick={(e) => changePassword(e)}>
          Change password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
