import "./profile.css"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
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

import UserService from "../../service/user-api-services/UserService";

export const Profile=()=>{

 const {userDeatils}=UserService()

const[user,setUser]=useState({})
const fetchuser=async()=>{
  try{
  // let response=await axios.get('http://localhost:7000//api/auth/userdetails') to avoid repeated api call we use userservice.jsx
  let response=await userDeatils()
   console.log("USER DATA FROM API:", response);
  setUser(response)
  }
    catch (error) {
    console.error("API error:", error.response?.data || error.message);
  }
}

useEffect(()=>{
  fetchuser()
},[])

console.log(user)


    return(
        <div className="profile">
         {/* <div className="home-fullnav">

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

          </div> */}


          {/* SEARCH */}

          {/* <div className="home-navsearch">

            <FiSearch />

            <input
              type="text"
              placeholder="Search products..."
            />

          </div> */}


          {/* ICONS */}

          {/* <div className="home-navicons">

            <Link to="/cart">
              <FiShoppingCart />
            </Link>

            <Link to="/notifications">
              <FiBell />
            </Link>
               <span>
            <Link to="/profile">
              <FiUser />
            </Link>
            </span>

          </div>

        </div> 
        </div>       */}
          
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
    <input type="text" value={user.name || ""} readOnly />
    <br/>
    <br/>
       <label htmlFor="">Date of Birth</label>
    <br/>
    <input type="number" value={user.dateOfBirth} ></input>

  </div>

   <div className="profile-input-2">
    <label htmlFor="">Email</label>
    <br/>
   <input type="email" value={user.email || ""} readOnly />
    <br/>
    <br/>
       <label htmlFor="">Gender</label>
    <br/>
    <input type="text" value={user.gender}/>

  </div>


   <div className="profile-input-3">
    <label htmlFor="">Phone Number</label>
    <br/>
   <input type="text" value={user.phone} readOnly />
    <br/>
    <br/>
      
    <br/>
    <Link to='/profilesave'>
    <button>Edit</button></Link>

  </div>

     </div>
</div>

      

      </div>
 

    )
}