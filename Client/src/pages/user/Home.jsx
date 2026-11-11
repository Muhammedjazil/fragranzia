import "./Home.css";
import axios from "axios";
import Image1 from "../../assets/image1.png";
import Image2 from "../../assets/image2.png";
import Image3 from "../../assets/taj3.png";
import Image4 from "../../assets/sub1.jpg";
import Image5 from "../../assets/sub2.png";
import Image6 from "../../assets/sub3.png";
import Image7 from "../../assets/sub4.png";
import Image8 from "../../assets/sub16.jpg";
import Image9 from "../../assets/sub15.jpg";
import Image10 from "../../assets/sub12.png";
import Image11 from "../../assets/sub13.png";
import Image12 from "../../assets/sub7.jpg";
import Image13 from "../../assets/sub8.jpg";
import Image14 from "../../assets/sub9.jpg";
import Image15 from "../../assets/sub19.jpg";
import cat1 from "../../assets/cat1.jpg";
import cat2 from "../../assets/cat2.jfif";
import cat3 from "../../assets/cat3.avif";
import cat4 from "../../assets/cat4.webp";
import cat5 from "../../assets/cat5.webp";
import home1 from "../../assets/home1.png"
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import UserService from "../../service/user-api-services/UserService"
import {
  // FiShoppingCart,
  // FiBell,
  // FiUser,
  // FiSearch,
  FiTruck,
  FiShield,
  FiHeadphones,
  FiMail,
  FiPhone,
  FiInstagram,
  FiFacebook,
  FiYoutube,
  FiLinkedin,
  FiHeart,
  //  FiMenu, 
  //  FiX 
} from "react-icons/fi";
import { useEffect, useState } from "react";

   const categories = [
        {
            name: "For women",
            image: cat1
        },
        {
            name: "For men",
            image: cat2
        },
        {
            name: "Deodorants",
            image: cat3
        },
        {
            name: "Combo",
            image: cat4
        },
        {
            name: "Body Mist",
            image: cat5
        }
    ];


