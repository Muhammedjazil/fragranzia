import "./category.css"
import { useState, useEffect } from "react";
import axios from "axios";

import {
  FiGrid,
  FiPackage,
  FiTag,
  FiUsers,
  FiShoppingCart,
  FiEdit,
  FiHome,
  FiPlus,
  FiX
} from "react-icons/fi";
import { Link } from "react-router-dom";

const APIURL = "http://localhost:7000/category"

export const Category = () => {
    // State to control whether the Add Category drawer/modal is open or closed
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [name, setname] = useState("");
    const [description, setdes] = useState("");
    const [allData, setallData] = useState([]);

    const [editId, setEditId] = useState(null);

    const Fetchuser = async () => {
        try {
            let res = await axios.get(APIURL);
            setallData(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        Fetchuser();
    }, []);

    const Onhandleadd = async () => {
        try {
            if(editId){//edit user

            await axios.put(`${APIURL}/${editId}`,{name,description})

            }
            else{
                //add user
            await axios.post(APIURL, { name, description });
            }
            Fetchuser();
            setname("");       // Clear input field
            setdes("");        // Clear textarea field
            setIsAddOpen(false); // Close the drawer/modal
        } catch (error) {
            console.log(error);
        }
    
    };


  const onhandleedit = (id) => {
    let res = allData.find(user => user._id === id);

    setname(res.name);
    setdes(res.description);

    setEditId(id);          // ഏത് data ആണ് edit ചെയ്യുന്നത് എന്ന് store ചെയ്യുന്നു
    setIsAddOpen(true);
};

const Onhandlecancel=()=>{
    setname("")
    setdes("")
    setIsAddOpen(false)
}

const handleblock=async(id,isActive)=>{
    await axios.put(`${APIURL}/block/${id}`,{isActive})
  Fetchuser();
}

    return (
        <div className="category-11">

            {/* Sidebar Navigation */}
            <div className="category-nav">
               <h2>Dashtar</h2>
               <Link to="Dashboard"><FiGrid/>   Dashboard</Link>
               <br/><br/><br/>
               <Link to="/Product"><FiPackage/>   Product</Link>
               <br/><br/><br/>
               <Link to="Categories"><FiHome/>   Categories</Link>
               <br/><br/><br/>
               <Link to="Offer"><FiTag/>   Offer</Link>
               <br/><br/><br/>
               <Link to="Customer"><FiUsers/>   Customer</Link>
               <br/><br/><br/>
               <Link to="order"><FiShoppingCart/>   order</Link>
               <br/><br/><br/>
           
               <div className="category-logout">
                  <br/>
                  <button>Log Out</button>
               </div>
            </div>

            {/* Main Content Area */}
            <div className="category-12">
                <div className="category-13">
                    <div className="category-13-1">
                        <button>Export</button>
                    </div>
                    <div className="category-13-2">
                        <button>Import</button>
                    </div>
                    <div className="category-13-3">
                        {/* Opens the Add Category drawer */}
                        <button onClick={() => setIsAddOpen(true)}>
                            <FiPlus/> Add Category
                        </button>
                    </div>
                </div>

                <div className="category-14">

                  <table className="category-table">
                    <thead>
                    <tr>
                         <th>Name</th>
                         <th>Description</th>
                         <th>Action</th>
                         <th>Status</th>
                      </tr>
                 </thead>
                 <tbody>

                  

                       {allData.map((user) => (
                           <tr key={user._id}>
                               <td>{user.name}</td>
                               <td>{user.description}</td>
                               <td>
                               <button className="edit-category-btn" onClick={()=>{onhandleedit(user._id)}} ><FiEdit/>Edit</button>
                               </td>
                               <td>
                           {user.isActive ?  <button className="block-category-btn" onClick={()=>{handleblock(user._id,user.isActive)}}>Block</button>:
                             <button className="block-category-btn" onClick={()=>{handleblock(user._id,user.isActive)}}>UnBlock</button>}
                              </td>
                              </tr>
                          
                       ))}
                              </tbody>
                              </table>
                  
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

            {/* Conditionally Rendered Add Category Drawer/Modal */}
            {isAddOpen && (
              <div className="all-add-category">
                 <div className="add-categories-1">
                    <div className="add-add">
                       <h1>Add Category</h1>
                    </div>
                    {/* Closes the drawer when clicking the cross icon */}
                    <div 
                      className="add-cross" 
                      onClick={ Onhandlecancel} 
                      style={{ cursor: "pointer" }}
                    >
                       <h1><FiX/></h1>
                    </div>
                 </div>
                 <br/>
                 <label htmlFor="">Name</label><br/>
                 <input 
                   type="text" 
                   placeholder="category title" 
                   value={name} 
                   onChange={(e) => setname(e.target.value)} 
                 />
                 <br/>
                 <br/>
                 <label htmlFor="">Description</label><br/>
                 <textarea 
                   rows="3" 
                   value={description} 
                   onChange={(e) => setdes(e.target.value)}
                 />
                 <br/>
                 <br/>
                 <div className="cancel-add-buttons">
                    <div className="cancel12">
                        {/* Closes the drawer when clicking the Cancel button */}
                        <button onClick={Onhandlecancel}>Cancel</button>
                    </div>
                    <div className="add12">
                        <button onClick={Onhandleadd}>Add Category</button>
                    </div>
                 </div>
              </div>
            )}

        </div>
    );
};