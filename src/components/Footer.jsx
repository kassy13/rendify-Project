// Footer.js

import {
  FacebookLogo,
  InstagramLogo,
  TwitterLogo,
} from "@phosphor-icons/react";
import "../sass/Footer.scss";
import { useState } from "react";
import Loader from "../Loader/Loader";

const Footer = () => {
  const [isLoading, setIsLoading] = useState(false);
  return isLoading ? (
    <Loader />
  ) : (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p>&copy; 2024 Rendify. All rights reserved.</p>
          <div className="social-icons">
            {/* Add your social icons here */}
            <a
              href="https://web.facebook.com/?_rdc=1&_rdr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookLogo size={32} />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterLogo size={32} />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramLogo size={32} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
