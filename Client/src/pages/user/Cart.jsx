import Image6 from "../../assets/sub3.png";
import Image12 from "../../assets/sub7.jpg";
import "./Cart.css";
import { Link } from "react-router-dom";
import {
  FiShoppingCart,
  FiBell,
  FiUser,
  FiSearch,
  FiMail,
  FiPhone,
  FiInstagram,
  FiFacebook,
  FiYoutube,
  FiLinkedin,
} from "react-icons/fi";

const cartimg = [
  {
    id: 1,
    image: Image6,
    name: "Autograph eau de parfum 100ml for men",
    price: "Rs 899",
    oldprice: "Rs 2000",
    offer: "61% off",
  },
  {
    id: 2,
    image: Image6,
    name: "Autograph eau de parfum 100ml for men",
    price: "Rs 899",
    oldprice: "Rs 2000",
    offer: "61% off",
  },
  {
    id: 3,
    image: Image12,
    name: "Royal eau de parfum 100ml for men",
    price: "Rs 899",
    oldprice: "Rs 2000",
    offer: "61% off",
  },
];

export const Cart = () => {
  return (
    <div className="cart">
      {/* NAVBAR */}
      <div className="home-fullnav">
        <h2 id="nav-heading">Fragranzia</h2>

        <div className="home-fullnav1">
          <div className="home-nav">
            <nav>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/gifting">Gifting</Link></li>
                <li><Link to="/about">About</Link></li>
              </ul>
            </nav>
          </div>

          <div className="home-navsearch">
            <FiSearch />
            <input type="text" placeholder="Search Here" />
          </div>

          <div className="home-navicons">
            <span>
              <Link to="/cart">
                <FiShoppingCart />
              </Link>
            </span>
            <Link to="/notifications">
              <FiBell />
            </Link>
            <Link to="/profile">
              <FiUser />
            </Link>
          </div>
        </div>
      </div>

      {/* BREADCRUMB HEADER */}
      <div className="cart-section-2">
        <h1>Cart</h1>
        <p>Home   ›   Cart</p>
      </div>

      {/* MAIN LAYOUT: PRODUCTS ON LEFT, CHECKOUT ON RIGHT */}
      <div className="cart-page-layout">
        
        {/* Left Side: All Cart Items Stacked Vertically */}
        <div className="cart-section-3">
          {cartimg.map((user) => (
            <div className="cart-item" key={user.id}>
              <div className="cart-image">
                <img src={user.image} alt={user.name} />
              </div>

              <div className="cart-item-content">
                <h1 className="cart-item-title">{user.name}</h1>

                <div className="cart-buttons-row">
                  <div className="cart-buttons">
                    <button>-</button> <span>1</span> <button>+</button>
                  </div>
                </div>

                <div className="cart-price">
                  <span className="price-main">{user.price}</span>
                  <span className="price-old">{user.oldprice}</span>
                  <span className="price-offer">{user.offer}</span>
                </div>

                <div className="allbuttonss">
                  <div className="cart-button-1">
                    <button>Delete</button>
                  </div>
                  <div className="cart-button-2">
                    <button>Share</button>
                  </div>
                  <div className="cart-button-3">
                    <button>Buy</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Fixed Checkout Box */}
        <div className="og-checkout">
          <div className="checkout">
            <h2>Check Out</h2>
            <div className="checkout-row">
              <span>Price (3 item)</span> 
              <span className="checkout-val-dark">Rs 3,097</span>
            </div>
            <div className="checkout-row">
              <span>Discount</span> 
              <span className="checkout-val-dark">Rs 4,404</span>
            </div>
            <div className="checkout-row">
              <span>Delivery Charge</span> 
              <span className="checkout-val-free">Free</span>
            </div>
            <hr className="checkout-divider" />
            <div className="checkout-total-row">
              <span>Total Amount</span>
              <span className="checkout-val-total">Rs 3,493</span>
            </div>
          </div>
          <button className="proceed-btn">Proceed to Buy</button>
          
          <div className="secure-payment-box">
            <p>Safe and Secure Payments. Easy returns. 100% Authentic products.</p>
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <div className="home-footer">
        <div className="home-footerlogo">
          <h1>Fragranzia</h1>
        </div>

        <div className="home-footercolumn">
          <h3>Pages</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/gifting">Gifting</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </div>

        <div className="home-footercolumn">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/privacy">Privacy policy</Link></li>
            <li><Link to="/terms">Terms and conditions</Link></li>
            <li><Link to="/faqs">FAQs</Link></li>
            <li><Link to="/customer-service">Customer service</Link></li>
          </ul>
        </div>

        <div className="home-footercolumn">
          <ul>
            <li>
              <FiMail />
              <a href="mailto:ftrafurniture@gmail.com">ftrafurniture@gmail.com</a>
            </li>
            <li>
              <FiPhone />
              <a href="tel:+919876543210">+91 9876543210</a>
            </li>
          </ul>

          <h3>Social Media</h3>
          <div className="social-icons">
            <a href="#"><FiInstagram /></a>
            <a href="#"><FiFacebook /></a>
            <a href="#"><FiYoutube /></a>
            <a href="#"><FiLinkedin /></a>
          </div>
        </div>
      </div>

      <div className="home-footerbelow">
        <p>Web Accessibility | Terms of Use | Privacy Statement | Contact Us</p>
        <p>© 2024 Fragranzia Company. All rights reserved.</p>
      </div>
    </div>
  );
};