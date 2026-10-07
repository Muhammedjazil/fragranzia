import { useState } from "react";
import axios from "axios";
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
import "./producttable.css"
import { useEffect } from "react";

const APIURL = "http://localhost:7000/product"


export const Producttable = () => {

  const [formData, setformData] = useState([])
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [update, setupdate] = useState(false)
  const [edit, setedit] = useState(false)
  //updating id
  const [updateid, setupdateid] = useState("")
  const [newImage, setNewImage] = useState(null);//for new image store

  const [category, setcategory] = useState([])

  const [editData, seteditData] = useState({
    name: "",
    description: "",
    price: "",
    saleprice: "",
    stock: "",
    category: "",
    image: ""


  })
  const [show, setshow] = useState({    //setinput with this key as a value
    name: "",
    description: "",
    price: "",
    saleprice: "",
    stock: "",
    category: "",
    image: ""
  })  //variable for the show button


  // method,url match--->productRouter.js-->fncall--->productController.js
  const fetchdata = async () => {
    try {
      let response = await axios.get('http://localhost:7000/product')
      setformData(response.data)
      console.log("Fetched Products from Backend:", response.data);
    }
    catch (error) {
      console.log("error")
    }
  }

  useEffect(() => {

    fetchdata()

  }, [])

  console.log(editData,);


  const onhandlechageedit = (e) => {
    seteditData({
      ...editData,
      [e.target.name]: e.target.value
    })
  }

  //edit-->click-->then appeare
  // const handleEditClick=(user)=>{
  //   seteditData({
  //     name:user.name,
  //     description:user.description,
  //      price:user.price,
  //     saleprice:user.saleprice,
  //     stock:user.stock,
  //     category: user.category?._id
  //     // image:user.image
  //   });

  //   setedit(true)
  //   setupdateid(user._id)  //--->which data try to update

  // };

  const handleEditClick = (user) => {
    seteditData({
      name: user.name,
      description: user.description,
      price: user.price,
      saleprice: user.saleprice,
      stock: user.stock,
      category: user.category || "",
      image: user.image || ""  // ? optionalchaining so id indenkil edukkum ellenkil no error 68abc123      Product collection stores the Category ID, not the category name so -->user.category?._id 
    });

    setedit(true);
    setupdateid(user._id);
  };



  // Submit updated data to backend via PUT request
  // const onupdatesubmit=async()=>{
  // await axios.put(`${APIURL}/${updateid}`,editData)  //editdata is an object

  // fetchdata()
  // setedit(false)

  // }

  const onupdatesubmit = async () => {
    try {

      const formData = new FormData();

      formData.append("name", editData.name);
      formData.append("description", editData.description);
      formData.append("price", editData.price);
      formData.append("saleprice", editData.saleprice);
      formData.append("stock", editData.stock);

      // category is an object
      formData.append("category", editData.category?._id || editData.category);

      // only send new image if user selected one
      if (newImage) {
        formData.append("image", newImage);
      }

      await axios.put(`${APIURL}/${updateid}`, formData);

      await fetchdata();

      setedit(false);
      setNewImage(null);

    } catch (error) {
      console.log(error);
    }
  };
  const handleblock = async (id, isActive) => {
    await axios.put(`${APIURL}/block/${id}`, { isActive })
    fetchdata()
  }

  const handleshow = (user) => {
    setshow({
      name: user.name,
      description: user.description,
      price: user.price,
      saleprice: user.saleprice,
      stock: user.stock,
      category: user.category,
      image: user.image
    });

    setupdate(true);
  };

  const handleShowEdit = () => {
    seteditData({
      name: show.name,
      description: show.description,
      price: show.price,
      saleprice: show.saleprice,
      stock: show.stock,
      category: show.category,
      image: show.image || ""
    });

    setupdate(false);  // close Show section
    setedit(true);     // open Edit section
  };


  const fetchcategory = async () => {
    let res = await axios.get('http://localhost:7000/category')
    setcategory(res.data)
  }
  useEffect(() => {
    fetchcategory()
  }, [])

  //category select box
  const handlechange = (e) => {
    seteditData({ ...editData, [e.target.name]: e.target.value });
  };


  

  return (
    <div className="Product-all">

      <div className="Product-table-og">

        <div className="category-nav">

          <h2>Dashtar</h2>

          <Link to="Dashboard"><FiGrid />  Dashboard</Link>
          <br />
          <br />
          <br />

          <Link to="/Product"><FiPackage />  Product</Link>
          <br />
          <br />
          <br />


          <Link to="/Categories"><FiHome />  Categories</Link>
          <br />
          <br />
          <br />


          <Link to="Offer"><FiTag />  Offer</Link>
          <br />
          <br />
          <br />

          <Link to="/Customer"><FiUsers />  Customer</Link>
          <br />
          <br />
          <br />


          <Link to="order"><FiShoppingCart />  order</Link>
          <br />
          <br />
          <br />



          <div className="category-logout">
            <br />
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
              <Link to='/addproduct'>  <button><FiPlus /> Add Product</button></Link>

            </div>
          </div>

          <div className="product-table-3">

            <div className="product-table">

              <div className="product-title">
                <table>
                  <thead>
                    <tr>

                      <th>Product Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Sale Price</th>
                      <th>Stock</th>
                      <th>Actions</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>




                    {formData.map((user) => (

                      <tr key={user._id}>                             {/*  category==categoy collectionilee row id ,124565345 */}
                        <td>{user.name}</td>                {/*// category"={_id: "12345, name: "Dress",description:"good"} */}
                        <td>{user.category?.name}</td>      {/* {user.category}---->id=74579232h34,user.category?.name-->dress or pant */}
                        <td>{user.price}</td>
                        <td>{user.saleprice}</td>
                        <td>{user.stock}</td>

                        <td>
                          <button onClick={() => { handleshow(user) }}><FiEye />Show</button>      {/*()=>setupdate(true) */}


                          <button onClick={() => handleEditClick(user)}><FiEdit />Edit</button>
                        </td>

                        <td>
                          {user.isActive ? <button onClick={() => { handleblock(user._id, user.isActive) }}>Block</button> : <button onClick={() => { handleblock(user._id, user.isActive) }}>UnBlock</button>}


                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>

          </div>

        </div>
        {edit && (<div className="update-message1">
          <h2>Update Product</h2>
          <br />
          <div>
            <label htmlFor="">Name</label><br />
            <input type="text" name="name" value={editData.name} onChange={onhandlechageedit} />
          </div>

          <div>
            <label htmlFor="">Description</label><br />
            <input type="text" name="description" value={editData.description} onChange={onhandlechageedit} />
          </div>

          <div>
            <label htmlFor="">Price</label><br />
            <input type="text" name="price" value={editData.price} onChange={onhandlechageedit} />
          </div>

          <div>
            <label htmlFor="">Saleprice</label><br />
            <input type="text" name="saleprice" value={editData.saleprice} onChange={onhandlechageedit} />
          </div>

          <div>
            <label htmlFor="">Stock</label><br />
            <input type="text" name="stock" value={editData.stock} onChange={onhandlechageedit} />
          </div>


          <div>
            <label htmlFor="">Category</label><br />

            {/* <input type="text" name="category" value={editData.category?.name} onChange={onhandlechageedit}/> */}
            {/* drop down category */}
            <select
              name="category"
              value={editData.category?._id || editData.category}
              onChange={handlechange}
            >
              {/* <option value="">Select Category</option> */}

              {category.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>

          </div>

          <div className="product-image-section">

            <label>Product Images</label>

            <span className="current-images-label">
              Current Image:
            </span>

            <div className="image-preview-container">

              {editData.image && (
                <img
                  src={`http://localhost:7000/uploads/${editData.image}`}
                  alt={editData.name}
                  className="edit-product-thumbnail"
                />
              )}

            </div>

            <label className="custom-file-upload">
              <span className="file-btn">
                Choose Files
              </span>
              <span className="file-name">
                {newImage ? newImage.name : "No file chosen"}
              </span>
              <input
                type="file"
                name="image"
                accept="image/png, image/jpeg, image/webp"
                style={{ display: "none" }}
                onChange={(e) => setNewImage(e.target.files[0])}
              />
            </label>

          </div>




          <div className="update">

            <div className="update-1">
              <button onClick={() => setedit(false)}>Cancel</button>
            </div>

            <div className="update-2">
              <button onClick={onupdatesubmit}>update</button>
            </div>

          </div>

          <div className="cross">
            <button onClick={() => setedit(false)}> <FiX /></button>
          </div>

        </div>
        )}



        {/* update */}

        {update && (

          <div className="og-details">
            <h2><FiEye /> ProductDetails</h2>
            <br />
            <div className="all-details">



              <div className="img-update">


                <label htmlFor="">PRODUCT IMAGE</label>
                <br />
                <div className="details-input">
                  <img
                    src={`http://localhost:7000/uploads/${show.image}`}
                    alt={show.name}
                  />
                </div>
              </div>


              <div className="all-product">

                <label htmlFor="">PRODUCT NAME</label>
                <p>{show.name}</p>
                <br />
                <label htmlFor="">Category</label><br />
                <h5>{show.category?.name}</h5>
                <br />

                <div className="price-details">

                  <div className="regular">
                    <label htmlFor="">Regular price</label>
                    <h4>{show.price}</h4>
                  </div>
                  <br />

                  <div className="sale">
                    <label htmlFor="">Sale price</label>
                    <h4>{show.saleprice}</h4>
                  </div>


                </div>

              </div>
            </div>
            <br />
            <div className="descriptiuon-details">
              <label>Description</label>

              <p>{show.description}</p>
            </div>

            <div className="details-button">
              <div className="cancel-details">
                <button onClick={() => setupdate(false)}>Cancel</button>
              </div>

              <div className="edit-details">
                <button onClick={handleShowEdit}>
                  <FiEdit /> edit product
                </button>
              </div>
            </div>

          </div>
        )}

      </div>



    </div>
  )
}