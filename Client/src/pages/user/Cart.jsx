import Image6 from "../../assets/sub3.png";
import Image12 from "../../assets/sub7.jpg";
import "./Cart.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import UserService from "../../service/user-api-services/UserService";

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
   FiMenu,
  FiX
} from "react-icons/fi";
import { toast } from "react-toastify";

import axios from "axios";

// const cartimg = [
//   {
//     id: 1,
//     image: Image6,
//     name: "Autograph eau de parfum 100ml for men",
//     price: "Rs 899",
//     oldprice: "Rs 2000",
//     offer: "61% off",
//   },
//   {
//     id: 2,
//     image: Image6,
//     name: "Autograph eau de parfum 100ml for men",
//     price: "Rs 899",
//     oldprice: "Rs 2000",
//     offer: "61% off",
//   },
//   {
//     id: 3,
//     image: Image12,
//     name: "Royal eau de parfum 100ml for men",
//     price: "Rs 899",
//     oldprice: "Rs 2000",
//     offer: "61% off",
//   },
// ];

export const Cart = () => {

  const [search,setSearch]=useState("")

   const [menuOpen, setMenuOpen] = useState(false);

  const[Product,setProduct]=useState([])

  const { getCart,cartitemdelete,changequantity } = UserService();

  const [loading, setLoading] = useState(true);

  const[count,setcound]=useState(1)

  const [cartTotal, setCartTotal] = useState(0);

  const fetchCart = async () => {
    try {
      //let response= await axios.get('http://localhost:7000/api/auth/cart')
      // setProduct(response.data)

      const response = await getCart();    //to avoid multiple apicall we use UserService.jsx
      setProduct(response.cart || []);
      setCartTotal(response.cart_total || 0);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  fetchCart();
}, []);

//=====for serach=======//

const filteredCart = Product.filter((item) =>
  item.product?.name?.toLowerCase().includes(search.toLowerCase())
);

const itemdelete = async (id, productName) => {
  try {
    await cartitemdelete(id);

    await fetchCart();

    toast.success(`${productName} removed from cart!`);

  } catch (error) {
    console.error("Delete error:", error);

    toast.error(
      error.response?.data?.message ||
      "Unable to remove product from cart!"
    );
  }
};


 const handleQuantity=async(id,quantity)=>{
//   // await axios.put(`http://localhost:7000/quanti/${id}`,{quantity})   //repeated API call avoid aakan use UserService.jsx 
//  await changequantity(id,quantity)


  try {
    const response = await changequantity(id, quantity);
    console.log("Quantity updated:", response);
    await fetchCart();
  } catch (error) {
    console.log("Status:", error.response?.status);
    console.log("Error:", error.response?.data || error.message);
  }
};

  return (
    <div className="cart">
      {/* NAVBAR */}
                 
{/*      
<div className="home-fullnav">

  <h2 id="nav-heading">Fragranzia</h2> */}

  {/* Hamburger button - mobile only */}
  {/* <button
    className="mobile-menu-btn"
    onClick={() => setMenuOpen(!menuOpen)}
    aria-label="Toggle navigation menu"
  >
    {menuOpen ? <FiX /> : <FiMenu />}
  </button>

  <div className={`home-fullnav1 ${menuOpen ? "menu-open" : ""}`}>

    <div className="home-nav">
      <nav>
        <ul>
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>

          <li>
            <Link to="/products" onClick={() => setMenuOpen(false)}>
              Products
            </Link>
          </li>

          <li>
            <Link to="/gifting" onClick={() => setMenuOpen(false)}>
              Wishlist
            </Link>
          </li>

          <li>
            <Link to="/about" onClick={() => setMenuOpen(false)}>
              About
            </Link>
          </li>
        </ul>
      </nav>
    </div> */}

    {/* SEARCH */}
    {/* <div className="home-navsearch">
      <FiSearch />
      <input type="text" value={search} onChange={(e)=>{setSearch(e.target.value)}} placeholder="Search products..." />
    </div> */}

    {/* ICONS */}
    {/* <div className="home-navicons">
      <Link to="/cart" onClick={() => setMenuOpen(false)}>
        <FiShoppingCart />
      </Link> */}

      {/* <Link to="/notifications" onClick={() => setMenuOpen(false)}>
        <FiBell />
      </Link>

      <Link to="/profilesave" onClick={() => setMenuOpen(false)}>
        <FiUser />
      </Link>
    </div>

  </div>
</div> */}

      {/* BREADCRUMB HEADER */}
      <div className="cart-section-2">
        <h1>Cart</h1>
        <p>Home   ›   Cart</p>
      </div>

      {/* MAIN LAYOUT: PRODUCTS ON LEFT, CHECKOUT ON RIGHT */}
      <div className="cart-page-layout">
        
        {/* Left Side: All Cart Items Stacked Vertically */}
        <div className="cart-section-3">
          {/* {Product.map((user) => (         //here product,quatity store inside the cart at the collection so we canot take data directly inside the product
                                                                                
            <div className="cart-item" key={user._id}>
              <div className="cart-image">
                <img src={`http://localhost:7000/uploads/${user.image}`} />
              </div>

              <div className="cart-item-content">
                <h1 className="cart-item-title">{user.name}</h1>

                <div className="cart-buttons-row">
                  <div className="cart-buttons">
                    <button>-</button> <span> {item.quantity}</span> <button>+</button>
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
          ))} */}

       {/* {Product.map((item) => {                           //many cart item ind(cart lee kore product indukum user add chyunna) */}
     {/*======== for serach ===========*/}
          {filteredCart.map((item) => {  
  const user = item.product;                         //item → ഒരു cart item.  item.product->ആ cart item-ൽ ഉള്ള product field. product store id of products in the product collection
  
  if (!user) return null;

  return (
    <div className="cart-item" key={user._id}>
      {/* <img
        src={`http://localhost:7000/uploads/${user.image}`}
        alt={user.name}
      /> */}
  {/* to take image from clounary */}
      <img
  src={user.image}
  alt={user.name}
/>

          <div className="cart-buttons-row">
                  <div className="cart-buttons">
                      <button onClick={()=> handleQuantity(item.product._id, item.quantity + 1)}>+</button> <span>{item.quantity}</span> <button onClick={()=> handleQuantity(item.product._id, item.quantity - 1)}>-</button>
                  </div>
                </div>
       <div className="cart-price">
               <h2>{user.name}</h2>
                  <span className="price-main">Rs {user.saleprice }</span>
                  <span className="price-old">Rs {user.price}</span>
                  <span className="price-offer">{user.offer}</span>
                </div>
                
                <div className="allbuttonss">
                  <div className="cart-button-1">
                    <button onClick={() => itemdelete(user._id, user.name)}>
                      Delete
                      </button>
                  </div>
                  <div className="cart-button-2">
                    <button>Share</button>
                  </div>
                  <div className="cart-button-3">
                    <button>Buy</button>
                  </div>
                </div>
    </div>
  );
})}




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
              <span className="checkout-val-total">{cartTotal}</span>
            </div>
          </div>
          <Link to="/payment">
          <button className="proceed-btn" >Proceed to Buy</button>
          </Link>
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
            <li><Link to="/gifting">Wishlist</Link></li>
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