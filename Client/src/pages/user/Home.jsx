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

import { Link } from "react-router-dom";

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
import { useEffect, useState } from "react";

   const categories = [
        {
            name: "Eau De Parfum",
            image: Image1
        },
        {
            name: "Concentrated",
            image: Image2
        },
        {
            name: "Deodorants",
            image: Image3
        },
        {
            name: "Body Mist",
            image: Image4
        },
        {
            name: "Combo",
            image: Image5
        }
    ];


export const Home = () => {

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
    let res=await axios.get('http://localhost:7000/product')
    setallData(res.data)
  }
useEffect(()=>{
fechData()
},[])
  return (
    <div className="home">

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

            <Link to="/profile">
              <FiUser />
            </Link>

          </div>

        </div>

      </div>


      {/* ================= OFFER BAR ================= */}

      <div className="home-belownav">

        <p>
          ENJOY FESTIVE DISCOUNTS! FREE SHIPPING ABOVE 999 !
        </p>

      </div>


      {/* ================= HERO ================= */}

      <div className="home-hero">

        <div className="home-hero1">

          <h1>
            Discover perfumes that
            <br />
            celebrate individuality
          </h1>

          <p>
            Every moment with an unforgettable essence.
          </p>

          <button>
            Shop Now
          </button>

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

          {allData.map((product) => (

            <div
              className="product-card"
              key={product._id}
            >

              {/* PRODUCT IMAGE */}

              <div className="product-image">

                <span className="new-badge">
                  New
                </span>

                <img
                  src={`http://localhost:7000/uploads/${product.image}`}
                  alt={product.name}
                />

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
                    RS {product.oldPrice}
                  </del>

                </div>


                <button
                  className="cart-button"
                  type="button"
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
     
   <h1>offer zone</h1>
   <br/>
        <div className="products-container">
   
          {allData.map((product) => (

            <div
              className="product-card"
              key={product._id}
            >

              {/* PRODUCT IMAGE */}

              <div className="product-image">

               

                <img
                  src={`http://localhost:7000/uploads/${product.image}`}
                  alt={product.name}
                />

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
                    RS {product.oldPrice}
                  </del>

                </div>


                <button
                  className="cart-button"
                  type="button"
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
  );
};