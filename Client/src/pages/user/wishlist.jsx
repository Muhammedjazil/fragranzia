// import Image6 from "../../assets/sub3.png";
// import Image12 from "../../assets/sub7.jpg";
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
import { useState, useEffect } from "react";
import UserService from "../../service/user-api-services/UserService";


export const Wishlist=()=>{

const [wishlist, setWishlist] = useState([]);
const [loading, setLoading] = useState(true);

const { getWishlist, handlewishlist, addToCart } = UserService();

const fetchWishlist = async () => {
  try {
    const data = await getWishlist();
    setWishlist(data);
  } catch (error) {
    console.error(
      "Wishlist error:",
      error.response?.data || error.message
    );
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchWishlist();
}, []);


    return(
        <div className="wishlist-page">
    
     {/* ================= NAVBAR ================= */}

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

            <Link to="/profilesave">
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
  {loading ? (
    <p>Loading wishlist...</p>
  ) : wishlist.length === 0 ? (
    <p>Your wishlist is empty.</p>
  ) : (
    wishlist.map((product) => (
      <div className="cart-item3" key={product._id}>
        <div className="cart-images">
          <Link to={`/productpage2/${product._id}`}>
            {/* <img
              src={`http://localhost:7000/uploads/${product.image}`}
              alt={product.name}
            /> */}
            {/* take image from clounary */}
          <img src={product.image} alt={product.name}/>

          </Link>
        </div>

        <div className="cart-item-content">
          <h1 className="cart-item-title">
            {product.name}
          </h1>

          <div className="cart-price">
            <span className="price-main">
              Rs {product.price}
            </span>

            <span className="price-old">
              Rs {product.saleprice}
            </span>
          </div>

          <div className="allbuttonss">
            <div className="cart-button-1">
              <button
                onClick={async () => {
                  try {
                    await handlewishlist(product._id);
                    await fetchWishlist();
                  } catch (error) {
                    console.error(
                      error.response?.data || error.message
                    );
                  }
                }}
              >
                Delete
              </button>
            </div>

            <div className="cart-button-3">
              <button
                onClick={async () => {
                  try {
                    await addToCart(product._id);       //here the fn is reused fron userService.jsx
                    alert("Product added to cart!");
                  } catch (error) {
                    alert(
                      error.response?.data?.message ||
                      "Unable to add product to cart"
                    );
                  }
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    ))
  )}
</div>



        </div>
    )
}