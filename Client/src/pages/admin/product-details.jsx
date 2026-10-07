
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
import "./product-details.css"
import { Link } from "react-router-dom";

const Details=[
    {id:1,name:"shirt",category:"dress",price:"500",saleprice:"500",stock:"5"},
    {id:1,name:"shirt",category:"dress",price:"500",saleprice:"500",stock:"5"},
    {id:1,name:"shirt",category:"dress",price:"500",saleprice:"500",stock:"5"},
    {id:1,name:"shirt",category:"dress",price:"500",saleprice:"500",stock:"5"},
    {id:1,name:"shirt",category:"dress",price:"500",saleprice:"500",stock:"5"},
    {id:1,name:"shirt",category:"dress",price:"500",saleprice:"500",stock:"5"},
    {id:1,name:"shirt",category:"dress",price:"500",saleprice:"500",stock:"5"},
    {id:1,name:"shirt",category:"dress",price:"500",saleprice:"500",stock:"5"},
    {id:1,name:"shirt",category:"dress",price:"500",saleprice:"500",stock:"5"}


]


export const ProductDetails=()=>{


    return(
        <div className="Product-details">

 <div className="Product-table-og">

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

   <div className="product-table2">

   <div className="table-details">

    <div className="table-bttons">

<button>Export</button>
<button>Import</button>

   </div>
   <div className="talbe-add">
    <button><FiPlus/> Add Product</button>
   </div>
   </div>
<div className="product-table-3">

   <div className="product-table">

    <div className="product-title">
     
  <div><h2>Product Name</h2></div>
  <div className="heads"><h2>Category</h2></div>
  <div className="heads"><h2>Price</h2></div>
  <div className="heads"><h2>Sale Price</h2></div>
  <div className="heads"><h2>Stock</h2></div>
  <div className="heads"><h2>Actions</h2></div>
  <div className="heads"><h2>Status</h2></div>


    </div>

    <div className="product-map">

{Details.map((user)=>(
    <div className="product-inputs" key={user.id}>
        <div className="shirt">{user.name}</div>
        <div className="dress">{user.category}</div>
        <div className="price">{user.price}</div>
        <div className="saleprice">{user.saleprice}</div>
        <div className="stock">{user.stock}</div>
      
       <div className="product-mapbuttons">

       <div className="product-mapbuttons1">
        <button><FiEye/>Show</button>
</div>

<div className="product-mapbuttons2">
        <button><FiEdit/>Edit</button>
</div>

       </div>

       <div className="product-mapstatus">
        <button>Block</button>
        </div>

        </div>
))}

    </div>

   </div>

</div>

</div>

        </div>



      {/* <div className="og-details">
          <h2><FiEye/>ProductDetails</h2>
          <br/>
          <div className="all-details">

          <div className="img-update">
            <label htmlFor="">PRODUCT IMAGE</label>
            <br/>
            <div className="details-input">
            <input type="file" multiple accept="image/png, image/jpeg, image/webp"/>
          </div>
          </div>
          
          
          <div className="all-product">
            
         <label htmlFor="">PRODUCT NAME</label>
         <p>Shirt</p>
         <br/>
         <label htmlFor="">Category</label><br/>
         <h5>dress</h5>
         <br/>
        
        <div className="price-details">

        <div className="regular">
         <label htmlFor="">Regular price</label>
           <h4>500</h4>
       </div>
         <br/>
         
           <div className="sale">
         <label htmlFor="">Sale price</label>
    <h4>500</h4>
       </div>


       </div>  

         </div>
          </div>
          <br/>
          <div className="descriptiuon-details">
            <label htmlFor="">Description</label>
            <br/>
            <textarea
            rows="5"
            />
          </div>

          <div className="details-button">
            <div className="cancel-details">
                <button>Cancel</button>
            </div>

             <div className="edit-details">
                <button><FiEdit/>edit product</button>
            </div>
          </div>

      </div> */}

      <div className="cross-1">

        <FiX/>
      </div>
      

        </div>
    )
}