export const Home = ({ search }) => {

  const [menuOpen, setMenuOpen] = useState(false);
//  const [search, setSearch] = useState("");
   const [likedProducts, setLikedProducts] = useState([]);

   const { getHome, addToCart,handlewishlist,getWishlist} = UserService();
  const[allData,setallData]=useState([])
  const scrollProducts = (amount) => {
    const container = document.querySelector(".products-container");   //.products-container enna class stote--->conatainer enna variable

  


    if (container) {
      container.scrollBy({  //scrollBy-->todcroll
        left: amount,
        behavior: "smooth",
      });
    }
  };

  const fechData=async()=>{
    // let res=await axios.get('http://localhost:7000/product')
    // setallData(res.data)
    let res=await getHome() 
    setallData(res)

  }
useEffect(()=>{
fechData();
fetchWishlist();
},[])

//=========for search=================//
const filteredProducts = allData.filter((product) =>
  product.name?.toLowerCase().includes(
    (search || "").toLowerCase()
  )
);

//===============================//

const handleAddToCart = async (product) => {
  try {
    // await axios.post(`http://localhost:7000/${product._id}`)
    const response = await addToCart(product._id);   //to avoid multiple API calss we use UserServive.jsx, so do this

    console.log("Cart response:", response);
      toast.success(`${product.name} added to cart!`);
  } catch (error) {
    console.error("Status:", error.response?.status);
    console.error("Backend error:", error.response?.data);
    console.error("Error message:", error.message);

      toast.error(
      error.response?.data?.message ||
      "Unable to add product to cart"
    );
  }
};
//================heart=================

const handleLike = async (productId) => {
  try {
    // Check whether product is already in wishlist
    const isLiked = likedProducts.includes(productId);

    // Call backend API
    await handlewishlist(productId);

    // Update wishlist state
    setLikedProducts((prev) =>
      isLiked
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );

    // Show toast message
    if (isLiked) {
      toast.info("Removed from wishlist!");
    } else {
      toast.success("Added to wishlist!");
    }

  } catch (error) {
    console.error("Wishlist error:", error);

    toast.error(
      error.response?.data?.message ||
      "Unable to update wishlist!"
    );
  }
};

//====we add====

const fetchWishlist = async () => {
  try {
    const response = await getWishlist();

    console.log("Saved wishlist from backend:", response);

    const wishlistIds = Array.isArray(response)
      ? response
          .filter((product) => product && product._id)
          .map((product) => String(product._id))
      : [];

    setLikedProducts(wishlistIds);
  } catch (error) {
    console.error(
      "Error fetching wishlist:",
      error.response?.status,
      error.response?.data || error.message
    );
  }
};


  return (
    <div className="home">

      {/* ================= NAVBAR ================= */}
{/* ================= NAVBAR ================= */}

{/* <div className="home-fullnav"> */}

  {/* <h2 id="nav-heading">Fragranzia</h2> */}

  {/* Hamburger button - mobile only */}
  {/* <button */}
  {/* //   className="mobile-menu-btn" */}
  {/* //   onClick={() => setMenuOpen(!menuOpen)} */}
  {/* //   aria-label="Toggle navigation menu" */}
  {/* // > */}
  {/* //   {menuOpen ? <FiX /> : <FiMenu />} */}
  {/* // </button> */}

  {/* <div className={`home-fullnav1 ${menuOpen ? "menu-open" : ""}`}>

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
  <input
    type="text"
    placeholder="Search products..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</div> */}

    {/* ICONS */}
    {/* <div className="home-navicons">
      <Link to="/cart" onClick={() => setMenuOpen(false)}>
        <FiShoppingCart />
      </Link>

      <Link to="/notifications" onClick={() => setMenuOpen(false)}>
        <FiBell />
      </Link>

      <Link to="/profilesave" onClick={() => setMenuOpen(false)}>
        <FiUser />
      </Link>
    </div>

  </div>
</div> */}


      {/* ================= OFFER BAR ================= */}

        {/* DISCOUNT BAR */}
            <div className="product-1">
                <h2>
                    ENJOY FESTIVE DISCOUNT! FREE SHIPPING ABOVE 999!
                </h2>
            </div>


      {/* ================= HERO ================= */}

     <div
  className="home-hero"
  style={{
    backgroundImage: `url(${home1})`,
  }}
>
        <div className="home-hero1">

          <h1>
            Discover perfumes that
            <br />
            celebrate individuality
          </h1>

          <p>
            Every moment with an unforgettable essence.
          </p>

      <Link to="/products">   <button>
            Shop Now
          </button>
          </Link> 

        </div>


        <div className="home-hero2">

          <img
            src={Image1}
            id="home-img1"
            alt="Perfume"
          />

          <img
            src={Image2}
            id="home-img2"
            alt="Perfume"
          />

        </div>

      </div>


      {/* ================= OFFER CARDS ================= */}

      <div className="home-belowhero">

        <div className="home-belowhero1">

          <div>

            <h3>
              Unlock Exclusive Offers
            </h3>

            <p>
              Discover special deals tailored just for you!
            </p>

          </div>

          <img
            src={Image4}
            alt="Exclusive offers"
          />

        </div>


        <div className="home-belowhero2">

          <h3>
            Gift a Scent to your loved one.
          </h3>

          <p>
            Make your love more beautiful
          </p>

          <img
            src={Image5}
            alt="Gift"
          />

        </div>


        <div className="home-belowhero3">

          <h3>
            Luxury Scents
            <br />
            Starting at ₹4,000
          </h3>

          <span>
            Shop
            <br />
            Now
          </span>

          <img
            src={Image6}
            alt="Luxury scent"
          />

        </div>

      </div>


      <br />
      <br />


      {/* ================= CHARACTERISTICS ================= */}

      <div className="home-characteristics">

        <div className="home-characteristics1">

          <FiTruck />

          <div>

            <h3>
              Fast & Reliable Delivery
            </h3>

            <p>
              Get your orders delivered on time, every time.
            </p>

          </div>

        </div>


        <div className="home-characteristics2">

          <FiShield />

          <div>

            <h3>
              Secure Payments
            </h3>

            <p>
              Shop with confidence using our encrypted payment gateways.
            </p>

          </div>

        </div>


        <div className="home-characteristics3">

          <FiHeadphones />

          <div>

            <h3>
              24/7 Customer Support
            </h3>

            <p>
              We're here to assist you anytime, anywhere.
            </p>

          </div>

        </div>

      </div>


      {/* ================= FEATURED COLLECTION ================= */}

      <section className="featured-section">

        <div className="featured-header">

          <h2>
            Featured <span>Collections</span>
          </h2>


          {/* ARROW BUTTONS */}

          <div className="scroll-buttons">

            <button
              type="button"
              onClick={() => scrollProducts(-350)}  //-350--->right
            >
              ‹
            </button>

            <button
              type="button"
              onClick={() => scrollProducts(350)} //350--->left
            >
              ›
            </button>

          </div>

        </div>


        {/* PRODUCTS */}

        <div className="products-container">

          {/* {allData.map((product) => ( */}
           {/* to display search */}
          {filteredProducts.map((product) => (
           
            <div
              className="product-card"
              key={product._id}
            >

                
<div className="likeicon">
  <span
    className="like"
    onClick={() => handleLike(String(product._id))

      
    }
    style={{
      color: likedProducts.includes(String(product._id))
        ? "red"
        : "black",
      cursor: "pointer",
    }}
  >
    <FiHeart
      fill={
        likedProducts.includes(String(product._id))
          ? "red"
          : "none"
      }
      color={
        likedProducts.includes(String(product._id))
          ? "red"
          : "black"
      }
    />
  </span>
</div>


              {/* PRODUCT IMAGE */}
             

              <div className="product-image">
                <Link to={`/productpage2/${product._id}`}>         {/* productpage2 leek aaa specific product id koode pass aakum params aaki */}
                <span className="new-badge">
                  New
                </span>

                {/* <img
                  src={`http://localhost:7000/uploads/${product.image}`}
                  alt={product.name}
                /> */}

                {/* take data from clounary */}

                <img
                src={product.image}
                alt={product.name}
                 />
                    </Link>
              </div>


              {/* PRODUCT DETAILS */}

              <div className="product-details">

                <h3>
                  {product.name}
                  <br />
                  {/* {product.type} */}
                </h3>


                <div className="price">

                  <strong>
                    RS {product.price}
                  </strong>

                  <del>
                    RS {product.saleprice}
                  </del>

                </div>

            
              
            
          <button
             className="cart-button"
            type="button"
            onClick={() => handleAddToCart(product)}
            >
               Add to Cart
             </button>


              </div>

            </div>
   
          ))}

        </div>

      </section>


      {/* ================= QUOTE ================= */}

      <div className="home-quote">

        <p>
          "It's an art. A craft. A science. At Fragranzia,
          we're in the business of creating memories that
          last forever through our fragrances."
        </p>

      </div>


      {/* ================= COLLECTION CARDS ================= */}

      <div className="home-newarrivals">

        <div className="home-newarrival">
          <h1>New Arrivals</h1>
          <img src={Image12}/>
        </div>

        <div className="home-limitededition">
          <h1>Limited Edition</h1>
          <img src={Image13}/>

        </div>

        <div className="home-sellers">
          <h1>Best Sellers</h1>
          <img src={Image14}/>

        </div>

      </div>

      

   <div className="categories">

            <div className="categories-header">
                <h2>
                    Explore <span>Categories</span>
                </h2>

                <a href="#">See All</a>
            </div>

            <div className="categories-list">

                {categories.map((category, index) => (
                    <div className="category-item" key={index}>
                      

                        <div className="category-image">
                            <img
                                src={category.image}
                                alt={category.name}
                            />
                        </div>

                        <p>{category.name}</p>

                    </div>
                ))}

            </div>

        </div>






 {/* PRODUCTS */}
   <br/>
     
   <h1 className="offerzone">offer zone</h1>
   <br/>
        <div className="products-container">
   
          {/* {allData.map((product) => ( */}
           {/* to dispaly serach */}
           {filteredProducts.map((product) => (
            <div
              className="product-card"
              key={product._id}
            >
         
<div className="likeicon">
  <span
    className="like"
    onClick={() => handleLike(String(product._id))}
    style={{
      color: likedProducts.includes(String(product._id))
        ? "red"
        : "black",
      cursor: "pointer",
    }}
  >
    <FiHeart
      fill={
        likedProducts.includes(String(product._id))
          ? "red"
          : "none"
      }
      color={
        likedProducts.includes(String(product._id))
          ? "red"
          : "black"
      }
    />
  </span>
</div>

              {/* PRODUCT IMAGE */}

              <div className="product-image">

                 <Link to={`/productpage2/${product._id}`}>   

                {/* <img
                  src={`http://localhost:7000/uploads/${product.image}`}
                  alt={product.name}
                /> */}
                {/* to take image from clounary we use  */}
                  <img
                src={product.image}
                alt={product.name}
                 />

                  </Link>
              </div>


              {/* PRODUCT DETAILS */}

              <div className="product-details">

                <h3>
                  {product.name}
                  <br />
                  {/* {product.type} */}
                </h3>


                <div className="price">

                  <strong>
                    RS {product.price}
                  </strong>

                  <del>
                   RS {product.saleprice}

                  </del>

                </div>

     
          <button
             className="cart-button"
            type="button"
            onClick={() => handleAddToCart(product)}
            >
               Add to Cart
             </button>

              </div>

            </div>
         
          ))}

        </div>

     


      {/* ================= ELEGANCE ================= */}

      <div className="home-elegance">

        <div>

          <h1>
            Elegance in Every Bottle
          </h1>

          <p>
            Discover timeless fragrances crafted for every moment
          </p>

          <button>
            Shop Now
          </button>

        </div>

        <img
          src={Image15}
          alt="Elegance perfume"
        />

      </div>


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
              <Link to="/gifting">Wishlist</Link>
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
  );
};