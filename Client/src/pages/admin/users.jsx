import {
  FiGrid,
  FiPackage,
  FiTag,
  FiUsers,
  FiShoppingCart,
  FiEdit,
  FiHome,
  FiEye,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import "./users.css"


const Customers=[
  {id:1,name:"jazil",phone:"1234567891",email:"jazil@gmail.com"},
  {id:1,name:"jazil",phone:"1234567891",email:"jazil@gmail.com"},
  {id:1,name:"jazil",phone:"1234567891",email:"jazil@gmail.com"}
]

export const Users=()=>{



    return(
        <div className="category">
       
       <div className="category-nav">

         <h2>Dashtar</h2>

       <Link to="Dashboard"><FiGrid/>  Dashboard</Link>
       <br/>
       <br/>
       <br/>
       
       <Link to="Product"><FiPackage/>  Product</Link>
       <br/>
       <br/>
       <br/>


       <Link to="Categories"><FiHome/>  Categories</Link>
       <br/>
       <br/>
       <br/>


       <Link to="Offer"><FiTag/>  Offer</Link>
       <br/>
       <br/>
       <br/>

       <Link to="Customer"><FiUsers/>  Customer</Link>
       <br/>
       <br/>
       <br/>


       <Link to="order"><FiShoppingCart/>  order</Link>
       <br/>
       <br/>
       <br/>

    

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
    )
}