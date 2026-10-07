import "./profilesave.css";
import { Link } from "react-router-dom";

import {
  FiShoppingCart,
  FiBell,
  FiUser,
  FiSearch,
  FiPhone,
  FiHome,
  FiBriefcase,
  FiMapPin,
} from "react-icons/fi";

import { FaBuilding } from "react-icons/fa";

export const Profilesave = () => {
  return (
    <div className="profilesave">

      {/* ================= NAVBAR ================= */}

      <div className="profilesave-nav">

        <div className="profilesave-head">
          <h1>Fragranzia</h1>
        </div>

        <div className="profilesave-sections">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/Products">Products</Link>
            </li>

            <li>
              <Link to="/Gifting">Gifting</Link>
            </li>

            <li>
              <Link to="/About">About</Link>
            </li>
          </ul>
        </div>

        <div className="profilesave-search">
          <FiSearch />

          <input
            type="text"
            placeholder="Search here"
          />
        </div>

        <div className="profilesave-icons">

          <FiShoppingCart />

          <FiBell />

          <span>
            <FiUser />
          </span>

        </div>

      </div>


      {/* ================= PROFILE SECTION ================= */}

      <div className="full-data">

        <div className="profilesave-data">

          <h1>Profile</h1>

          <h4>
            Home › Profile
          </h4>

        </div>


        {/* PROFILE BUTTONS */}

        <div className="profilesave-button">

          <div className="profilesave-button1">
            <button>Profile</button>
          </div>

          <div className="profilesave-button2">
            <button>Address</button>
          </div>

          <div className="profilesave-button3">
            <button><Link to='/last'>My Order</Link></button>
          </div>

        </div>


        {/* PROFILE INPUTS */}

        <div className="profilesave-inputs">

          {/* COLUMN 1 */}

          <div className="profilesave-input-1">

            <label>Full Name</label>

            <br />

            <input
              type="text"
              placeholder="Thomas"
            />

            <br />
            <br />

            <label>Date of Birth</label>

            <br />

            <input
              type="text"
              placeholder="10/2/2004"
            />

          </div>


          {/* COLUMN 2 */}

          <div className="profilesave-input-2">

            <label>Email</label>

            <br />

            <input
              type="email"
              placeholder="thomas12@gmail.com"
            />

            <br />
            <br />

            <label>Gender</label>

            <br />

            <input
              type="text"
              placeholder="Male"
            />

          </div>


          {/* COLUMN 3 */}

          <div className="profilesave-input-3">

            <label>Phone Number</label>

            <br />

            <input
              type="text"
              placeholder="+91 98765 43210"
            />

            <br />
            <br />

            <label>Password</label>

            <br />

            <input
              type="password"
              placeholder="********"
            />

            <br />
            <br />

            <button>
              Save
            </button>

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* ================= ADDRESS SECTION =============== */}
      {/* ================================================= */}

      <div className="dataaaas">

        {/* ADDRESS BUTTONS */}

        <div className="address-buttons">

          <div className="address-button1">
            <button>
              Profile
            </button>
          </div>

          <div className="address-button2">
            <button>
              Address
            </button>
          </div>

          <div className="address-button3">
            <button>
              My Order
            </button>
          </div>

          <div className="add-address">
            <button>
              Add Address
            </button>
          </div>

        </div>


        {/* ADDRESS DETAILS */}

        <div className="address-details">

          <div className="address-details-1">

            <h3>

              Address 2

              <span className="office">

                <FaBuilding />

                Office

              </span>

            </h3>


            <p>
                 <h4>Priyesh Manu</h4>
              Helpstir Technologies 3rd Floor,
              Lulu Cyber Tower Infopark Phase 2

              <br />

              Kakkanad, Kochi – 682042

            </p>


            <span className="phone">

              <FiPhone />

              +91 98765 43210

            </span>

          </div>

        </div>

      </div>



      <div className="add-address-og">
         <h2>Address Type</h2>

         <button className="btn11"><FiHome/> Home</button>
         <button className="btn-12"><FiBriefcase/>Office</button>
         <button className="btn-12"><FiMapPin />Other</button>
         <br/>
          <div className="add-input">


            <div className="name-add">
         <label htmlFor="">Full Name</label><br/>
         <input type="text" placeholder="Enter full name"/>
         </div>


                <div className="name-add1">
         <label htmlFor="">Phone Number</label><br/>
         <input type="text" placeholder="Enter 10-digit mobile number"/>
         </div>


         </div>
         <br/>
            <div className="text-area">
         <label htmlFor="">Address</label><br/>
       <textarea
       rows="5"
       placeholder="Enter house or building details"/>

       </div>
   
   <div className="all-small-inputs">
       <div className="eachone">
       <div className="small-inputs">
         <label htmlFor="">City/District</label><br/>
         <input type="text" placeholder="Enter City/District"/>
       </div>
<br/>

        <div className="small-inputs">
         <label htmlFor="">PinCode</label><br/>
         <input type="text" placeholder="Enter state"/>
       </div>

       </div>


<div className="eachone">
       <div className="small-inputs12">
         <label htmlFor="">State</label><br/>
         <input type="text" placeholder="Enter state"/>
       </div>
<br/>
        <div className="small-inputs12">
         <label htmlFor="">Alternative Phone number(Optional)</label><br/>
         <input type="text" placeholder="Enter state"/>
       </div>

       </div>
      
<div className="eachone12">

<label htmlFor="">Land Mark</label><br/>
<input type="text" placeholder="Enter state"/>

</div>



</div>
<button className="add-save">
   Save
</button>
      </div>



      <div className="edit-address-og">
         <h2>Address Type</h2>
      <br/>
         <button className="btn11"><FiHome/> Home</button>
         <button className="btn-12"><FiBriefcase/>Office</button>
         <button className="btn-12"><FiMapPin />Other</button>
         <br/>
          <div className="add-input">


            <div className="name-add">
         <label htmlFor="">Full Name</label><br/>
         <input type="text" placeholder="Priyesh"/>
         </div>


                <div className="name-add1">
         <label htmlFor="">Phone Number</label><br/>
         <input type="text" placeholder="98765 43210"/>
         </div>


         </div>
         <br/>
            <div className="text-area">
         <label htmlFor="">Address</label><br/>
       <textarea
       rows="5"
       placeholder="Rumban villa kochi, Ruther road"/>

       </div>
   
   <div className="all-small-inputs">
       <div className="eachone">
       <div className="small-inputs">
         <label htmlFor="">City/District</label><br/>
         <input type="text" placeholder="Kochi"/>
       </div>
<br/>

        <div className="small-inputs">
         <label htmlFor="">PinCode</label><br/>
         <input type="text" placeholder="675433"/>
       </div>

       </div>


<div className="eachone">
       <div className="small-inputs12">
         <label htmlFor="">State</label><br/>
         <input type="text" placeholder="Kerala"/>
       </div>
<br/>
        <div className="small-inputs12">
         <label htmlFor="">Alternative Phone number(Optional)</label><br/>
         <input type="text" placeholder="Enter Alternative Phone number"/>
       </div>

       </div>
      
<div className="eachone12">

<label htmlFor="">Land Mark</label><br/>
<input type="text" placeholder="Near Lulu Mall"/>

</div>



</div>
<button className="add-save">
   Edit
</button>
      </div>


   <br/>
   <br/>

      <div className="add-address-og">
         <h2>Address Type</h2>

         <button className="btn11"><FiHome/> Home</button>
         <button className="btn-12"><FiBriefcase/>Office</button>
         <button className="btn-12"><FiMapPin />Other</button>
         <br/>
          <div className="add-input">


            <div className="name-add">
         <label htmlFor="">Full Name</label><br/>
         <input type="text" placeholder="Priyesh"/>
         </div>


                <div className="name-add1">
         <label htmlFor="">Phone Number</label><br/>
         <input type="text" placeholder="98765 43210"/>
         </div>


         </div>
         <br/>
            <div className="text-area">
         <label htmlFor="">Address</label><br/>
       <textarea
       rows="5"
       placeholder="Rumban villa kochi, Ruther road"/>

       </div>
   
   <div className="all-small-inputs">
       <div className="eachone">
       <div className="small-inputs">
         <label htmlFor="">City/District</label><br/>
         <input type="text" placeholder="Kochi"/>
       </div>
<br/>

        <div className="small-inputs">
         <label htmlFor="">PinCode</label><br/>
         <input type="text" placeholder="675433"/>
       </div>

       </div>


<div className="eachone">
       <div className="small-inputs12">
         <label htmlFor="">State</label><br/>
         <input type="text" placeholder="Kerala"/>
       </div>
<br/>
        <div className="small-inputs12">
         <label htmlFor="">Alternative Phone number(Optional)</label><br/>
         <input type="text" placeholder="Enter Alternative Phone number"/>
       </div>

       </div>
      
<div className="eachone12">

<label htmlFor="">Land Mark</label><br/>
<input type="text" placeholder="Near Lulu Mall"/>

</div>



</div>
<button className="add-save">
   Save
</button>
      </div>




    </div>
  );
};