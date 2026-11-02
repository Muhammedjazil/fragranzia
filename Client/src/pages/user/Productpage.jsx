import "./productpage.css"

import Image4 from "../../assets/sub4.png"
import Image5 from "../../assets/sub11.png"
import Image6 from "../../assets/sub13.png"
import Image7 from "../../assets/sub18.jpg"
import Image8 from "../../assets/sub19.png"
import Image9 from "../../assets/sub12.png"
import Image10 from "../../assets/sub17.jpg"
import Image11 from "../../assets/sub10.jpg"
import Image12 from "../../assets/sub15.jpg"
import {Link} from "react-router-dom"
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
  FiHeart,
  FiSliders,
  FiX,
  FiCheck,
  FiDollarSign,
   FiArrowUp,
   FiArrowDown, 
   FiRotateCcw
} from "react-icons/fi";

import axios from "axios"
import { useEffect, useState } from "react"
// import { fetchproduct } from "../../../../Server/controllers/ProductController"


import UserService from "../../service/user-api-services/UserService"

export const Products=()=>{

const [minPrice, setMinPrice] = useState(0);
const [maxPrice, setMaxPrice] = useState(5000);
const [sortBy, setSortBy] = useState("Relevance");

   const {getHome,addToCart,handlewishlist,getWishlist,getFilteredProducts }=UserService() //destructure fns from UserService.jsx

 const[allData,setallData]=useState([])

 const [likedProducts, setLikedProducts] = useState([]);

 const [showFilter, setShowFilter] = useState(false);

  const fechproduct=async()=>{
   let res=await getHome()
    setallData(res)
  }
useEffect(()=>{
  fechproduct();
   fetchWishlist();
},[])



const handleAddToCart = async (product) => {   //addtocard button click then send data
  try {
    // await axios.post(`http://localhost:7000/${product._id}`)
    const response = await addToCart(product._id);   //to avoid multiple API calss we use UserServive.jsx, so do this

    console.log("Cart response:", response);
    alert(`${product.name} added to cart!`);
  } catch (error) {
    console.error("Status:", error.response?.status);
    console.error("Backend error:", error.response?.data);
    console.error("Error message:", error.message);

    alert(
      error.response?.data?.message ||
      "Unable to add product to cart"
    );
  }
};

// const handleLike = async(productId) => {
// // const response=await axios.post(`http://localhost:7000/wishlist/${id}`)
//   const response=await handlewishlist(productId)

//   setLikedProducts((prev) =>
//     prev.includes(productId)
//       ? prev.filter((id) => id !== productId)  //again click to remove
//       : [...prev, productId]
//   );
  

// };
//====we add=====
const handleLike = async (productId) => {
  const id = String(productId);

  try {
    const response = await handlewishlist(id);

    console.log("Wishlist update:", response);

    // Use the wishlist returned by the backend
    const wishlistIds = response.wishlist.map((item) =>
      String(item)
    );

    setLikedProducts(wishlistIds);
  } catch (error) {
    console.error(
      "Wishlist error:",
      error.response?.data || error.message
    );

    alert(
      error.response?.data?.message ||
      "Unable to update wishlist"
    );
  }
};
//====we add=====

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


const handleApplyFilters = async () => {
  try {
    const products = await getFilteredProducts(
      minPrice,
      maxPrice,
      sortBy
    );

    setallData(products);
    setShowFilter(false);

  } catch (error) {
    console.error(
      "Filter error:",
      error.response?.data || error.message
    );

    alert(
      error.response?.data?.message ||
      "Unable to filter products"
    );
  }
};

return(
    <div>
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



            {/* DISCOUNT BAR */}
            <div className="product-1">
                <h2>
                    ENJOY FESTIVE DISCOUNT! FREE SHIPPING ABOVE 999!
                </h2>
            </div>

 
  <div className="product-2">
    <div className="product-2-0">
        <h1>All Products</h1>
      <p><a href="">Home</a> › <a href="">Product</a></p>
    </div>
        {/* we add this section for filter */}


<div className="product-2-1">

  {/* FILTER BUTTON */}
  <button
    className={`filter-button ${showFilter ? "active" : ""}`}
    onClick={() => setShowFilter(!showFilter)}
  >
    <FiSliders className="filter-main-icon" />
    <span>Filter & Sort</span>
    <span className="filter-count">
      {minPrice > 0 || maxPrice < 5000 ? "1" : ""}
    </span>
    {showFilter ? <FiX /> : <span className="filter-chevron">⌄</span>}
  </button>

  {/* FILTER DROPDOWN */}
  <div className={`filter-options ${showFilter ? "show" : ""}`}>

    {/* HEADER */}
    <div className="filter-heading">
      <div className="filter-heading-icon">
        <FiSliders />
      </div>

      <div className="filter-heading-text">
        <h3>Filter Products</h3>
        <p>Find your perfect fragrance</p>
      </div>

      <button
        className="filter-close"
        onClick={() => setShowFilter(false)}
        aria-label="Close filters"
      >
        <FiX />
      </button>
    </div>

    <div className="filter-divider"></div>

    {/* PRICE FILTER */}
    <div className="price-filter">

      <div className="price-filter-heading">
        <h4>
          <FiDollarSign />
          Price Range
        </h4>
        <span className="price-range-value">
          ₹{minPrice} – ₹{maxPrice}
        </span>
      </div>

      <p className="price-filter-subtitle">
        Choose a budget for your fragrance
      </p>

      {/* MINIMUM PRICE */}
      <div className="price-control">
        <div className="price-control-label">
          <span>Minimum price</span>
          <strong>₹{minPrice}</strong>
        </div>

        <input
          type="range"
          min="0"
          max="5000"
          step="100"
          value={minPrice}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value <= maxPrice) setMinPrice(value);
          }}
          aria-label="Minimum price"
        />
      </div>

      {/* MAXIMUM PRICE */}
      <div className="price-control">
        <div className="price-control-label">
          <span>Maximum price</span>
          <strong>₹{maxPrice}</strong>
        </div>

        <input
          type="range"
          min="0"
          max="5000"
          step="100"
          value={maxPrice}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value >= minPrice) setMaxPrice(value);
          }}
          aria-label="Maximum price"
        />
      </div>

      <button
        className="price-reset"
        onClick={() => {
          setMinPrice(0);
          setMaxPrice(5000);
        }}
      >
        <FiRotateCcw />
        Reset Price
      </button>
    </div>

    <div className="filter-divider"></div>

    {/* SORT OPTIONS */}
    <div className="sort-filter">

      <h4>
        <FiSliders />
        Sort By
      </h4>

      {[
        { label: "Relevance", icon: <FiCheck /> },
        { label: "Newest First", icon: <FiArrowUp /> },
        { label: "Popularity", icon: <FiCheck /> },
        { label: "Price: Low to High", icon: <FiArrowUp /> },
        { label: "Price: High to Low", icon: <FiArrowDown /> }
      ].map((option) => (
        <button
          key={option.label}
          className={`filter-option ${
            sortBy === option.label ? "selected" : ""
          }`}
          onClick={() => setSortBy(option.label)}
        >
          <span>{option.label}</span>

          <span className="filter-option-icon">
            {sortBy === option.label ? <FiCheck /> : option.icon}
          </span>
        </button>
      ))}
    </div>

    {/* FOOTER BUTTONS */}
    <div className="filter-footer">
      <button
        className="filter-clear"
        onClick={() => {
          setMinPrice(0);
          setMaxPrice(5000);
          setSortBy("Relevance");
        }}
      >
        Reset All
      </button>

      <button
  className="filter-done"
  onClick={handleApplyFilters}
>
  Apply Filters
</button>
    </div>

  </div>
</div>


    
    
  </div>

     {/* product */}<br/>
    <br/>
          
   
   <div className="product-container">
     
      {allData.map((product)=>(
       
     

        <div className="product-card" key={product._id}>

    
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

       <div className="product-image">
        <Link to={`/productpage2/${product._id}`}>          {/* ee diviyil click chyumbol ee link varum with click chymbpolulla productid ,-->pass to productpage2 */}

        {/* <img  src={`http://localhost:7000/uploads/${product.image}`}/> */}

        
                {/* take data from clounary */}

                <img
                src={product.image}
                alt={product.name}
                 />
        </Link>
        </div>
         <div className="product-details">

           <h3>
             {product.name}
             <br/>
            {/* {product.type} */}
           </h3>
            </div>

            <div className="product-price">
                <strong>{product.price}</strong>
                <del>{product.saleprice}</del>
                  

</div>


 <button className="cart-button-product"
                  type="button" onClick={()=>{handleAddToCart(product)}}
                >
                  Add to Cart
                </button>
           
             
            </div>
 

      ))}

   </div>
   





<div className="section-4">
    <button>Load more</button>
</div>
<br/>
<br/>


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