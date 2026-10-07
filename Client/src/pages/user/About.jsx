
import "./about.css"
import { Link } from "react-router-dom"
import image1 from "../../assets/perfume3.png"
import image2 from "../../assets/perfumee.png"
import {
  FiShoppingCart,
  FiBell,
  FiUser,
  FiSearch,
  FiTruck,
  FiShield,
  FiHeadphones,
  FiMail,
  FiPhone,
  FiInstagram,
  FiFacebook,
  FiYoutube,
  FiLinkedin,
} from "react-icons/fi";
export const About=()=>{



    return(
        <div className="About">
            
        
      <div className="home-fullnav">

        <h2 id="nav-heading">Fragranzia</h2>

        <div className="home-fullnav1">

          <div className="home-nav">

            <nav>
              <ul>

                <li>
                  <Link to="/Home">Home</Link>
                </li>

                <li>
                  <Link to="/products">Products</Link>
                </li>

                <li>
                  <Link to="/gifting">Gifting</Link>
                </li>

                <li>
                  <Link to="/about">About</Link>
                </li>

              </ul>
            </nav>

          </div>


          {/* SEARCH */}

          <div className="home-navsearch">

            <FiSearch />

            <input
              type="text"
              placeholder="Search products..."
            />

          </div>


          {/* ICONS */}

          <div className="home-navicons">

            <Link to="/cart">
              <FiShoppingCart />
            </Link>

            <Link to="/notifications">
              <FiBell />
            </Link>

            <Link to="/profile">
              <FiUser />
            </Link>

          </div>

        </div>
   
      </div>
    <hr/>
<br/>
<div className="about-section1">
    <div className="about-content">
    <h1>About Fragraniza</h1>
    
    <div className="about-para">
    <p>Home › About</p>
    </div>
    <br/>
   
 <p>
  At Fragranzia, we believe that a perfume is more than just a scent—it's a story,<br />
  an art, and a science combined to create memories that linger. Our journey<br />
  began with a vision to craft exquisite fragrances that capture the essence of<br />
  individuality and elevate every moment into something timeless.<br />
  <br />
  <br />
  Guided by passion and precision, we source the finest ingredients from<br />
  around the world to create perfumes that resonate with authenticity and<br />
  luxury. Each bottle is a masterpiece, meticulously crafted to deliver an<br />
  unparalleled sensory experience.<br />
  <br />
  <br />
  Our commitment goes beyond creating fragrances. We aim to inspire<br />
  confidence, evoke emotions, and celebrate uniqueness through every drop<br />
  we produce. Fragranzia isn’t just a brand—it’s a celebration of you, your style,<br />
  and your moments.<br />
  <br />
  <br />
  With a legacy built on quality, artistry, and innovation, we invite you to explore<br />
  our collection and find a scent that speaks your story.
</p>
</div>

<div className="about-image">
    <div className="about-image-1">
    <img src={image1}/>
    </div>
    <br/>
    <div className="about-image-2">

    <img src={image2}/>
    </div>
</div>


</div>
<br/>


      {/* ================= FOOTER ================= */}

      <div className="home-footer">

        {/* LOGO */}

        <div className="home-footerlogo">

          <h1>
            Fragranzia
          </h1>

        </div>


        {/* PAGES */}

        <div className="home-footercolumn">

          <h3>
            Pages
          </h3>

          <ul>

            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/products">Products</Link>
            </li>

            <li>
              <Link to="/gifting">Gifting</Link>
            </li>

            <li>
              <Link to="/about">About</Link>
            </li>

            <li>
              <Link to="/profile">Profile</Link>
            </li>

          </ul>

        </div>


        {/* QUICK LINKS */}

        <div className="home-footercolumn">

          <h3>
            Quick Links
          </h3>

          <ul>

            <li>
              <Link to="/privacy">
                Privacy Policy
              </Link>
            </li>

            <li>
              <Link to="/terms">
                Terms and
                <br />
                conditions
              </Link>
            </li>

            <li>
              <Link to="/faqs">
                FAQs
              </Link>
            </li>

            <li>
              <Link to="/customer-service">
                Customer
                <br />
                Service
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


          <h3>
            Social media
          </h3>


          <div className="social-icons">

            <a href="#">
              <FiInstagram />
            </a>

            <a href="#">
              <FiFacebook />
            </a>

            <a href="#">
              <FiYoutube />
            </a>

            <a href="#">
              <FiLinkedin />
            </a>

          </div>

        </div>

      </div>


      {/* ================= FOOTER BOTTOM ================= */}

      <div className="home-footerbelow">

        <p>
          Web Accessibility | Terms of Use |
          Privacy Statement | Contact Us
        </p>

        <p>
          © 2024 Fragranzia Company. All rights reserved.
        </p>

      </div>
        </div>
    )
}