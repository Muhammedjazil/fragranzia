import {
  FiGrid,
  FiPackage,
  FiTag,
  FiUsers,
  FiShoppingCart,
  FiEdit,
  FiHome,
  FiEye,
  FiLogOut 
} from "react-icons/fi";
import { Link } from "react-router-dom";
import "./users.css"
import { useEffect, useState } from "react";
import UserService from "../../service/user-api-services/UserService";
//=======registred customers=======

export const Users=()=>{
const[show,setshow]=useState({})
const[user,setUser]=useState([])
const[showdisplay,setshowdisplay]=useState(false)

const {fetchcustomer,changeisactive}=UserService()
  const handleshow=(user)=>{
    setshow({
      name:user.name,
      email:user.email,
      phone:user.phone 
    })
setshowdisplay(true)
 
  }
  const fetchusers=async()=>{
    const response=await fetchcustomer()
    setUser(response)
  }
useEffect(()=>{
  fetchusers()
},[])

const handleactive = async (id) => {
  try {
    await changeisactive(id);

    // Fetch the updated customer list from backend
    await fetchusers();

  } catch (error) {
    console.log(
      "Status update failed:",
      error.response?.data || error.message
    );
  }
};

    return(
        <div className="category">
       
      
            {/* Sidebar Navigation */}
            <div className="category-nav">
               <h2>Dashtar</h2>
               <Link to="Dashboard"><FiGrid/>   Dashboard</Link>
               
               <Link to="/Product"><FiPackage/>   Product</Link>
               
               <Link to="/Categories"><FiHome/>   Categories</Link>
             
               <Link to="Offer"><FiTag/>   Offer</Link>
              
               <Link to="/Customer"><FiUsers/>   Customer</Link>
               
               <Link to="/order"><FiShoppingCart/>   order</Link>
             
           
               <div className="category-logout">
                  <br/>
                  <button> <FiLogOut /> Log Out</button>
               </div>
            </div>


     <div className="category-content">
  <h1>User List</h1>
  <p>manage registered customer account and status</p>
  <br />

  <div className="cetegory-customers">
    <table className="customer-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Actions</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {user.map((user) => (
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.phone || "Not provided"}</td>
            <td>{user.email}</td>

            <td>
                <button
    className="cust-show"
    onClick={() => {
      handleshow(user);
   
    }}
  >
    <FiEye /> Show
  </button>
            </td>

            <td>
              <td>
  <button
    className={user.isActive ? "active-status" : "blocked-status"}
    onClick={() => handleactive(user._id)}
  >
    {user.isActive ? "Active" : "Blocked"}
  </button>
</td>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
{showdisplay  &&(
    <div className="showclass">
      <h2>User Details</h2>
      <label htmlFor="">FULL NAME</label><br/>
          <h5>{show.name}</h5>
      <label htmlFor="">EMAILADDRESS</label><br/>

          <h5>{show.email}</h5>
      <label htmlFor="">PHONENUMBER</label><br/>

          <h5>{show.phone}</h5>
          <div className="details-all">
            <div>
      <label htmlFor="">ACCOUNT STATUS</label><br/>
        <h6>active</h6>
      </div>

      <div>
      <label htmlFor=""> ROLE</label><br/>
      <span>User</span>
        
      </div>
          </div>

      <label htmlFor=""> JOINED DATE</label><br/>

<h5>June 26,2026 at 11:10AM</h5>
        
  <button onClick={()=>{setshowdisplay(false)}}>close</button>
    </div>

)}


        </div>
    )
}