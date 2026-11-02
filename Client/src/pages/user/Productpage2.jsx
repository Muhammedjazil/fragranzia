import "./productpage2.css"
import { Link, useParams } from "react-router-dom";    //useParams

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
import Image16 from "../../assets/sub20.jpg";
import Image17 from "../../assets/sub21.jpg";


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
  FiStar,
  FiShare,
  FiHeart,
  FiTag 
} from "react-icons/fi";
import axios from "axios";
import { useEffect, useState } from "react";
import UserService from "../../service/user-api-services/UserService";
// const products = [
//   {
//     id: 1,
//     image: Image7,
//     name: "Autograph Eau De Parfum 100ml",
//     type: "For Men",
//     price:  "RS:899",
//     oldPrice: "RS:1400",
//   },
//   {
//     id: 2,
//     image: Image8,
//     name: "Kyros Eau De Parfum 100ml",
//     type: "For Men",
//     price: "RS:899",
//     oldPrice: "RS:2000",
//   },
//   {
//     id: 3,
//     image: Image9,
//     name: "Autograph Eau De Parfum 100ml",
//     type: "For Men",
//     price:  "RS:899",
//     oldPrice: "RS:1400",
//   },
//   {
//     id: 4,
//     image: Image10,
//     name: "Royal Eau De Parfum 100ml",
//     type: "For Men",
//     price:  "RS:899",
//     oldPrice:  "RS:1400",
//   },
//   {
//     id: 5,
//     image: Image11,
//     name: "Royal Eau De Parfum 100ml",
//     type: "For Men",
//     price:  "RS:899",
//     oldPrice: "RS:1400",
//   },
//   {
//     id: 6,
//     image: Image6,
//     name: "Royal Eau De Parfum 100ml",
//     type: "For Men",
//     price:  "RS:899",
//     oldPrice: "RS:1400",
//   },
//   {
//     id: 7,
//     image: Image7,
//     name: "Royal Eau De Parfum 100ml",
//     type: "For Men",
//     price:  "RS:899",
//     oldPrice: "RS:1400",
//   },
// ];   
                   //imp:-dbsilu imagete our id aanu ,image store chyynath uploadsilanu,evade dbilee image id use chyth uploadsni aa image edukkunnu........
