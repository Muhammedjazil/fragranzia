import {
  FiGrid,
  FiPackage,
  FiTag,
  FiUsers,
  FiShoppingCart,
  FiEdit,
  FiHome,
  FiEye,
  FiX
} from "react-icons/fi";
import { Link } from "react-router-dom";
import "./user.css"


const Customers=[
  {id:1,name:"jazil",phone:"1234567891",email:"jazil@gmail.com"},
  {id:1,name:"jazil",phone:"1234567891",email:"jazil@gmail.com"},
  {id:1,name:"jazil",phone:"1234567891",email:"jazil@gmail.com"}
]
export const User=()=>{
    return(
        <div className="User">
          <div className="category">
       <div className="category-nav">
         <h2>Dashtar</h2>
       <Link to="Dashboard"><FiGrid/>  Dashboard</Link>
       <br/><br/><br/>
       <Link to="Product"><FiPackage/>  Product</Link>
       <br/><br/><br/>
       <Link to="Categories"><FiHome/>  Categories</Link>
       <br/><br/><br/>
       <Link to="Offer"><FiTag/>  Offer</Link>
       <br/><br/><br/>
       <Link to="Customer"><FiUsers/>  Customer</Link>
       <br/><br/><br/>
       <Link to="order"><FiShoppingCart/>  order</Link>
       <br/><br/><br/>
    <div className="category-logout">
       <br/>
     <button>LOg Out</button>
    </div>
       </div>

       <div className="category-content">
        <h1>User List</h1>
        <p>manage registerd customer account and status</p>
        <br/>
        <div className="cetegory-customers">
        <div className="cutomer-nav">
          <div>Name </div>
          <div>Phone</div>
          <div>Email</div>
          <div>Actions</div>
          <div>Status</div>
        </div>
         {Customers.map((user)=>(
          <div className="cus-details" key={user.id}>
            <div>{user.name}</div>
            <div className="cust-phone">{user.phone}</div>
            <div className="cust-email">{user.email}</div>
            <div className="cust-show"><button><FiEye/>show</button></div>
            <div className="cust-block"><button>block</button></div>
            </div>
         ))}
        </div>
       </div>
         </div>

{/* Modal Overlay and Content */}
<div className="modal-backdrop">
  <div className="modal-card">
    <div className="modal-header-section">
      <div className="user-details-modal">
        <h2>User Details</h2>
      </div>
      <div className="user-details-1">
        <FiX />
      </div>
    </div>
    <br/>
    <div className="user-deatails-name">
      <label>FULL NAME</label><br/>
      <h3>user 1</h3>
    </div>
    <div className="user-deatails-name">
      <label>EMAIL ADDRESS</label><br/>
      <h3>user1@gmail.com</h3>
    </div>
    <div className="user-deatails-name">
      <label>PHONE NUMBER</label><br/>
      <h3>1122334455</h3>
    </div>
    <div className="user-deatails-status">
      <div className="user-deatails-active">
        <label>ACCOUNT STATUS</label><br/>
        <button>Active</button>
      </div>
      <div className="user-deatails-role">
        <label>ROLE</label><br/>
        <button>User</button>
      </div>
    </div>
    <div className="user-deatails-name">
      <label>JOINED DATE</label><br/>
      <h3>June 26, 2026 at 11:10 AM</h3>
    </div>
    <div className="user-button">
      <button>Close</button>
    </div>
  </div>
</div>

        </div>
    )
}