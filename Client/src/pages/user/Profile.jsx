import "./profile.css"
import { Link } from "react-router-dom"
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


export const Profile=()=>{




    return(
        <div className="profile">
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
               <span2>
            <Link to="/profile">
              <FiUser />
            </Link>
            </span2>

          </div>

        </div> 
        </div>      
          
          <div className="data-full">
 <div className="profile-data">
   
   <br/>
   <br/>
    <h1>Profile</h1>
    <h4>Home  › Profile</h4>
 </div>
<div className="profile-button">
    
    <div className="profile-button1">
    <button>Profile</button>
     </div>

       
    <div className="profile-button2">
    <button>Address</button>
     </div>

       <div className="profile-button3">
    <button> <Link to='/last'>My Order</Link></button>
     </div>
         
</div>

     <div className="profile-inputs">

  <div className="profile-input-1">
    <label htmlFor="">Full Name</label>
    <br/>
    <input type="text" placeholder="Thomas"></input>
    <br/>
    <br/>
       <label htmlFor="">Date of Birth</label>
    <br/>
    <input type="number" placeholder="10/2/2004"></input>

  </div>

   <div className="profile-input-2">
    <label htmlFor="">Email</label>
    <br/>
    <input type="email" placeholder="thomas12@gmail.com" ></input>
    <br/>
    <br/>
       <label htmlFor="">Gender</label>
    <br/>
    <input type="text" placeholder="Male"></input>

  </div>


   <div className="profile-input-3">
    <label htmlFor="">Phone Number</label>
    <br/>
    <input type="number" placeholder="+91 98765 43210"></input>
    <br/>
    <br/>
       <label htmlFor="">Password</label>
    <br/>
    <input type="password" placeholder="********"></input>

    <br/>
    <br/>
    <button><Link to='/profilesave'>Edit</Link></button>

  </div>

     </div>
</div>
        </div>
    )
}