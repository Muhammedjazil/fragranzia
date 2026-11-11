import {
  FiGrid,
  FiPackage,
  FiTag,
  FiUsers,
  FiShoppingCart,
  FiEdit,
  FiHome,
  FiEye,
  FiLogOut,
  FiX,
   FiMenu
} from "react-icons/fi";
import { Link } from "react-router-dom";
import "./users.css"
import { useEffect, useState } from "react";
import AdminService from "../../service/admin-api-services/AdminService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
//=======registred customers=======

export const Users=()=>{
const navigate=useNavigate()
// const [menuOpen, setMenuOpen] = useState(false);
const[show,setshow]=useState({})
const[user,setUser]=useState([])
const[showdisplay,setshowdisplay]=useState(false)

const {fetchcustomer,changeisactive}=AdminService()
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
const handlelogout=async()=>{
  localStorage.removeItem("token");
  toast.success("Logout successfully!");
  navigate("/signin")
}

    return(
        <div className="category">
       
      
            {/* Sidebar Navigation */}
                        {/* <div className="category-nav">
  <div className="nav-header">
    <h2>Dashtar</h2>

    <button
      type="button"
      className="hamburger"
      onClick={() => setMenuOpen(!menuOpen)}
      aria-label="Toggle navigation"
    > */}
      {/* {menuOpen ? <FiX /> : <FiMenu />}
    </button>
  </div>

  <div className={`category-nav-links ${menuOpen ? "active" : ""}`}>
    <Link to="/Dashboard" onClick={() => setMenuOpen(false)}>
      <FiGrid /> Dashboard
    </Link>

    <Link to="/Product" onClick={() => setMenuOpen(false)}>
      <FiPackage /> Product
    </Link>

    <Link to="/Categories" onClick={() => setMenuOpen(false)}>
      <FiHome /> Categories
    </Link> */}

    {/* <Link to="Offer" onClick={() => setMenuOpen(false)}>
      <FiTag /> Offer
    </Link> */}
{/* 
    <Link to="/Customer" onClick={() => setMenuOpen(false)}>
      <FiUsers /> Customer
    </Link>

    <Link to="/order" onClick={() => setMenuOpen(false)}>
      <FiShoppingCart /> Order
    </Link> */}

    {/* <div className="category-logout">
      <button onClick={handlelogout}><FiLogOut /> Log Out</button>
    </div>
  </div>
</div> */}


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
             
  <button
    className={user.isActive ? "active-status" : "blocked-status"}
    onClick={() => handleactive(user._id)}
  >
    {user.isActive ? "Active" : "Blocked"}
  </button>

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