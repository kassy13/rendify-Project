import { useState } from "react";
import NavLogo from "../assets/lg-black.png";
import { Link, useNavigate } from "react-router-dom";
import { Sling as Hamburger } from "hamburger-react";
import "../sass/Navbar.scss";
import { useAuth } from "../utils/AuthContext";

const Navbar = () => {
  //   const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();

  console.log(user);
  const [isOpen, setOpen] = useState(false);

  const handleNavBarToggle = () => {
    setOpen(!isOpen);
  };

  return (
    <header>
      {/* Laptop navbar */}
      <div className="laptop">
        <div className="logoimg">
          <Link to="/">
            <img src={NavLogo} alt="" />
          </Link>
        </div>

        <div className="nav_links">
          {user ? (
            <>
              <Link to="/explore">Explore</Link>
              <Link to={"/dashboard"} className="btn">
                Dashboard
              </Link>
              {/* <Link to={"/login"} className="btn">
                Logout
              </Link> */}
              <button onClick={logoutUser} className="btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/explore">Explore</Link>

              <Link to={"/signup"} className="btn">
                Signup
              </Link>
              <Link to={"/login"} className="btn">
                Login
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Navbar */}
      <nav className={`mobile ${isOpen ? "open" : ""}`}>
        <div className={`logoimg ${isOpen ? "open" : ""}`}>
          <Link to="/">
            <img src={NavLogo} alt="" />
          </Link>
        </div>
        {isOpen && (
          <div className="nav_links">
            {user ? (
              <div className="nav_link">
                <Link to="/explore" className="">
                  Explore
                </Link>
                <Link to={"/dashboard"} className="btn">
                  Dashboard
                </Link>
                <Link to={"/login"} className="btn">
                  Logout
                </Link>
              </div>
            ) : (
              <div className="nav_link">
                <Link to="/explore">Explore</Link>

                <Link to={"/signup"} className="btn">
                  Signup
                </Link>
                <Link to={"/login"} className="btn">
                  Login
                </Link>
              </div>
            )}
          </div>
        )}
        <div className="hamburger">
          <Hamburger onToggle={handleNavBarToggle} color="black" rounded />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
