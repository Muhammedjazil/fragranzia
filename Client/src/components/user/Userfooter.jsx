
import "./UserFooter.css";
import { Link } from "react-router-dom";

import {
  FiMail,
  FiPhone,
  FiInstagram,
  FiFacebook,
  FiYoutube,
  FiLinkedin,
} from "react-icons/fi";

const UserFooter = () => {
  return (
    <>
      {/* MAIN FOOTER */}
      <div className="home-footer">

        {/* LOGO */}
        <div className="home-footerlogo">
          <h1>Fragranzia</h1>
        </div>

        {/* PAGES */}
        <div className="home-footercolumn">
          <h3>Pages</h3>

          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/gifting">Wishlist</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/profilesave">Profile</Link></li>
          </ul>
        </div>

        {/* QUICK LINKS */}
        <div className="home-footercolumn">
          <h3>Quick Links</h3>

          <ul>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li>
              <Link to="/terms">
                Terms and <br /> conditions
              </Link>
            </li>
            <li><Link to="/faqs">FAQs</Link></li>
            <li>
              <Link to="/customer-service">
                Customer <br /> Service
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="home-footercolumn">
          <ul>
            <li>
              <FiMail />
              <a href="mailto:ftrafurniture@gmail.com">
                ftrafurniture@gmail.com
              </a>
            </li>

            <li>
              <FiPhone />
              <a href="tel:+919876543210">
                +91 9876543210
              </a>
            </li>
          </ul>

          <h3>Social media</h3>

          <div className="social-icons">
            <a href="#" aria-label="Instagram">
              <FiInstagram />
            </a>

            <a href="#" aria-label="Facebook">
              <FiFacebook />
            </a>

            <a href="#" aria-label="YouTube">
              <FiYoutube />
            </a>

            <a href="#" aria-label="LinkedIn">
              <FiLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* FOOTER BOTTOM */}
      <div className="home-footerbelow">
        <p>
          Web Accessibility | Terms of Use |
          Privacy Statement | Contact Us
        </p>

        <p>
          © 2024 Fragranzia Company. All rights reserved.
        </p>
      </div>
    </>
  );
};

export default UserFooter;
