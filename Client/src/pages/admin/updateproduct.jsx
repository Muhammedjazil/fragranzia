// import "./updateproduct.css"

// import {
//   FiGrid,
//   FiPackage,
//   FiTag,
//   FiUsers,
//   FiShoppingCart,
//   FiEdit,
//   FiHome,
//   FiEye,
//   FiPlus,
//   FiX
  
// } from "react-icons/fi";
// import { Link } from "react-router-dom";

// const Details=[
//     {id:1,name:"shirt",category:"dress",price:"500",saleprice:"500",stock:"5"},
//     {id:1,name:"shirt",category:"dress",price:"500",saleprice:"500",stock:"5"},
//     {id:1,name:"shirt",category:"dress",price:"500",saleprice:"500",stock:"5"},
//     {id:1,name:"shirt",category:"dress",price:"500",saleprice:"500",stock:"5"},
//     {id:1,name:"shirt",category:"dress",price:"500",saleprice:"500",stock:"5"},
//     {id:1,name:"shirt",category:"dress",price:"500",saleprice:"500",stock:"5"},
//     {id:1,name:"shirt",category:"dress",price:"500",saleprice:"500",stock:"5"},
//     {id:1,name:"shirt",category:"dress",price:"500",saleprice:"500",stock:"5"},
//     {id:1,name:"shirt",category:"dress",price:"500",saleprice:"500",stock:"5"}


// ]
// export const Updateproduct=()=>{


//     return(
//    <div className="update-product-og">

//         <div className="update-product">
//        <div className="Product-table-og">
     
//                   <div className="category-nav">
     
//               <h2>Dashtar</h2>
     
//             <Link to="Dashboard"><FiGrid/>  Dashboard</Link>
//             <br/>
//             <br/>
//             <br/>
            
//             <Link to="Product"><FiPackage/>  Product</Link>
//             <br/>
//             <br/>
//             <br/>
     
     
//             <Link to="Categories"><FiHome/>  Categories</Link>
//             <br/>
//             <br/>
//             <br/>
     
     
//             <Link to="Offer"><FiTag/>  Offer</Link>
//             <br/>
//             <br/>
//             <br/>
     
//             <Link to="Customer"><FiUsers/>  Customer</Link>
//             <br/>
//             <br/>
//             <br/>
     
     
//             <Link to="order"><FiShoppingCart/>  order</Link>
//             <br/>
//             <br/>
//             <br/>
     
         
     
//          <div className="category-logout">
//             <br/>
//           <button>Log Out</button>
//          </div>
     
           
//             </div>
     
//         <div className="product-table2">
     
//         <div className="table-details">
     
//          <div className="table-bttons">
     
//      <button>Export</button>
//      <button>Import</button>
     
//         </div>
//         <div className="talbe-add">
//          <button><FiPlus/> Add Product</button>
//         </div>
//         </div>
//      <div className="product-table-3">
     
//         <div className="product-table">
     
//          <div className="product-title">
          
//        <div><h2>Product Name</h2></div>
//        <div className="heads"><h2>Category</h2></div>
//        <div className="heads"><h2>Price</h2></div>
//        <div className="heads"><h2>Sale Price</h2></div>
//        <div className="heads"><h2>Stock</h2></div>
//        <div className="heads"><h2>Actions</h2></div>
//        <div className="heads"><h2>Status</h2></div>
     
     
//          </div>
     
//          <div className="product-map">
     
//      {Details.map((user)=>(
//          <div className="product-inputs" key={user.id}>
//              <div className="shirt">{user.name}</div>
//              <div className="dress">{user.category}</div>
//              <div className="price">{user.price}</div>
//              <div className="saleprice">{user.saleprice}</div>
//              <div className="stock">{user.stock}</div>
           
//             <div className="product-mapbuttons">
     
//             <div className="product-mapbuttons1">
//              <button><FiEye/>Show</button>
//      </div>
     
//      <div className="product-mapbuttons2">
//              <button><FiEdit/>Edit</button>
//      </div>
     
//             </div>
     
//             <div className="product-mapstatus">
//              <button>Block</button>
//              </div>
     
//              </div>
//      ))}
     
//          </div>
     
//         </div>
     
//      </div>
     
//      </div>
     
//              </div>
//              </div>


// <div className="update-message">

//     <div className="update-message1">
//     <h2>Update Product</h2>
// <br/>
//     <div>
//         <label htmlFor="">Name</label><br/>
//         <input type="text"/>
//     </div>

//      <div>
//         <label htmlFor="">Description</label><br/>
//         <input type="text"/>
//     </div>

//       <div>
//         <label htmlFor="">Price</label><br/>
//         <input type="text"/>
//     </div>

//       <div>
//         <label htmlFor="">Saleprice</label><br/>
//         <input type="text"/>
//     </div>

//        <div>
//         <label htmlFor="">Stock</label><br/>
//         <input type="text"/>
//     </div>
     

//       <div>
//         <label htmlFor="">Category</label><br/>
//         <input type="text"/>
//     </div>


//       <div className="product-image-section">
//   <label>Product Images</label><br />
//   <span className="current-images-label">Current Images:</span>
  
//   {/* Thumbnail Preview Box */}
//   <div className="image-preview-container">
//     <img src="https://via.placeholder.com/80" alt="Product" className="product-thumbnail" />
//   </div>

//   {/* Choose Files Button Input */}
//   <label className="custom-file-upload">
//     <span className="file-btn">Choose Files</span>
//     <span className="file-name">No file chosen</span>
//     <input type="file" multiple accept="image/png, image/jpeg, image/webp" style={{ display: 'none' }} />
//   </label>
// </div>


    
//        <div className="update">

//  <div className="update-1">
//        <button>Cancel</button>
//        </div>

//   <div className="update-2">
//        <button>update</button>
//        </div>

//     </div>

//     <div className="cross">
//         <FiX/>
//     </div>

// </div>
     
// </div>
        

// </div>

//     )
// }