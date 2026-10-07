import "./Lastaddress.css"
import { Link } from "react-router-dom";

import {
  FiShoppingCart,
  FiBell,
  FiUser,
  FiSearch,
  FiPhone,
  FiHome,
  FiBriefcase,
  FiMapPin,
} from "react-icons/fi";

import img1 from "../../assets/sub4.png"

import { FaBuilding } from "react-icons/fa";
import { useState } from "react";

const allData=[
    {id:1,orderid:"#FRG10234",image:img1,name:"Autograph eau de parfum 100ml for men",Qty: "1",price:"₹2,499"},
    {id:2,orderid:"#FRG10234",image:img1,name:"Autograph eau de parfum 100ml for men",Qty: "1",price:"₹2,499"}

]

export const Lastaddress=()=>{

 
return(
    <div>
        {/* ================= NAVBAR ================= */}

      <div className="profilesave-nav">

        <div className="profilesave-head">
          <h1>Fragranzia</h1>
        </div>

        <div className="profilesave-sections">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/Products">Products</Link>
            </li>

            <li>
              <Link to="/Gifting">Gifting</Link>
            </li>

            <li>
              <Link to="/About">About</Link>
            </li>
          </ul>
        </div>

        <div className="profilesave-search">
          <FiSearch />

          <input
            type="text"
            placeholder="Search here"
          />
        </div>

        <div className="profilesave-icons">

          <FiShoppingCart />

          <FiBell />

          <span>
            <FiUser />
          </span>

        </div>

      </div>


         <div className="lastbuttons">
        <div className="profilesave-data">
<br/>
<br/>
          <h1>Profile</h1>
       <br/>
          <h4>
            Home › Profile
          </h4>

        </div>



               {/* PROFILE BUTTONS */}

        <div className="profilesave-button">

          <div className="profilesave-button3">
            <button> <Link to='/profilesave'>Profile</Link></button>
          </div>

          <div className="profilesave-button2">
            <button>Address</button>
          </div>

          <div className="profilesave-button1">
            <button>My Order</button>
          </div>

        </div>

    </div>
     
<div className="lastdata">

  {allData.map((value, index) => (

    <div className="fulldata" key={value.id}>

      {/* ORDER ID */}
      <div className="order-header">
        <h4>Order ID: {value.orderid}</h4>

        {index === 0 ? (
          <button className="delivered">Delivered</button>
        ) : (
          <button className="outdelivery">out for delivery</button>
        )}
      </div>

      {/* IMAGE + DETAILS */}
      <div className="lastsection1">

        <div className="lastimage">
          <img src={value.image} />
        </div>

        <div className="lastdetails">
          <h6>{value.name}</h6>
          <h6>Qty: {value.Qty}</h6>
          <h6>{value.price}</h6>
        </div>

      </div>

    </div>

  ))}

</div>

    </div>
)

}