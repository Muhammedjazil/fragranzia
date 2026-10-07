import "./category1.css"
import {
  FiGrid,
  FiPackage,
  FiTag,
  FiUsers,
  FiShoppingCart,
  FiEdit,
  FiHome,
  FiEye,
  FiPlus,
  FiX
} from "react-icons/fi";
import { Link } from "react-router-dom";

const newcategory=[
    {id:1,name:"Home & Kitchen",description:"Home & Kitchen"},
    {id:2,name:"Home & Kitchen",description:"Home & Kitchen"},
     {id:3,name:"Home & Kitchen",description:"Home & Kitchen"},
    {id:4,name:"Home & Kitchen",description:"Home & Kitchen"},
     {id:5,name:"Home & Kitchen",description:"Home & Kitchen"},
    {id:6,name:"Home & Kitchen",description:"Home & Kitchen"},
     {id:7,name:"Home & Kitchen",description:"Home & Kitchen"},
    {id:8,name:"Home & Kitchen",description:"Home & Kitchen"}, 
    {id:9,name:"Home & Kitchen",description:"Home & Kitchen"},
    {id:10,name:"Home & Kitchen",description:"Home & Kitchen"}
]
export const Category1=()=>{


    return(
        <div className="Categories-1">

           
        <div className="category-11">

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
     <button>Log Out</button>
    </div>

   </div>

<div className="category-12">
    <div className="category-13">
    <div className="category-13-1">
        <button>Export</button>
        </div>
        <div className="category-13-2">
        <button>Import</button>
        </div>
         <div className="category-13-3">
        <button><FiPlus/> Add Category</button>
        </div>
        
    </div>

    <div className="category-14">
<div className="category-14-1">

<div className="category-14-1-1">
<div className="category-name-1">Name</div>
<div>Description</div>
<div>Action</div>
<div>Status</div>
</div>

</div>

<div className="inputs-categories">
    {newcategory.map((user)=>(
        <div className="allinput-category" key={user.id}>
            <div className="category-name">{user.name}</div>
            <div className="category-des">{user.description}</div>
            <div className="category-button1"> <button> <FiEdit/>Edit</button></div>
            <div className="category-button-2"> <button> Bolck</button></div>
            </div>
    ))}
</div>

    </div>
       <div className="all-button-category">

         <div className="category-previous">
        <button>previous</button>
    </div>
       <div>
        <p>Page 1 of 2</p>
       </div>
    <div className="category-next">
        <button>next</button>
    </div>
    </div>
</div>

        </div>
  <div className="all-add-category">
     <div className="add-categories-1">
        <div className="add-add">
        <h1>Add Category</h1>
        </div>
         <div className="add-cross">
        <h1><FiX/></h1>
        </div>
     </div>
  <br/>
  <label htmlFor="">Name</label><br/>
  <input type="text" placeholder="category title"/>
  <br/>
  <br/>
  <label htmlFor="">Description</label><br/>
  <textarea
  rows="3"
  />
  <br/>
  <br/>
  <div className="cancel-add-buttons">

<div className="cancel12">
    <button>Cancel</button>
</div>
<div className="add12">
    <button>Add Category</button>
</div>
  </div>
</div>



        </div>
    )
}