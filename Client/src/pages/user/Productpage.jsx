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
} from "react-icons/fi";
import axios from "axios"
import { useEffect, useState } from "react"
// import { fetchproduct } from "../../../../Server/controllers/ProductController"



export const Products=()=>{
 const[allData,setallData]=useState([])
  const fechproduct=async()=>{
    let res=await axios.get('http://localhost:7000/product')
    setallData(res.data)
  }
useEffect(()=>{
  fechproduct()
},[])
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

            <Link to="/profile">
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
      <p><a href="">Home</a> <a href="">Product</a></p>
    </div>
    <div className="product-2-1">
        <p>Sort By:<Link to="Relevance">Relevance</Link><Link to="Newest First">Newest First</Link> <Link to="Popularity">Popularity</Link><Link to="Price--Low to High">Price--Low to High</Link><Link to="Price--High to Low">Price--High to Low</Link><button>filter</button></p>
        </div>
    
  </div>

     {/* product */}<br/>
    <br/>
          
   
   <div className="product-container">
     
      {allData.map((product)=>(
        <Link to={`/productpage2/${product._id}`}>          {/* ee diviyil click chyumbol ee link varum with click chymbpolulla productid ,-->pass to productpage2 */}
        <div className="product-card" key={product._id}>
       
       <div className="product-image">
        <img  src={`http://localhost:7000/uploads/${product.image}`}/>
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
                  type="button"
                >
                  Add to Cart
                </button>
           
             
            </div>
 </Link>

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