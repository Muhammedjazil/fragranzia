import "./address.css"
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
  FiBriefcase,
} from "react-icons/fi";
import { FaBuilding } from "react-icons/fa";

export const Address=()=>{
     


    return(
        <div className="address">
             

             <div className="address-nav">
        
        
             
   <div className="address-head">
    <h1>Fragranzia</h1>
   </div>
   <div className="address-sections">
  <ul>
    <li>
    <Link to='/'>Home</Link>
    </li>
    <li>
    <Link to='/Products'>Products</Link>
    </li>
    <li>

    <Link to='/Gifting'>Gifting</Link>
    </li>
<li>
    <Link to='/About'>About</Link>
    </li>

    </ul>
</div>


<div className="address-search">
    <  FiSearch/>
        <input type="text" placeholder="Search here"></input>
</div>

<div className="address-icons">
    <FiShoppingCart/>

    <FiBell/>
    <span>
    <FiUser/>
    </span>

</div>



        </div>

<div className="address-header">
    <h1>Profile</h1>
   
    <h4>Home   › Address</h4>
</div>

<div className="address-buttons">

<div className="address-button1">
    <button>Profile</button>
</div>

<div className="address-button2">
    <button>Address</button>
</div>

<div className="address-button3">
    <button>My Order</button>
</div>

<div className="add-address">
    <button>Add Address</button>
</div>

</div>
<br />

<div className="address-details">

<div className="address-details-1">
    <h3>Address 2   <span1> <FaBuilding />Office</span1></h3>
    <br/>
    <p>Helpstir Technologies 3rd Floor, Lulu Cyber Tower Infopark Phase 2<br/>
Kakkanad, Kochi – 682042
<br/>  <span2> <FiPhone/>+91 98765 43210</span2>  </p>
</div>

</div>

        </div>
    )
}