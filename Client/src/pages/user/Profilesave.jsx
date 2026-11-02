import "./profilesave.css";
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
  FiEdit 
} from "react-icons/fi";
    
import img1 from "../../assets/sub4.png"

import { FaBuilding } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";
import UserService from "../../service/user-api-services/UserService";
import axios from "axios";


const product=[
    {id:1,orderid:"#FRG10234",image:img1,name:"Autograph eau de parfum 100ml for men",Qty: "1",price:"₹2,499"},
    {id:2,orderid:"#FRG10234",image:img1,name:"Autograph eau de parfum 100ml for men",Qty: "1",price:"₹2,499"}

]


export const Profilesave = () => {
  const [selectedReturnProduct, setSelectedReturnProduct] = useState(null);
  const [returnReason, setReturnReason] = useState("");
const [isreturn, setIsreturn] = useState(false);
const [itemreturn, setItemreturn] = useState(null);
 const [remove, setRemove] = useState(null);
const [cancel, setCancel] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
// userDeatils
const[prfedit,setPrfedit]=useState(false)
 const {takeediteddata,updateAddress,createAddress,profiledata,userDeatils,setPrimaryAddress,fetchaddress,takeorder,handlecancel,removeproductdetails,requestReturn}=UserService()
const [allData, setAllData] = useState([]);   
     
 const[Editsave,setEditsave]=useState({
    // user: "", not fill from front end
  fullName:"",
  phone:"",
  street:"",
  city:"",
  state:"",
  zip:"",
  country:"",
  alternativePhone:"",
  landmark:""
 })

 const [selectedAddressId, setSelectedAddressId] = useState(null);                                     //{id:123324}
 const[order,setOrder]=useState(false)

//  const[addaddressdata,setAddAddressdata]=useState({
//   fullName:"",
//   phone:"",
//   street:"",
//   city:"",
//   state:"",
//   zip:"",
//   country:"",
//   alternativePhone:"",
//   landmark:""

//  })

const [displayorder,setdisplayorder]=useState([])

  const [adresssection, setadresssection] = useState(false);

const [addAddress, setAddAddress] = useState(false);

const [editAddress, setEditAddress] = useState(false);

const [editsave,seteditsave]=useState(false)

 const[user,setUser]=useState({
  name:"",
  email:"",
  phone:"",
  dateOfBirth:"",
  gender:""
 })

 const profileadd=(e)=>{       
  setUser((prev)=>({
    ...prev,
    [e.target.name]:e.target.value
  }))

 }

const sendaddress=async()=>{
  // await axios.post("http://localhost:7000/api/auth",user)
  try{
  await profiledata(user)
  console.log("data added")
   setPrfedit(false)
  }
  catch(error){
    console.log("data not added")
  }
}

 const fetchuser=async()=>{
   try{
   // let response=await axios.get('http://localhost:7000//api/auth/userdetails') to avoid repeated api call we use userservice.jsx
   let response=await userDeatils()
    console.log("USER DATA FROM API:", response);   //name,email,phone etc-->take from User.js enna collection
   setUser(response)
   }
     catch (error) {
     console.error("API error:", error.response?.data || error.message);
   }
 }
 
 useEffect(()=>{
   fetchuser();
   fetchediteduser();
   fetchorder();

 },[])
 
 console.log(user)
 
 const handlechange=(e)=>{
  setEditsave((prev)=>(
    {
      ...prev,
      [e.target.name]:e.target.value
    }
  ))
 }

const handlesave = async () => {
  try {
    await updateAddress(selectedAddressId, Editsave);   //editchytha data save chyyenda userinte id-->selectedAddressId

    alert("Address updated successfully");

    seteditsave(false);
    setEditAddress(false);

    // Fetch the latest address data from MongoDB
    await fetchediteduser();

  } catch (error) {
    console.error(
      "Address update error:",
      error.response?.data || error.message
    );
  }
};

// ========to take edited data from Address collection=======

const fetchediteduser = async () => {
  try {
    const response = await takeediteddata();

    const sortedData = [...response].sort((a, b) => {             //spred operter
      return (
        new Date(b.updatedAt || b.createdAt || 0) -             //നിന്റെ code-ൽ ഓരോ address-ന്റെയും date താരതമ്യം ചെയ്ത് ഏറ്റവും പുതിയ address ആദ്യം വരുന്നതുപോലെ sort ചെയ്യുകയാണ്.
        new Date(a.updatedAt || a.createdAt || 0)                //createdAt	Address ആദ്യമായി create ചെയ്ത സമയം  updatedAt	Address അവസാനമായി update ചെയ്ത സമയം b.updatedAt - a.UpdatedAt=value posti display b
      );
    });

    setAllData(sortedData);                                             //sort:-  editeddata  latest updated   setAllData(sortedData);     
  } catch (error) {                                                             //Address B — October 14        allData[0] index
    console.error(                                                              //Address C — October 12        allData[1] index
      "Fetch address error:",                                                   //Address A — October 10        allData[2] index
      error.response?.data || error.message
    );
  }
};

//addaddressbutton
const handleAddAddress = async () => {
  try {
    // await axios.post("http://localhost:7000/address")
    await createAddress(Editsave);

    alert("Address added successfully");
 await fetchediteduser();
    setAddAddress(false);

    setEditsave({
      fullName: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      alternativePhone: "",
      landmark: ""
    });

    await fetchediteduser();

  } catch (error) {
    console.error(
      "Add address error:",
      error.response?.data || error.message
    );

    alert(
      error.response?.data?.message ||
      "Failed to add address"
    );
    setAddAddress(false);

  }
};
//======================start============================//

// const[user,setUser]=useState({})
// const fetchuser=async()=>{
//   try{
//   // let response=await axios.get('http://localhost:7000//api/auth/userdetails') to avoid repeated api call we use userservice.jsx
//   let response=await userDeatils()
//    console.log("USER DATA FROM API:", response);
//   setUser(response)
//   }
//     catch (error) {
//     console.error("API error:", error.response?.data || error.message);
//   }
// }

// useEffect(()=>{
//   fetchuser()
// },[])

console.log(user)

//=========add 19======
const handleSetPrimary = async (addressId) => {
  try {
    await setPrimaryAddress(addressId);

    // Refresh addresses from MongoDB
    await fetchediteduser();

    alert("Primary address updated successfully");
  } catch (error) {
    console.error(
      "Set primary address error:",
      error.response?.data || error.message
    );

    alert("Failed to set primary address");
  }
};
// ======================end============================//

 //======to take the order details from backend=========

const fetchorder = async () => {
  try {
    const response = await takeorder();

    console.log("ORDER RESPONSE:", response);
    console.log("ORDERS ARRAY:", response.data);

    setdisplayorder(response.data || []);
  } catch (error) {
    console.error(
      "Fetch order error:",
      error.response?.data || error.message
    );
  }
};

const handleconform=async(id)=>{
  await handlecancel(id)
  await fetchorder()
}

//remove the ordered product
const removeproduct = async (id) => {
  try {
    setRemove(null);
    setCancel(true);

    const response = await removeproductdetails(id);

    setRemove(response);
    console.log("Specific order details:", response);
  } catch (error) {
    console.error(
      "Fetch specific order error:",
      error.response?.data || error.message
    );

    setCancel(false);
    alert("Unable to fetch this order's details.");
  }
};

//when user click rreturn button that specific data need to fetch (call same function when user click cancel button)
const handlereturndetails = async (id) => {
  try {
    setItemreturn(null);
    setReturnReason("");

    const response = await removeproductdetails(id);

    console.log("Return order details:", response);

    if (!response || !response._id) {
      alert("Order details not found");
      return;
    }

    setItemreturn(response);
    setIsreturn(true);
  } catch (error) {
    console.error(
      "Return details error:",
      error.response?.data || error.message
    );

    alert("Unable to fetch return order details");
  }
};

const cancelproduct = async (productId, reason) => {
  // Send productId and reason to the backend
  return await requestReturn(productId, reason);
};
  return (
    <div className="profilesave">

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
           <div className="profileiconcolor">
            <Link to="/profilesave">
              <FiUser />
            </Link>
            </div>

          </div>

        </div>

      </div>



       <div className="full-data">

        <div className="profilesave-data">

          <h1>Profile</h1>

          <h4>
            Home › Profile
          </h4>

        </div> 


        {/* PROFILE BUTTONS */}

         {/* <div className="profilesave-button">

          <div className="profilesave-button1">
            <button
  onClick={() => {
    setOrder(false);
    setadresssection(false);
  }}
>
  Profile
</button>
          </div>

          <div className="profilesave-button2">
           <button
  onClick={() => {
    setadresssection(true);
    setOrder(false);
  }}
>
  Address
</button>
          </div>

          
<div className="profilesave-button3">
  <button
    onClick={() => {
      setOrder(true);
      setadresssection(false);
      setAddAddress(false);
      setEditAddress(false);
      setPrfedit(false);
      seteditsave(false);
    }}
  >
    My Order
  </button>
</div>

        </div>  */}

        {/* ============we add==========21 */}
        <div className="profilesave-button">

  <button
    className={activeTab === "profile" ? "tab-active" : ""}
    onClick={() => {
      setActiveTab("profile");
      setadresssection(false);
      setOrder(false);
      setAddAddress(false);
      setEditAddress(false);
      seteditsave(false);
      setPrfedit(false);
    }}
  >
    Profile
  </button>

  <button
    className={activeTab === "address" ? "tab-active" : ""}
    onClick={() => {
      setActiveTab("address");
      setadresssection(true);
      setOrder(false);
      setAddAddress(false);
      setEditAddress(false);
      seteditsave(false);
      setPrfedit(false);
    }}
  >
    Address
  </button>

  <button
    className={activeTab === "order" ? "tab-active" : ""}
    onClick={() => {
      setActiveTab("order");
      setOrder(true);
      setadresssection(false);
      setAddAddress(false);
      setEditAddress(false);
      seteditsave(false);
      setPrfedit(false);
    }}
  >
    My Order
  </button>

</div>
        
      {/* ================= PROFILE SECTION ================= */}
 
      {/*  //=============================strat==========================//*/}

      {activeTab === "profile" && (
  
   <div className="profile-inputs">

  <div className="profile-input-1">
    <label htmlFor="">Full Name</label>
    <br/>
    <input type="text" value={user.name || ""} readOnly />
    <br/>
    <br/>
       <label htmlFor="">Date of Birth</label>
    <br/>
    <input type="date" value={user.dateOfBirth} ></input>

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
    
  <button onClick={() => setPrfedit(true)}>
  Edit
</button>

  </div>

     </div>

     )}

      {/*  //=============================end==========================//*/}


{/*================== move to profile.jsx ======================*/}
        {/* PROFILE INPUTS */}
        {/* Blur the background when popup opens */}
{/* Background blur */}
{prfedit && (
  <div
    className="profile-blur-overlay"
    onClick={() => setPrfedit(false)}
  ></div>
)}

{/* Your existing popup */}
{prfedit && (
  <div className="profile-edit-popup">
    {/* Keep all your existing form fields here */}
         <div className="profilesave-inputs"> 

          {/* COLUMN 1 */}

           <div className="profilesave-input-1"> 

            <label>Full Name</label>

            <br />

            <input
              type="text" name="name"
              value={user.name} onChange={profileadd}
            />

            <br />
            <br /> 

        

            <label>Date of Birth</label>
<input
  type="date"
  name="dateOfBirth"
  value={user.dateOfBirth}
  onChange={profileadd}
  required
/>

          </div>
 

          {/* COLUMN 2 */}

           <div className="profilesave-input-2">

            <label>Email</label>

            <br />

            <input
              type="email" name="email"
              value={user.email}  onChange={profileadd}
            />

            <br />
            <br />

            <label>Gender</label>

<select
  name="gender"
  value={user.gender}
  onChange={profileadd}
  required
>
  <option value="">Select Gender</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
  <option value="Other">Other</option>
</select>
          </div> 


          {/* COLUMN 3 */}

          <div className="profilesave-input-3">

            <label>Phone Number</label>

            <br />

            <input
              type="text" name="phone" value={user.phone}  onChange={profileadd}
            />

            <br />
            <br />

            

            <br /> 
             <br />

            <button onClick={sendaddress}
           
            >
              Save
            </button>

          </div>

        </div>
        </div>
        )}

      </div>
 

      {/* ================================================= ==============================*/}
      {/* ================= ADDRESS SECTION =============== =======================*/}
      {/* ================================================= =======================================*/}
{adresssection && (
      <div className="dataaaas">

        {/* ADDRESS BUTTONS */}

        {/* <div className="address-buttons">

          <div className="address-button1">
        <button
  onClick={() => {
    setadresssection(false);
    setAddAddress(false);
    setEditAddress(false);
  }}
>
  Profile
</button>
          </div>

          <div className="address-button2">
            <button>
              Address
            </button>
          </div>

          <div className="address-button3">
            <button
    onClick={() => {
      setOrder(true);
      setadresssection(false);
      setAddAddress(false);
      setEditAddress(false);
      setPrfedit(false);
      seteditsave(false);
    }}
  >
    My Order
  </button>
          </div>

          <div className="add-address">
            {/* changehappen */}
              <div className="add-address">
            <button
  onClick={() => {
    setEditsave({
      fullName: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      alternativePhone: "",
      landmark: ""
    });

    setAddAddress(true);
    setEditAddress(false);
    seteditsave(false);
  }}
>
  Add Address
</button>
          </div> 

       


        {/* ADDRESS DETAILS =====================================================================================================*/}
{/* ```jsx================= */}
<div className="address-details">
  {allData.length > 0 ? (
    allData.map((address) => (
      <div className="address-details-1" key={address._id}>
       <button                                                            //we add this 19
  type="button"
  onClick={() => handleSetPrimary(address._id)}
  disabled={address.isDefault}
>
  {address.isDefault ? "Primary Address ✓" : "Set Primary Address"}
</button>
        <h3>
          {address.fullName}

          <span className="office">
            <FaBuilding /> Address
          </span>

          <button
            onClick={() => {
              setSelectedAddressId(address._id);

              setEditsave({
                fullName: address.fullName || "",
                phone: address.phone || "",
                street: address.street || "",
                city: address.city || "",
                state: address.state || "",
                zip: address.zip || "",
                country: address.country || "",
                alternativePhone: address.alternativePhone || "",
                landmark: address.landmark || "",
              });

              setEditAddress(true);
              seteditsave(false);
            }}
          >
            <FiEdit /> Edit
          </button>
        </h3>

        <p>
          {address.street}, {address.city},
          {address.state} - {address.zip}
          <br />
          {address.country}
          {address.landmark && (
            <>
              <br />
              Landmark: {address.landmark}
            </>
          )}
        </p>

        <span className="phone">
          <FiPhone /> {address.phone}
        </span>
      </div>
    ))
  ) : (
    <p>No address found. Please add an address.</p>
  )}
</div>
{/* //============== */}

      </div>


)}
{/* //    add address button--> appeare this section */}
{/* Blur background when Add Address popup opens */}
{addAddress && (
  <div
    className="profile-blur-overlay"
    onClick={() => setAddAddress(false)}
  ></div>
)}

{/* Add Address popup===================================================================================== */}
{addAddress && (
  <div className="add-address-og">
    {/* Keep all your existing address form fields here */}
         <h2>Address Type</h2>

         <button className="btn11"><FiHome/> Home</button>
         <button className="btn-12"><FiBriefcase/>Office</button>
         <button className="btn-12"><FiMapPin />Other</button>
         <br/>
          <div className="add-input">


            <div className="name-add">
         <label htmlFor="">Full Name</label><br/>
         <input type="text" name="fullName" value={Editsave.fullName} placeholder="Enter full name" onChange={handlechange}/>
         </div>


                <div className="name-add1">
         <label htmlFor="">Phone Number</label><br/>
         <input type="text" name="phone" value={Editsave.phone} placeholder="Enter 10-digit mobile number" onChange={handlechange}/>
         </div>


         </div>
         <br/>
            <div className="text-area">
         <label htmlFor="">Address</label><br/>
       <textarea
       rows="5"
       name="street" value={Editsave.street}
       placeholder="Enter house or building details" onChange={handlechange}/>

       </div>
   
   <div className="all-small-inputs">
       <div className="eachone">
       <div className="small-inputs">
         <label htmlFor="">City/District</label><br/>
         <input type="text" name="city" value={Editsave.city} placeholder="Enter City/District" onChange={handlechange}/>
       </div>
<br/>

        <div className="small-inputs">
         <label htmlFor="">PinCode</label><br/>
         <input type="text" name="zip" value={Editsave.zip} placeholder="Enter state" onChange={handlechange}/>
       </div>

       </div>


<div className="eachone">
       <div className="small-inputs12">
         <label htmlFor="">State</label><br/>
         <input type="text" name="state" value={Editsave.state} placeholder="Enter state" onChange={handlechange}/>
       </div>
<br/>
        <div className="small-inputs12">
         <label htmlFor="">Alternative Phone number(Optional)</label><br/>
         <input type="text" name="alternativePhone" value={Editsave.alternativePhone} placeholder="Enter state" onChange={handlechange}/>
       </div>

       </div>
      
<div className="eachone12">

<label htmlFor="">Land Mark</label><br/>
<div>
<input type="text" name="landmark" value={Editsave.landmark}  placeholder="Enter state"  onChange={handlechange}/>
</div>
{/* here */}

{/* we add country */}

 <div className="small-inputs22">

  <label htmlFor="country">Country</label>
  <br />
  <select
    id="country"
    name="country"
    value={Editsave.country}
    onChange={handlechange}
  >
    <option value="">Select Country</option>
    <option value="India">India</option>
    <option value="United States">United States</option>
    <option value="United Kingdom">United Kingdom</option>
    <option value="Canada">Canada</option>
    <option value="Australia">Australia</option>
    <option value="United Arab Emirates">United Arab Emirates</option>
    <option value="Saudi Arabia">Saudi Arabia</option>
    <option value="Singapore">Singapore</option>
    <option value="Malaysia">Malaysia</option>
    <option value="Germany">Germany</option>
    <option value="France">France</option>
    <option value="Japan">Japan</option>
  </select>

</div>
</div>



</div>
<button
// changehappen
  onClick={handleAddAddress}
  className="add-save"
>
  Save
</button>
      </div>


)}

    
{/* ============ EDIT ADDRESS ============ */}
{/* Blur outside background */}
{/* Blur background when Edit Address opens */}
{/* Blur background */}
{editAddress && (
  <div
    className="edit-address-overlay"
    onClick={() => setEditAddress(false)}
  />
)}

{/* Edit Address popup */}
{editAddress && (
  <div className="edit-address-og">
    {/* Keep your existing edit address form here */}
    {/* Keep all your existing edit address form fields here */}
    {/* Keep your existing edit address form here */}
    <h2>Address Type</h2>
    <br />

    <button type="button" className="btn11">
      <FiHome /> Home
    </button>

    <button type="button" className="btn-12">
      <FiBriefcase /> Office
    </button>

    <button type="button" className="btn-12">
      <FiMapPin /> Other
    </button>

    <br />

    <div className="add-input">
      <div className="name-add">
        <label>Full Name</label>
        <br />
        <input
          type="text"
          value={Editsave.fullName}
          readOnly
        />
      </div>

      <div className="name-add1">
        <label>Phone Number</label>
        <br />
        <input
          type="text"
          value={Editsave.phone}
          readOnly
        />
      </div>
    </div>

    <br />

    <div className="text-area">
      <label>Address</label>
      <br />
      <textarea
        rows="5"
        value={Editsave.street}
        readOnly
      />
    </div>

    <div className="all-small-inputs">
      <div className="eachone">
        <div className="small-inputs">
          <label>City/District</label>
          <br />
          <input type="text" value={Editsave.city} readOnly />
        </div>

        <br />

        <div className="small-inputs">
          <label>PinCode</label>
          <br />
          <input type="text" value={Editsave.zip} readOnly />
        </div>
      </div>

      <div className="eachone">
        <div className="small-inputs12">
          <label>State</label>
          <br />
          <input type="text" value={Editsave.state} readOnly />
        </div>

        <br />

        <div className="small-inputs12">
          <label>Alternative Phone Number</label>
          <br />
          <input
            type="text"
            value={Editsave.alternativePhone}
            readOnly
          />
        </div>
      </div>

      <div className="eachone12">
        <div>
          <label>Landmark</label>
          <br />
          <input type="text" value={Editsave.landmark} readOnly />
        </div>

        <div className="country">
          <label>Country</label>
          <br />
          <input type="text" value={Editsave.country} readOnly />
        </div>
      </div>
    </div>
<br/>
    <button
      onClick={() => {
        setEditAddress(false);
        seteditsave(true);
      }}
      className="add-save"
    >
      Edit
    </button>
  </div>
)}



{/* ===============chage edit save=============== */}

   <br/>
   <br/>
 {/* Blur outside the popup */}
{editsave && (
  <div
    className="last-class-overlay"
    onClick={() => setEditsave(false)}
  />
)}

{/* Edit section popup */}
{editsave && (
  <div className="last-class1">
    {/* Keep your existing form and inputs here */}
     
         <h2>Address Type</h2>
    
         <button className="btn111"><FiHome/> Home</button>
         <button className="btn-121"><FiBriefcase/> Office</button>
         <button className="btn-121"><FiMapPin /> Other</button>
         <br/>
          <div className="add-input">


            <div className="name-add">
         <label htmlFor="">Full Name</label><br/>
         <input type="text" name="fullName" value={Editsave.fullName} onChange={handlechange}/>
         </div>


                <div className="name-add1">
         <label htmlFor="">Phone Number</label><br/>
         <input type="text" name="phone" value={Editsave.phone} onChange={handlechange}/>
         </div>


         </div>
         <br/>
            <div className="text-area">
         <label htmlFor="">Address</label><br/>
       <textarea
       rows="5"
        name="street" value={Editsave.street} onChange={handlechange}/>

       </div>
   
   <div className="all-small-inputs">
       <div className="eachone">
       <div className="small-inputs">
         <label htmlFor="">City/District</label><br/>
         <input type="text" name="city" value={Editsave.city} onChange={handlechange}/>
       </div>
<br/>

        <div className="small-inputs">
         <label htmlFor="">PinCode</label><br/>
         <input type="text" name="zip" value={Editsave.zip} onChange={handlechange}/>
       </div>

       </div>


<div className="eachone">
       <div className="small-inputs12">
         <label htmlFor="">State</label><br/>
         <input type="text" name="state" value={Editsave.state} onChange={handlechange}/>
       </div>
<br/>
        <div className="small-inputs12">
         <label htmlFor="">Alternative Phone number(Optional)</label><br/>
         <input type="text" name="alternativePhone" value={Editsave.alternativePhone} onChange={handlechange}/>
       </div>

       

       </div>
      
<div className="eachone12">
<div>
<label htmlFor="">Land Mark</label><br/>
<input type="text" name="landmark" value={Editsave.landmark} onChange={handlechange}/>
</div>

{/* we add country */}

 <div className="small-inputs22">

  <label htmlFor="country">Country</label>
  <br />
  <select
    id="country"
    name="country"
    value={Editsave.country}
    onChange={handlechange}
  >
    <option value="">Select Country</option>
    <option value="India">India</option>
    <option value="United States">United States</option>
    <option value="United Kingdom">United Kingdom</option>
    <option value="Canada">Canada</option>
    <option value="Australia">Australia</option>
    <option value="United Arab Emirates">United Arab Emirates</option>
    <option value="Saudi Arabia">Saudi Arabia</option>
    <option value="Singapore">Singapore</option>
    <option value="Malaysia">Malaysia</option>
    <option value="Germany">Germany</option>
    <option value="France">France</option>
    <option value="Japan">Japan</option>
  </select>

</div>

</div>




</div>
<br/>

<button onClick={()=>{handlesave()}} className="add-save">
   Save
</button>

</div>
)}


{/* //====myorder======== */}
{order && (
<div className="myorder">
   
  {/* <div className="profilesave-button">

          <div className="profilesave-button34">
          <button
  onClick={() => {
    setOrder(false);
    setadresssection(false);
  }}
>
  Profile
</button>
          </div>

          <div className="profilesave-button2">
             <button
  onClick={() => {
    setadresssection(true);
    setOrder(false);
  }}
>
  Address
</button>
          </div>

          <div className="profilesave-button1">
            <button>My Order</button>
          </div>

        </div> */}

       

<div className="lastdata">
  {displayorder.length > 0 ? (
    displayorder.map((value) => (
      <div className="fulldata" key={value._id}>
        <div className="order-header">
          <h4>Order ID: {value._id}</h4>

          <button
            className={
              value.deliveryStatus === "Delivered"
                ? "delivered"
                : "outdelivery"
            }
          >
            {value.deliveryStatus || "Pending"}
          </button>
       {value.deliveryStatus === "Delivered" ? (
<button
  className="return-btn"
  onClick={() => handlereturndetails(value._id)}
>
  Return
</button>
) : (
  <button
  className="cancel-btn"
  onClick={() => removeproduct(value._id)}
>
  Cancel
</button>
)}
        </div>

   


        {value.orderItems?.map((item, index) => (
          <div className="lastsection1" key={item._id || index}>
            <div className="lastimage">
              {/* <img
                src={
                  item.product?.image
                    ? `http://localhost:7000/uploads/${item.product.image}`
                    : img1
                }
                alt={item.product?.name || "Product"}
              /> */}
           
           {/* to takeimage from clounary */}

         <img src={item.product?.image || img1}/>

            </div>

            <div className="lastdetails">
              <h6>
                {item.product?.name || "Product unavailable"}
              </h6>

              <h6>Qty: {item.quantity}</h6>

              <h6>
                ₹{item.product?.saleprice ??
                  item.product?.price ?? 0}
              </h6>
            </div>
          </div>
        ))}

        <h4>Total: ₹{value.totalPrice}</h4>
        <p>Payment: {value.paymentMethod}</p>
<p>
  Order Date:{" "}
  {value.createdAt
    ? new Date(value.createdAt).toLocaleDateString("en-IN")
    : "Date unavailable"}
</p>
        <p>Payment status: {value.paymentStatus}</p>
      </div>
    ))
  ) : (
    <p>No orders found.</p>
  )}
</div>


    </div>

)}

 {cancel && remove && (
  <div className="cancel-section">
    <h3>Cancel Order</h3>

    <p>
      <strong>Order ID:</strong> {remove._id}
    </p>

    <p>
      <strong>Order Status:</strong>{" "}
      {remove.deliveryStatus || "Pending"}
    </p>

    <h4>Order Items</h4>

    {remove.orderItems?.map((item, index) => (
      <div
        className="cancel-item"
        key={item._id || index}
      >
        {/* <img
          src={
            item.product?.image
              ? `http://localhost:7000/uploads/${item.product.image}`
              : img1
          }
          alt={item.product?.name || "Product"}
        /> */}
             {/* to take image from clounary we use */}

            <img src={item.product?.image || img1}/>
        <div>
          <p>
            {item.product?.name || "Product unavailable"}
          </p>

          <p>Quantity: {item.quantity}</p>

          <p>
            Price: ₹
            {item.product?.saleprice ??
              item.product?.price ??
              0}
          </p>
        </div>
      </div>
    ))}

    <p>
      <strong>Total Amount:</strong> ₹{remove.totalPrice}
    </p>

    <p>
      <strong>Payment Method:</strong>{" "}
      {remove.paymentMethod}
    </p>

    <p>
      <strong>Payment Status:</strong>{" "}
      {remove.paymentStatus}
    </p>

    <p>
      <strong>Order Date:</strong>{" "}
      {remove.createdAt
        ? new Date(remove.createdAt).toLocaleDateString("en-IN")
        : "Date unavailable"}
    </p>

    <div className="cancel-actions">
      <button
        type="button"
        onClick={() => {
          setCancel(false);
          setRemove(null);
        }}
      >
        Close
      </button>

      <button
        type="button"
        className="confirm-cancel-btn"
        onClick={async () => {
          await handleconform(remove._id);
          setCancel(false);
          setRemove(null);
        }}
      >
        Confirm Cancellation
      </button>
    </div>
  </div>
)}


       
{isreturn && itemreturn && (
  <div className="return-overlay">
    <div className="return-popup">

      <button
        type="button"
        className="return-close"
        onClick={() => {
          setIsreturn(false);
          setItemreturn(null);
          setSelectedReturnProduct(null);
          setReturnReason("");
        }}
      >
        ✕
      </button>

      <h2>Return Order Details</h2>

      <div className="return-info">
        <p>
          <strong>Order ID:</strong> {itemreturn._id}
        </p>

        <p>
          <strong>Order Status:</strong>{" "}
          {itemreturn.deliveryStatus || "Pending"}
        </p>

        <p>
          <strong>Payment Method:</strong>{" "}
          {itemreturn.paymentMethod || "Not available"}
        </p>

        <p>
          <strong>Payment Status:</strong>{" "}
          {itemreturn.paymentStatus || "Not available"}
        </p>

        <p>
          <strong>Order Date:</strong>{" "}
          {itemreturn.createdAt
            ? new Date(itemreturn.createdAt).toLocaleDateString("en-IN")
            : "Date unavailable"}
        </p>
      </div>

      <h3>Ordered Products</h3>

      <div className="return-products">
        {itemreturn.orderItems?.map((item, index) => (
          <div className="return-item" key={item._id || index}>
            {/* <img
              src={
                item.product?.image
                  ? `http://localhost:7000/uploads/${item.product.image}`
                  : img1
              }
              alt={item.product?.name || "Product"}
            /> */}
                 {/* to take image from clounary */}
            <img src={item.product?.image || img1}/>


            <div className="return-item-details">
              <h4>{item.product?.name || "Product unavailable"}</h4>
              <p>Quantity: {item.quantity}</p>
              <p>
                Price: ₹
                {item.product?.saleprice ??
                  item.product?.price ?? 0}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="return-total">
        <strong>Total Amount:</strong>
        <strong>₹{itemreturn.totalPrice ?? 0}</strong>
      </div>

      <div className="return-reason">
        <label htmlFor="returnReason">Select Return Reason</label>

        <select
          id="returnReason"
          value={returnReason}
          onChange={(e) => setReturnReason(e.target.value)}
        >
          <option value="">-- Choose a reason --</option>
          <option value="Damaged Product">Damaged Product</option>
          <option value="Wrong Item Received">Wrong Item Received</option>
          <option value="Defective Product">Defective Product</option>
          <option value="Item Not as Described">Item Not as Described</option>
          <option value="Size/Color Mismatch">Size/Color Mismatch</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="return-actions">
        <button
          type="button"
          onClick={() => {
            setIsreturn(false);
            setItemreturn(null);
            setSelectedReturnProduct(null);
            setReturnReason("");
          }}
        >
          Close
        </button>

       <button
  type="button"
  disabled={!returnReason}
  onClick={async () => {
    try {
      const productId = itemreturn.orderItems?.[0]?.product?._id;

      if (!productId) {
        alert("Product ID not found");
        return;
      }

      await cancelproduct(productId, returnReason);

      alert("Return request submitted successfully");

      setIsreturn(false);
      setItemreturn(null);
      setReturnReason("");
    } catch (error) {
  console.error("Return request failed:", error);
  console.error("Backend response:", error.response?.data);

  alert(
    error.response?.data?.message ||
    error.message ||
    "Failed to submit return request"
  );
}
  }}
>
  Submit Return
</button>
      </div>

    </div>
  </div>
)}
      </div>
  );
};