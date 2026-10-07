import { Link } from "react-router-dom"
import "./paymentsuccess.css"
import {
  FiShoppingCart,
  FiBell,
  FiUser,
  FiSearch,
  FiTruck,
  FiPlus,
  FiHome,
  FiBriefcase,
  FiMapPin,
  FiCreditCard,
  FiCircle,
  FiCheckCircle,
  FiDollarSign,
  FiPhone,
  FiShield,
  FiHeadphones,
  FiMail,
  FiInstagram,
  FiFacebook,
  FiYoutube,
  FiLinkedin,
    FiStar,
} from "react-icons/fi";
import {
  FaMoneyBillWave,
  FaUniversity,
FaCheck

} from "react-icons/fa";

import {
  SiGooglepay,
  SiPhonepe
} from "react-icons/si";


import Image1 from "../../assets/sub4.png"

export const Paymentsuccess=()=>{




    return(
       

<div className="Paymentsuccess">

    <div className="payment-nav">
        
   <div className="payment-head">
    <h1>Fragranzia</h1>
   </div>
   <div className="payment-sections">
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


<div className="payment-search">
    <  FiSearch/>
        <input type="text" placeholder="Search here"></input>
</div>

<div className="payment-icons">
    <FiShoppingCart/>
    <FiBell/>
    <FiUser/>

</div>
   

    </div>

<div className="Paymentsucess-blur">

<div className="payment-section-2">

    <div className="payment-section-2-1">

        <div className="payment-section-2-1-img">
            <div>
            <img src={Image1}/>
              </div>

              <div className="payment-imgdatails">
                <h2>Autograph eau de parfum 100ml for men</h2>
                <h5>Auograph<span>4.5<FiStar/></span></h5>
                <br/>
               <div className="count-button">
                   
                <button>-</button> 1 <button>+</button>
           

                </div>
                   <br/>
                <h2>Rs 899  <span1>Rs 2000</span1> <span2>61% off</span2></h2>
                <br/>

                <h3>Delivered by August 29, Free delivery  <FiTruck/> </h3>
               <h4>7 day return policy</h4>
              </div>


        </div>
         
         <div className="priceDeatails">
            <h1>Price Details</h1>
            <h2>Price(1 item)<span>RS 899</span><span1>RS 2000</span1></h2>
              <h2>Discount(61%)<span2>RS 1101</span2></h2>
              <h2>Delivary charge<span3>Free Delivary</span3></h2>
              <hr/>
              <h2>Total Amount<span4>RS 899</span4></h2>


         </div>

    </div>
</div>


<div className="personal-details">
    <h1>Personal Details</h1>
    <div className="details-pay">
       <Link to="/adress">Add adress</Link>
    </div>

     <div className="details-pay">
      <Link to="/Home"><FiHome/>Home</Link>
    </div> <div className="details-pay">
       <Link to="/Office"><FiBriefcase />Office</Link>
    </div>
     <div className="details-pay">
       <Link to="/Other"><FiMapPin />Other</Link>
    </div>
</div>
<div className="payment-address">
    <div className="personal-details">
    <h2>Address</h2>
    <div className="border">

        <h2>Rohan Jaison </h2>
        <h3>Apartment No. 104, Emerald Heights Opposite Lulu Mall Edappally,<br/> Kochi Kerala682024 <br/>+91 9876543210</h3>
   
    </div>
    </div>

<div className="payment-methods">

  <h2>Payment Methods</h2>

  <label className="payment-option">
    <div className="payment-left">
      <SiGooglepay />
      <span>Google Pay</span>
    </div>

    <input type="radio" name="payment" defaultChecked />
  </label>


  <label className="payment-option">
    <div className="payment-left">
      <FaMoneyBillWave />
      <span>Cash on delivery (cash/UPI)</span>
    </div>

    <input type="radio" name="payment" />
  </label>


  <label className="payment-option">
    <div className="payment-left">
      <SiPhonepe />
      <span>Paytm/Phone Pay/Amazon Pay etc</span>
    </div>

    <input type="radio" name="payment" />
  </label>


  <label className="payment-option">
    <div className="payment-left">
      <FiCreditCard />
      <span>Credit/Debit card</span>
    </div>

    <input type="radio" name="payment" />
  </label>


  <label className="payment-option">
    <div className="payment-left">
      <FaUniversity />
      <span>Net Banking</span>
    </div>

    <input type="radio" name="payment" />
  </label>


  <button className="pay-now">
    Pay Now
  </button>

</div>
</div>






</div>

<div className="section-success">
   <div className="section-success-1">
  <div className="Facheck">
<FaCheck/>
</div>

<div className="sucess-data">
<h1>Thank You for Ordering!</h1>
<p>Your order has been successfully placed.<br/> We're preparing it for shipment</p>
<br/>
<button>Back to Home</button>
<button>Track Order</button>
</div>


</div>

</div>


</div>
           

       
    )
}