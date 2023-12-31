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

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = loginForm.current.email.value;
    const password = loginForm.current.password.value;

    // if (!password) {
    //   toast.error("Incorrect Username or Password");
    // } else {
    //   toast.success("Login Successful");
    // }
    const userInfo = { email, password };
    loginUser(userInfo);
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
            <input type="checkbox" required />
            <label> Remember me</label>
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
