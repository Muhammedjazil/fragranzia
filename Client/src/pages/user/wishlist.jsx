import Image6 from "../../assets/sub3.png";
import Image12 from "../../assets/sub7.jpg";
import { Link } from "react-router-dom";
import "./wishlist.css"
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

export const Wishlist=()=>{



    return(
        <div>
    
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
        <h1>Wishlist</h1>
        <p>Home   ›   Wishlist</p>
      </div>

  <div className="cart-section-30">
          {cartimg.map((user) => (
            <div className="cart-item3" key={user.id}>
              <div className="cart-images">
                <img src={user.image} alt={user.name} />
              </div>

              <div className="cart-item-content">
                <h1 className="cart-item-title">{user.name}</h1>

             

                <div className="cart-price">
                  <span className="price-main">{user.price}</span>
                  <span className="price-old">{user.oldprice}</span>
                  <span className="price-offer">{user.offer}</span>
                </div>

                <div className="allbuttonss">
                  <div className="cart-button-1">
                    <button>Delete</button>
                  </div>
               
                  <div className="cart-button-3">
                    <button>AddtoCard</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
          


        </div>
    )
}