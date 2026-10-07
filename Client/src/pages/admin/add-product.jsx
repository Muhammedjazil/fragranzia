import { useState } from "react";
import "./add-product.css";
import {
  FiGrid,
  FiPackage,
  FiTag,
  FiUsers,
  FiShoppingCart,
  FiHome,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
const APIURL='http://localhost:7000/product'
export const Addproduct = () => {
  const navigate = useNavigate();
  const[allData,setallData]=useState([])
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    SalePrice: "",
    stock: "",
    Category: "",
    description: "",
    image: null,
  });

         //
    const[categoryisdata,setcategoryisdata]=useState([])

  const handlechange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlefilechange = (e) => {
    if (e.target.files && e.target.files[0]) {    //user select ചെയ്ത files-ന്റെ list.select ചെയ്ത first file[0]
      setFormData({ ...formData, image: e.target.files[0] }); // Fixed typo and stored directly in formData
    }
  };

  const onhandlefetchdata=async()=>{
    let response=await axios.get(APIURL)
  setallData(response.data)
  }
   useEffect(()=>{
    onhandlefetchdata()
   },[])
  const handleSubmit = async (e) => {
    e.preventDefault(); 
                                                      //image + text data ഒരുമിച്ച് backend-ലേക്ക് അയക്കുന്നതിനാൽ
    const data = new FormData();            //data → ആ object സൂക്ഷിക്കുന്ന variable name   new FormData()-->puthiya FormData object create   
    data.append("name", formData.name);                                           //FormData()-->buildin fn aanu
  data.append("price", formData.price);         // Changed from product_price to price
    data.append("saleprize", formData.SalePrice);    // Matched with your schema keys
    data.append("stock", formData.stock);
    data.append("category", formData.Category);
    data.append("description", formData.description);

    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      // Correct port 7000 and correct route /product/add
      const response = await axios.post("http://localhost:7000/product/add", data, {   //data--->not form an object, {data}-->object aakum
        headers: {
          "Content-Type": "multipart/form-data",                                           //etra information not compulsory
        },
      });

      if (response.status === 201 || response.status === 200) {
        navigate("/Product"); 
      }
    } catch (error) {
      console.error("Error connecting to server:", error.response?.data || error.message);
    }
  };

  //used to take data from category
const handlecategory=async()=>{
   let res=await axios.get('http://localhost:7000/category')
  setcategoryisdata(res.data)
   
}
      
  return (
    <form onSubmit={handleSubmit} className="add-product">
      <div className="category-nav">
        <h2>Dashtar</h2>

        <Link to="/Dashboard"><FiGrid /> Dashboard</Link>
        <br /><br /><br />
        
        <Link to="/Product"><FiPackage /> Product</Link>
        <br /><br /><br />

        <Link to="/Categories"><FiHome /> Categories</Link>
        <br /><br /><br />

        <Link to="/Offer"><FiTag /> Offer</Link>
        <br /><br /><br />

        <Link to="/Customer"><FiUsers /> Customer</Link>
        <br /><br /><br />

        <Link to="/order"><FiShoppingCart /> order</Link>
        <br /><br /><br />

        <div className="category-logout">
          <br />
          <button type="button">Log Out</button>
        </div>
      </div>
         
      <div className="add-productdetails">
        <h1>Add Product</h1>
        <p>Add your product and necessary information from here</p>

        <div className="inpusts1">
          <div className="input1-1">
            <label>Product Title/Name</label><br />
            <input type="text" name="name" value={formData.name} onChange={handlechange} required />
          </div>

          <div className="input1-2">
            <label>Product Price</label><br />
            <input type="number" name="price" value={formData.price} onChange={handlechange} required />
          </div>
        </div>
        <br />

        <div className="inpusts2">
          <div className="input2-1">
            <label>SalePrice</label><br />
            <input type="text" name="SalePrice" value={formData.SalePrice} onChange={handlechange} />
          </div>

          <div className="input2-2">
            <label>Product Quatity</label><br />
            <input type="number" name="stock" value={formData.stock} onChange={handlechange} required />
          </div>

          <div className="input2-3">
          
            <label>Category</label><br />

           <select
  name="Category"
  value={formData.Category}
  onChange={handlechange}
  onClick={handlecategory}
>
  <option value="">Select Category</option>

  {categoryisdata.map((item) => (
    <option key={item._id} value={item._id}>
      {item.name}
    </option>
  ))}
</select>
          </div> 
        </div>
        <br />

        <div className="product-description">
          <textarea 
            className="custom-textarea" 
            placeholder="Write product details here..." 
            rows="4"
            name="description" 
            value={formData.description}
            onChange={handlechange}
          ></textarea>
        </div>

        <div className="product-image-section">
          <label>Product Images</label>
          <label className="image-upload-box">
            <input 
              type="file" 
              accept="image/png, image/jpeg, image/webp" 
              onChange={handlefilechange} 
            />
            <p className="upload-text">
              {formData.image ? formData.image.name : "Click to upload or drag & drop (Max 1 image)"}
            </p>
            <p className="upload-subtext">JPEG, PNG, or WEBP only</p>
          </label>
        </div>

        <div className="add-cancel">
          <div className="cacel-btn">
            <Link to='/Product'><button type="button">Cancel</button></Link>
          </div>
          <div className="Add-btn">
            <button type="submit">Add Product</button>
          </div>
        </div>
      </div>
    </form>
  );
};