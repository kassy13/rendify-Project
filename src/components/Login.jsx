import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { toast } from "react-toastify";
import "../sass/auth.scss";

const Login = () => {
  const navigate = useNavigate();
  const { user, loginUser } = useAuth();
  const loginForm = useRef(null);
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = loginForm.current.email.value;
    const password = loginForm.current.password.value;

    try {
      const userInfo = { email, password };
      const user = await loginUser(userInfo);

      // Check if the user is authenticated
      // if (user) {
      //   toast.success("Login successful");
      //   navigate("/dashboard");
      // }
      // if (!user) {
      //   toast.error("Invalid email or password");
      // }
      // Check if the user object exists
      if (user && !user.error) {
        toast.success("Login successful");
        navigate("/dashboard");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);

      // Handle specific error messages
      if (error.message.includes("Invalid `password` param")) {
        toast.error("Password must be at least 8 characters");
      } else if (error.message.includes("Invalid credentials")) {
        toast.error("Invalid Email or Password");
      } else {
        toast.error("An error occurred during login");
      }
    }
  };

  return (
    <div className="login-register-container">
      <form ref={loginForm} onSubmit={handleSubmit} className="form">
        <div className="form-field-wrapper">
          <label>Email:</label>
          <input
            required
            type="email"
            name="email"
            placeholder="Enter email..."
          />
        </div>

        <div className="form-field-wrapper">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            required
            placeholder="Enter password..."
          />
        </div>

        <div className=" forg">
          <div className="remember">
            <input type="checkbox" id="checkme" required />
            <label htmlFor="checkme"> Remember me</label>
          </div>
          <Link to={"/forgetpassword"}>Forgot password?</Link>
        </div>
        <div className="form-field-wrapper">
          <input type="submit" value="Login" className="btn" />
        </div>
        <p>
          {`Don't`} have an account? <Link to="/signup"> Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