export function Productpage2(){

 const {addToCart,handlewishlist,getWishlist,fechData,fetchimage}=UserService()
  const[allData,setalldata]=useState([])

  const[product,setproduct]=useState(null)     //store the itration

   const { id } = useParams();    //productpage-->click-->vanna id

    const [likedProducts, setLikedProducts] = useState([]);


const Scrole = (amount) => {
    const container = document.querySelector(".productpage2-product");

    container.scrollBy({
        left: amount,
        behavior: "smooth"
    });
};
   const loadProducts = async () => {
  try {
    const data = await fechData();
    setalldata(data);
  } catch (error) {
    console.error("Error fetching products:", error);
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


  // const fetchimage=async()=>{                                           //to avoid repeated API call we need to use userservice
  //   let res=await axios.get(`http://localhost:7000/product/image/${id}`)  //to product   , ee idlee iteration venam  so it take from productcollection
  //     setproduct(res.data) //
  // }

const loadProductImage = async () => {
  try {
    const data = await fetchimage(id);
    setproduct(data);
  } catch (error) {
    console.error("Error fetching product:", error);
  }
};
  useEffect(()=>{
    loadProductImage();
    loadProducts();
    fetchWishlist();
    getWishlist();
  },[])

  if (!product) {
  return <h2>Loading...</h2>;
}
//======addtocart========

const handleAddToCart = async (product) => {
  console.log("Selected product:", product);
console.log("Product ID:", product._id);
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

//================heart=================

const handleLike = async(productId) => {
// const response=await axios.post(`http://localhost:7000/wishlist/${id}`)
  const response=await handlewishlist(productId)

  setLikedProducts((prev) =>
    prev.includes(productId)
      ? prev.filter((id) => id !== productId)  //again click to remove
      : [...prev, productId]
  );
  

};



return(

        <div className="Productpage2">
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


    <div className="productpage-section-2">

      <p> Home  › Product › {product.name} </p> 
    </div> <br/>
<div className="productpage-section-2-0">
<div className="productpage-section-2-1">
    {/* <img src={`http://localhost:7000/uploads/${product.image}`}/>       product enna iterationalee.image  -->from uploads */}
     
     {/* to take image from clounary we use  */}

     <img src={product.image} alt={product.name} />
<br/>
  {/* <img src={`http://localhost:7000/uploads/${product.image}`}/>  */}
  <img src={product.image} alt={product.name} />
<br/>

  {/* <img src={`http://localhost:7000/uploads/${product.image}`}/>  */}
<img src={product.image} alt={product.name} />
</div>
<div className="productpage-section-2-2">
    {/* <img src={`http://localhost:7000/uploads/${product.image}`}/>    product enna iterationalee.image  -->from uploads */}
 <img src={product.image} alt={product.name} />
    <br/>
    <button className="puchase">Purchase Now</button>
    <br/>
                     <button
             className="cart-button"
            type="button"
            onClick={() => handleAddToCart(product)}
            >
               Add to Cart
             </button>

                {/*we add this 27/10  */}
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

</div>
    <div className="productpage-section-2-3">

    <h2>{product.name}</h2>

    <h3>Autograph</h3>

    <h3>
        4.5 <FiStar /> 1,000 Ratings
    </h3>

    <h4>Hurry only few stocks left!</h4>

    <h2>
        {product.price}
        <span1>{product.saleprice}</span1>
        <span2>61% off</span2>
    </h2>


    <h2>Delivery</h2>

    <p>
        Delivery by 28 Aug, Wednesday | Free
        <br />
        if ordered before 9:24 PM
    </p>

    <h2>Description</h2>
    
    <p>
      {product.description}
        {/* This fragrance exudes a confident and enigmatic personality.
        <br />
        Its composition features a top note of lemon and mandarin with a
        <br />
        twist of apple that enhances the freshness. The heart reveals a
        <br />
        warm blend of high-grade lavender and a hint of cinnamon,
        <br />
        beautifully wrapped in patchouli, musk, and vanilla to ensure a
        <br />
        powerful and flowing scent. */}
    </p>
   <div className="available">
     <h2> Available Offers</h2>
     <p>  <FiTag/>Buy two of the same product and get a third one free.</p>
     <p>  <FiTag/>Enjoy free standard shipping on orders exceeding ₹1,399.</p>
     <p>  <FiTag/>Get 15% off your first order</p>
     <p>  <FiTag/>Receive a free tool case with the purchase of any perfume<br/> over ₹2,000</p>
</div>
</div>
    </div>
    <div className="newhead">
      <h1>Suggested for you</h1>
</div>
    
 <div className="productpage-section-3">

    <button  onClick={()=>{Scrole(-350)}}> ‹</button>

    <button  onClick={()=>{Scrole(350)}}>›</button>

 </div>
{/* product */}
<div className="productpage2-product">
  
    {allData.map((user)=>(
        <div className="key"
        key={user._id}>
            <div className="product2-image">
             {/* <img src= {`http://localhost:7000/uploads/${user.image}`}/>  */}
             {/* ${user.image}==imageid,imageid--->uploadslee ee imageidilee image(uplodsilee image id aanu dbsil store aakunne)  */}
                
                <img src={user.image} alt={user.name} />
                
                </div>
                <div className="product2-name">
                    {user.name}
                    </div>
                    <div className="product2-type">
                        {user.type}
                        </div>
                        <div className="product2-prive">
                            {user.price}
                            </div>
                            <div className="product2-old">
                                 RS {user.saleprice}

                                <br/>

                                   <button
             className="cart-button"
            type="button"
            onClick={() => handleAddToCart(user)}
            >
               Add to Cart
             </button>
                                </div>
        </div>
    ))}
</div>





{/* ======footer========= */}



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
